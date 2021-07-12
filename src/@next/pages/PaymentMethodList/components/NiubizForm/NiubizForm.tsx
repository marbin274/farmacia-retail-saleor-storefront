import React, { FC, useEffect, useState } from "react";
import { Formik } from "formik";
import { Loader } from "@components/atoms";
import { alertService } from "@components/atoms/Alert";
import { IAlertServiceProps } from "@components/atoms/Alert/types";
import { InputField } from "@farmacia-retail/farmauna-components";
import americanExpress from "@temp/images/auna/american-express-payment.svg";
import dinersClub from "@temp/images/auna/diners-club-payment.svg";
import masterCardIcon from "@temp/images/auna/mastercard-payment.svg";
import niubizTextIcon from "@temp/images/auna/niubiz-text.svg";
import visaIcon from "@temp/images/auna/visa-payment.svg";
import ReactSVG from "react-svg";
import farmatheme from "@farmatheme";
import { AVAILABLE_PAYMENTS } from "@temp/core/config";
import {
  createSession,
  createToken,
  cardTokenization,
  ICardTokenizationResult,
} from "@temp/core/payments/niubiz";
import ErrorFormPopulateIcon from "images/auna/form-populate-error.svg";
import { INiubizFormProps, IFormPayment } from "./types";
import _ from "lodash";
import * as S from "./styles";
import {
  getConfigElement,
  getSessionRequirements,
  getTokenRequirements,
  getTokenizerRequirements,
  getCardTokenizationRequirements,
} from "./utils";

const config = AVAILABLE_PAYMENTS[0].config;

const styles = {
  hidde: {
    display: "none",
  },
  show: {
    display: "block",
  },
};

enum ERROR_DICTIONARY {
  CARD_NUMBER = 0,
  EXPIRATION_DATE = 1,
  CVV = 2,
}

const errorsDictionary = ["invalid_number", "invalid_expiry", "invalid_cvc"];

const NAME_REQUIRED = "Ingresa el nombre de la tarjeta";
const LASTNAME_REQUIRED = "Ingresa el apellido de la tarjeta";
const EMAIL_REQUIRED = "Ingresa tu correo electrónico";

export const validatePaymentGateway = (values: IFormPayment) => {
  const errors: Partial<IFormPayment> = {};
  if (!values.name) errors.name = NAME_REQUIRED;
  if (!values.lastname) errors.lastname = LASTNAME_REQUIRED;
  if (!values.email) errors.email = EMAIL_REQUIRED;

  return errors;
};

export const initialValuesFormPayment: IFormPayment = {
  name: "",
  lastname: "",
  email: "",
};

export const NiubizForm: FC<INiubizFormProps> = ({
  formId,
  formRef,
  generatePurchaseNumber,
  onError,
  userDataForNiubiz,
  onCardTokenization,
}) => {
  const [token, setToken] = useState<string>();
  const [showForm, setShowForm] = useState(false);
  const [formErrors, setFormErrors] = useState<any[]>([]);

  useEffect(() => {
    const purchaseNumber = generatePurchaseNumber().toString();

    const payformUrl =
      getConfigElement(config, "nb_payform_url") ||
      "https://pocpaymentserve.s3.amazonaws.com/payform.min.js";

    const script: HTMLScriptElement = document.createElement("script");
    const idIframes: string = "tmx_tags_iframe";
    script.src = payformUrl;
    script.async = true;
    document.body.appendChild(script);
    createTokenScript(purchaseNumber);

    return () => {
      removeNiubizElements(script, idIframes);
    };
  }, []);

  // FIXME: repetido
  const createTokenScript = (purchaseNumber: string) => {
    const tokenRequirements = getTokenRequirements(config);
    const amount = 1; // totalPrice?.gross.amount.toString();
    // @ts-ignore
    createToken(tokenRequirements)
      .then((token: any) => {
        setToken(token);
        const sessionRequirements = getSessionRequirements(
          config,
          token,
          amount,
          userDataForNiubiz
        );
        return createSession(sessionRequirements);
      })
      .then(key => {
        const tokenizerRequirements = getTokenizerRequirements(
          config,
          key,
          amount
        );
        const configuration = {
          amount,
          callbackurl: "",
          channel: "paycard", // "web",
          font:
            "https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap",
          language: "es",
          merchantConfiguration: {
            tokenizationEnabled: true,
          },
          merchantid: tokenizerRequirements.merchantId,
          purchasenumber: purchaseNumber,
          recurrentmaxamount: "1", // "1000.00",
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
            setFormErrors(data.filter(x => x.type === "validation_error"));
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
        _window.cardExpiry.then(element => {
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

  const getErrorFromDictionary = (errorDictionary: ERROR_DICTIONARY) => {
    return formErrors.length &&
      formErrors.filter(x => x.code === errorsDictionary[errorDictionary])
        .length ? (
      <div className="error number-creditcard-error">
        {
          formErrors.filter(
            x => x.code === errorsDictionary[errorDictionary]
          )[0].message
        }
      </div>
    ) : (
      ""
    );
  };

  const configureErrorMessages = (alert: IAlertServiceProps) => {
    alertService.sendAlert(alert);
    onError?.();
  };

  const handleSubmit = async (formData: IFormPayment) => {
    const data: any = {
      alias: "KS",
      email: formData.email,
      lastName: formData.lastname,
      name: formData.name,
      userBlockId: Math.floor(Math.random() * 10000) + 1,
    };

    handleTokenization(data);
    // TODO: validar si va a transaccion o a tokenizar
    // niubizTransaction(data);
  };

  const showTokenizationCommonError = () => {
    configureErrorMessages({
      buttonText: "Entendido",
      message: "Ha ocurrido un error al procesar la solicitud.",
      type: "Text",
    });
  };

  // @ts-ignore
  const handleTokenization = (data: {
    alias: string;
    email: string;
    lastName: string;
    name: string;
    userBlockId?: string;
  }) => {
    try {
      // @ts-ignore
      window.payform
        .createToken(
          // @ts-ignore
          [window.cardNumber, window.cardExpiry, window.cardCvv],
          data
        )
        .then(async (result: any) => {
          const transactionToken = result.transactionToken;

          if (transactionToken) {
            const ctRequirements = getCardTokenizationRequirements(
              config,
              transactionToken,
              token
            );

            cardTokenization(ctRequirements)
              .then((res: ICardTokenizationResult) => {
                if (res.errorCode === 0) {
                  onCardTokenization?.({
                    ...res,
                    card: { ...res.card, bin: result.bin },
                  });
                } else {
                  showTokenizationCommonError();
                }
              })
              .catch(() => {
                showTokenizationCommonError();
              });
          } else {
            showTokenizationCommonError();
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

  return (
    <div>
      {showForm ? <label htmlFor=""></label> : <Loader fullScreen={true} />}
      <Formik
        initialValues={initialValuesFormPayment}
        validate={(values: IFormPayment) => {
          const formErrors = validatePaymentGateway(values);

          if (!_.isEmpty(formErrors)) {
            onError?.();
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
                  <h5 className="card-subtitle">Pagos seguros con</h5>
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
