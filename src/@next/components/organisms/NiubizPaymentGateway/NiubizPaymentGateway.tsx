import { Loader } from "@components/atoms";
import { InputField } from "@farmacia-retail/farmauna-components";
import farmatheme from "@farmatheme";
import americanExpress from "@temp/images/auna/american-express-payment.svg";
import dinersClub from "@temp/images/auna/diners-club-payment.svg";
import masterCardIcon from "@temp/images/auna/mastercard-payment.svg";
import niubizTextIcon from "@temp/images/auna/niubiz-text.svg";
import visaIcon from "@temp/images/auna/visa-payment.svg";
import { ICardData, IPaymentGatewayConfig } from "@types";
import { Formik } from "formik";
import ErrorFormPopulateIcon from "images/auna/form-populate-error.svg";
import React, { useEffect, useState } from "react";
import ReactSVG from "react-svg";
import _ from "lodash";
import {
  createSession,
  createToken,
  ErrorData,
  GatewayOptions,
} from "../../../../core/payments/niubiz";
import { alertService } from "../../atoms/Alert";
import { IAlertServiceProps } from "../../atoms/Alert/types";
import { IUserDataForNiubiz } from "../CheckoutPayment/types";
import { validatePaymentGateway } from "./NiubizPaymentGatewayValidation";
import * as S from "./styles";
import { IFormPayment, initialValuesFormPayment, IProps } from "./types";
const ip = require("ip");

const INITIAL_CARD_ERROR_STATE = {
  fieldErrors: {
    cvv: null,
    expirationMonth: null,
    expirationYear: null,
    number: null,
  },
  nonFieldError: "",
};

const getConfigElement = (config: IPaymentGatewayConfig[], element: string) => {
  const result = config.find((x) => x.field === element)?.value;
  return result;
};

const getTokenRequirements = (config: IPaymentGatewayConfig[]) => {
  const securityAPI =
    getConfigElement(config, "nb_security_url") ||
    "https://apitestenv.vnforapps.com/api.security/v1/security";

  const gatewayUser =
    getConfigElement(config, "merchant_username") ||
    "integraciones.visanet@necomplus.com";

  const gatewayPassword =
    getConfigElement(config, "merchant_password") || "d5e7nk$M";

  const tokenRequirements: GatewayOptions = {
    endpoint: securityAPI,
    password: gatewayPassword,
    user: gatewayUser,
  };

  return tokenRequirements;
};

const getSessionRequirements = (
  config: IPaymentGatewayConfig[],
  token: string,
  amount: any,
  user?: IUserDataForNiubiz | undefined
) => {
  const merchantId = getConfigElement(config, "merchant_id") || "342062522";

  const sessionAPI =
    getConfigElement(config, "nb_session_url") ||
    "https://apitestenv.vnforapps.com/api.ecommerce/v2/ecommerce/token/session";

  const url = sessionAPI + merchantId;
  const total = amount;

  const sessionRequirements: GatewayOptions = {
    amount: total,
    antifraud: {
      clientIp: ip.address(),
      merchantDefineData: {
        4: user?.email,
        21: 0,
        32: user?.documentNumber,
        75: "Invitado",
        77: 0,
      },
    },
    channel: "web",
    endpoint: url,
    securityToken: token,
  };

  return sessionRequirements;
};

const getTokenizerRequirements = (
  config: IPaymentGatewayConfig[],
  sessionKey: string,
  amount: any
) => {
  // @ts-ignore
  const payform = window?.payform;
  const merchantId = getConfigElement(config, "merchant_id") || "342062522";

  const tokenizerRequirements: GatewayOptions = {
    amount,
    merchantId,
    payform,
    sessionKey,
  };

  return tokenizerRequirements;
};

enum ERROR_DICTIONARY {
  CARD_NUMBER = 0,
  EXPIRATION_DATE = 1,
  CVV = 2,
}

const NiubizPaymentGateway: React.FC<IProps> = ({
  config,
  processPayment,
  formRef,
  formId,
  errors = [],
  onError,
  totalPrice,
  userDataForNiubiz,
  generatePurchaseNumber,
}: IProps) => {
  // @ts-ignore
  const [sessionKey, setSessionKey] = useState("");

  // @ts-ignore
  const [cardErrors, setCardErrors] = React.useState<ErrorData>(
    INITIAL_CARD_ERROR_STATE
  );
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<any[]>([]);

  const errorsDictionary = ["invalid_number", "invalid_expiry", "invalid_cvc"];

  const payformUrl =
    getConfigElement(config, "nb_payform_url") ||
    "https://pocpaymentserve.s3.amazonaws.com/payform.min.js";

  let purchaseNumber = "";
  useEffect(() => {
    purchaseNumber = generatePurchaseNumber().toString();
  }, []);

  const createTokenScript = () => {
    const tokenRequirements = getTokenRequirements(config);
    const amount = totalPrice?.gross.amount.toString();
    // @ts-ignore
    createToken(tokenRequirements)
      .then((token: any) => {
        const sessionRequirements = getSessionRequirements(
          config,
          token,
          amount,
          userDataForNiubiz
        );
        return createSession(sessionRequirements);
      })
      .then((key) => {
        setSessionKey(key);
        const tokenizerRequirements = getTokenizerRequirements(
          config,
          key,
          amount
        );
        const configuration = {
          amount,
          callbackurl: "",
          channel: "web",
          font: "https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap",
          language: "es",
          merchantConfiguration: {
            tokenizationEnabled: true,
          },
          merchantid: tokenizerRequirements.merchantId,
          purchasenumber: purchaseNumber,
          recurrentmaxamount: "1000.00",
          sessionkey: key,
        };

        // @ts-ignore
        window?.payform.setConfiguration(configuration);

        // TODO: Create required controls
        const elementStyles = {
          base: {
            autofill: {
              color: "#e39f48",
            },
            color: "black",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "1rem",
            fontSmoothing: "antialiased",
            placeholder: {
              color: farmatheme.theme.colors.neutral.medium,
            },
          },
          invalid: {
            "::placeholder": {
              color: "#FFCCA5",
            },
            color: "#E25950",
          },
        };

        // Número de tarjeta
        const _window: any = window;
        const _payform = _window?.payform;

        _window.cardNumber = _window?.payform.createElement(
          "card-number",
          {
            placeholder: "Ejem: 9729 2800 2334 3423",
            style: elementStyles,
          },
          "txtNumeroTarjeta"
        );

        _window?.cardNumber.then((element: any) => {
          element.on("bin", (data: any) => {
            // TODO ...
          });

          element.on("change", (data: any[]) => {
            setFormErrors(data.filter((x) => x.type === "validation_error"));
            if (data.length !== 0) {
              let error = "";
              for (const d of data) {
                error += "* " + d.message + "\n";
              }

              if (error !== "") {
                // TODO: Replace this line with a proper error management tool
              }
            }
          });
        });

        _window.cardCvv = _payform.createElement(
          "card-cvc",
          {
            placeholder: "Ejem: 972 0",
            style: elementStyles,
          },
          "txtCvv"
        );

        _window.cardCvv.then((element: any) => {
          element.on("change", (data: any) => {
            // TODO
          });
        });

        _window.cardExpiry = _payform.createElement(
          "card-expiry",
          {
            placeholder: "Ejem: 02/20",
            style: elementStyles,
          },
          "txtFechaVencimiento"
        );

        // @ts-ignore
        _window.cardExpiry.then((element) => {
          setShowForm(true);

          element.on("change", (data: any[]) => {
            // TODO
          });
        });
      });
  };

  const removeNiubizElements = React.useCallback(
    (script: HTMLScriptElement, idIframes: string): void => {
      script.remove();
      let iframes = document.getElementById(idIframes);
      do {
        iframes?.remove();
        iframes = document.getElementById(idIframes);
      } while (iframes);
    },
    []
  );

  const configureErrorMessages = (alert: IAlertServiceProps) => {
    alertService.sendAlert(alert);
    onError(errors);
  };

  const handleSubmit = async (formData: IFormPayment) => {
    const data = {
      alias: "KS",
      email: formData.email,
      lastName: formData.lastname,
      name: formData.name,
      recurrence: false,
    };

    niubizTransaction(data);
  };

  const niubizTransaction = (data: {
    alias: string;
    email: string;
    lastName: string;
    name: string;
    recurrence: boolean;
  }) => {
    try {
      // @ts-ignore
      window.payform
        .createToken(
          // @ts-ignore
          [window.cardNumber, window.cardExpiry, window.cardCvv],
          data
        )
        .then((result: any) => {
          const key = "transactionToken";
          const transactionToken = result[key] || undefined;
          if (transactionToken) {
            const bin = "bin";
            const cardData: ICardData = {
              firstDigits: result[bin],
            };
            processPayment(transactionToken, cardData);
          } else {
            configureErrorMessages({
              buttonText: "Entendido",
              message:
                "Ha ocurrido un error al procesar tu pago por favor inténtalo de nuevo.",
              type: "Text",
            });
          }
        })
        .catch((error: any) => {
          if (error === "Ningun campo puede estar vacio") {
            configureErrorMessages({
              buttonText: "Entendido",
              icon: ErrorFormPopulateIcon,
              message:
                "Es necesario completar todos los campos de la tarjeta de crédito/débito.",
              title: "Faltan datos",
              type: "Text",
            });
          } else {
            configureErrorMessages({
              buttonText: "Entendido",
              message: error,
              type: "Text",
            });
          }
        });
    } catch (error) {
      configureErrorMessages({
        buttonText: "Entendido",
        message: error,
        type: "Text",
      });
    }
  };

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    const idIframes: string = "tmx_tags_iframe"; // IFrame Ids loaded by Niubiz - share same Id
    script.src = payformUrl;
    script.async = true;
    document.body.appendChild(script);
    createTokenScript();

    return () => {
      removeNiubizElements(script, idIframes);
    };
  }, []);

  const styles = {
    hidde: {
      display: "none",
    },
    show: {
      display: "block",
    },
  };

  const getErrorFromDictionary = (errorDictionary: ERROR_DICTIONARY) => {
    return formErrors.length &&
      formErrors.filter((x) => x.code === errorsDictionary[errorDictionary])
        .length ? (
      <div className="error number-creditcard-error">
        {
          formErrors.filter(
            (x) => x.code === errorsDictionary[errorDictionary]
          )[0].message
        }
      </div>
    ) : (
      ""
    );
  };

  return (
    <div>
      {showForm ? <label htmlFor=""></label> : <Loader fullScreen={true} />}
      <Formik
        initialValues={initialValuesFormPayment}
        validate={(values: IFormPayment) => {
          const formErrors = validatePaymentGateway(values);

          if (!_.isEmpty(formErrors)) {
            onError(errors);
          }

          return formErrors;
        }}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <S.Wrapper>
            <form action="" ref={formRef} id={formId} onSubmit={handleSubmit}>
              <div
                className="card"
                style={showForm ? styles.show : styles.hidde}
              >
                <S.Payment
                  formErrors={formErrors}
                  invalidNumberCode={
                    errorsDictionary[ERROR_DICTIONARY.CARD_NUMBER]
                  }
                  invalidExpiryCode={
                    errorsDictionary[ERROR_DICTIONARY.EXPIRATION_DATE]
                  }
                  invalidCvc={errorsDictionary[ERROR_DICTIONARY.CVV]}
                  className="card-body"
                >
                  <h4 className="card-title">
                    Paga con tu tarjeta de crédito o débito
                  </h4>
                  <h5 className="card-subtitle">
                    Ingresa los datos del titular de la tarjeta
                  </h5>
                  <S.RadioContainerPayment>
                    <S.PaymentLine>
                      <S.PaymentIconNiubiz>
                        <ReactSVG path={niubizTextIcon} />
                      </S.PaymentIconNiubiz>
                      <S.PaymentIcon>
                        <ReactSVG path={visaIcon} />
                      </S.PaymentIcon>
                      <S.PaymentIcon>
                        <ReactSVG path={masterCardIcon} />
                      </S.PaymentIcon>
                      <S.PaymentIcon>
                        <ReactSVG path={americanExpress} />
                      </S.PaymentIcon>
                      <S.PaymentIcon>
                        <ReactSVG path={dinersClub} />
                      </S.PaymentIcon>
                    </S.PaymentLine>
                  </S.RadioContainerPayment>

                  <div className="row">
                    <div className="row-input">
                      <InputField
                        label="Nombre del titular de la tarjeta"
                        type="text"
                        id="name"
                        inputSize="large"
                        className="form-control form-control-sm"
                        placeholder="Ejemplo: Juan"
                        error={errors.name}
                        value={values.name}
                        onChange={handleChange}
                      />
                      <InputField
                        label="Apellido del titular de la tarjeta"
                        type="text"
                        id="lastname"
                        inputSize="large"
                        className="form-control form-control-sm"
                        placeholder="Ejemplo: Perez"
                        error={errors.lastname}
                        value={values.lastname}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="row-input">
                      <InputField
                        label="Correo electrónico"
                        type="text"
                        id="email"
                        inputSize="large"
                        className="form-control form-control-sm"
                        placeholder="ejemplo@mail.com"
                        error={errors.email}
                        value={values.email}
                        onChange={handleChange}
                      />
                      <div className="card-input">
                        <label htmlFor="">Número de tarjeta</label>
                        <div
                          id="txtNumeroTarjeta"
                          className="form-control form-control-sm ncp-card"
                        ></div>
                        {getErrorFromDictionary(ERROR_DICTIONARY.CARD_NUMBER)}
                      </div>
                    </div>
                    <div className="row-input">
                      <div className="card-input">
                        <label htmlFor="">Fecha de vencimiento</label>
                        <div
                          id="txtFechaVencimiento"
                          className="form-control form-control-sm"
                        />
                        {getErrorFromDictionary(
                          ERROR_DICTIONARY.EXPIRATION_DATE
                        )}
                      </div>
                      <div className="card-input">
                        <label htmlFor="">CVC/CVV</label>
                        <div
                          id="txtCvv"
                          className="form-control form-control-sm"
                        />
                        {getErrorFromDictionary(ERROR_DICTIONARY.CVV)}
                      </div>
                    </div>
                  </div>
                </S.Payment>
              </div>
            </form>
          </S.Wrapper>
        )}
      </Formik>
    </div>
  );
};

export { NiubizPaymentGateway };
