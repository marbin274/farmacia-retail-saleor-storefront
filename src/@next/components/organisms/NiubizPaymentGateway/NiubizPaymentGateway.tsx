import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { ErrorMessage, Loader } from "@components/atoms";
import { ICardData, IFormError, IPaymentGatewayConfig } from "@types";
const ip = require("ip");

import {
  createSession,
  createToken,
  ErrorData,
  GatewayOptions,
} from "../../../../core/payments/niubiz";

import * as S from "./styles";
import { IProps } from "./types";
import ReactSVG from "react-svg";
import niubizIcon from "@temp/images/auna/niubiz-logo.svg";
import { IUserDataForNiubiz } from "../CheckoutPayment/types";

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
  const result = config.find(x => x.field === element)?.value;
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

const NiubizPaymentGateway: React.FC<IProps> = ({
  config,
  processPayment,
  formRef,
  formId,
  errors = [],
  onError,
  requestPayload,
  totalPrice,
  userDataForNiubiz,
}: IProps) => {
  // @ts-ignore
  const [sessionKey, setSessionKey] = useState("");
  const [submitErrors, setSubmitErrors] = useState<IFormError[]>([]);

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
      .then(key => {
        setSessionKey(key);
        const tokenizerRequirements = getTokenizerRequirements(
          config,
          key,
          amount
        );
        let purchaseNumber = "";
        if (requestPayload) {
          // @ts-ignore
          purchaseNumber = requestPayload.purchase_number;
        }
        const configuration = {
          amount,
          callbackurl: "",
          channel: "web",
          font:
            "https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap",
          language: "es",
          merchantConfiguration: {
            tokenizationEnabled: true,
          },
          merchantid: tokenizerRequirements.merchantId,
          purchasenumber: purchaseNumber,
          recurrentmaxamount: "1000.00",
          sessionkey: key,
        };

        // console.table(configuration);

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
              color: "#9194a7",
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
            placeholder: " ",
            style: elementStyles,
          },
          "txtNumeroTarjeta"
        );

        _window?.cardNumber.then((element: any) => {
          element.on("bin", (data: any) => {
            // console.log("BIN: ", data);
          });

          element.on("change", (data: any[]) => {
            // console.log("CHANGE: ", data);
            setFormErrors(data.filter(x => x.type === "validation_error"));
            if (data.length !== 0) {
              let error = "";
              for (const d of data) {
                error += "* " + d.message + "\n";
              }

              if (error !== "") {
                // TODO: Replace this line with a proper error management tool
                // console.log(error);
                // alert(error);
              }
            }
          });
        });

        _window.cardCvv = _payform.createElement(
          "card-cvc",
          {
            placeholder: " ",
            style: elementStyles,
          },
          "txtCvv"
        );

        _window.cardCvv.then((element: any) => {
          element.on("change", (data: any) => {
            // console.log("CHANGE CVV2: ", data);
          });
        });

        _window.cardExpiry = _payform.createElement(
          "card-expiry",
          {
            placeholder: " ",
            style: elementStyles,
          },
          "txtFechaVencimiento"
        );

        // @ts-ignore
        _window.cardExpiry.then(element => {
          setShowForm(true);

          element.on("change", (data: any[]) => {
            // console.log("CHANGE F.V: ", data);
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

  const configureErrorMessages = (errors: any) => {
    setSubmitErrors(errors);
    onError(errors);
  };

  const handleSubmit = async (formData: any) => {
    setSubmitErrors([]);

    const data = {
      alias: "KS",
      // @ts-ignore
      email: document.getElementById("email")?.value,
      // @ts-ignore
      lastName: document.getElementById("apellido")?.value,
      // @ts-ignore
      name: document.getElementById("nombre")?.value,
      recurrence: false,
    };

    try {
      // @ts-ignore
      window.payform
        .createToken(
          // @ts-ignore
          [window.cardNumber, window.cardExpiry, window.cardCvv],
          data
        )
        .then((result: any) => {
          console.table(result);
          const key = "transactionToken";
          const transactionToken = result[key] || undefined;
          if (transactionToken) {
            const bin = "bin";
            const cardData: ICardData = {
              firstDigits: result[bin],
            };
            processPayment(transactionToken, cardData);
          } else {
            const niubizPayloadErrors = [
              {
                message:
                  "Payment submission error. Niubiz gateway returned no token in payload.",
              },
            ];
            configureErrorMessages(niubizPayloadErrors);
          }
        })
        .catch((error: any) => {
          const niubizPayloadErrors = [
            {
              message: error,
            },
          ];

          // niubizPayloadErrors = [];
          configureErrorMessages(niubizPayloadErrors);
        });
    } catch (error) {
      const niubizPayloadErrors = [
        {
          message: error.message,
        },
      ];
      configureErrorMessages(niubizPayloadErrors);
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

  const allErrors = [...errors, ...submitErrors];
  const styles = {
    hidde: {
      display: "none",
    },
    show: {
      display: "block",
    },
  };

  const initialValues = {
    initial: "",
  };

  return (
    <div>
      {showForm ? <label htmlFor=""></label> : <Loader fullScreen={true} />}
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <S.Wrapper>
            <form action="" ref={formRef} id={formId} onSubmit={handleSubmit}>
              <div
                className="card"
                style={showForm ? styles.show : styles.hidde}
              >
                <S.Payment className="card-body">
                  <h4 className="card-title">
                    Paga con tarjetas visa y mastercard
                  </h4>
                  <h5>INGRESA LOS DATOS DE LA TARJETA</h5>
                  <div className="row">
                    <div className="identity">
                      <div>
                        <label htmlFor="">Nombre</label>
                        <input
                          type="text"
                          id="nombre"
                          className="form-control form-control-sm"
                          placeholder="Ejemplo: Juan"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Apellido</label>
                        <input
                          type="text"
                          id="apellido"
                          className="form-control form-control-sm"
                          placeholder="Ejemplo: Perez"
                        />
                      </div>
                    </div>
                    <div className="email">
                      <label htmlFor="">Email</label>
                      <input
                        type="text"
                        id="email"
                        className="form-control form-control-sm"
                        placeholder="ejemplo@mail.com"
                      />
                    </div>
                    <div className="creditcard">
                      <label htmlFor="">Número de tarjeta</label>
                      <div
                        id="txtNumeroTarjeta"
                        className="form-control form-control-sm ncp-card"
                      ></div>
                      {formErrors.length &&
                      formErrors.filter(x => x.code === errorsDictionary[0])
                        .length ? (
                        <div className="error">
                          {
                            formErrors.filter(
                              x => x.code === errorsDictionary[0]
                            )[0].message
                          }
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <br />

                    <div className="expirydate_and_cvv">
                      <div className="expirydate">
                        <label htmlFor="">Fecha de vencimiento</label>
                        <div
                          id="txtFechaVencimiento"
                          className="form-control form-control-sm"
                        ></div>
                        {formErrors.length &&
                        formErrors.filter(x => x.code === errorsDictionary[1])
                          .length ? (
                          <div className="error">
                            {
                              formErrors.filter(
                                x => x.code === errorsDictionary[1]
                              )[0].message
                            }
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="cvv">
                        <label htmlFor="">CVC</label>
                        <div
                          id="txtCvv"
                          className="form-control form-control-sm"
                        ></div>
                        {formErrors.length &&
                        formErrors.filter(x => x.code === errorsDictionary[2])
                          .length ? (
                          <div className="error">
                            {
                              formErrors.filter(
                                x => x.code === errorsDictionary[2]
                              )[0].message
                            }
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div>
                      <label>Pagos seguros con:</label>
                      <div className="niubiz-logo-container">
                        <ReactSVG path={niubizIcon} />
                      </div>
                    </div>
                  </div>
                </S.Payment>
              </div>
            </form>
            <ErrorMessage errors={allErrors} />
          </S.Wrapper>
        )}
      </Formik>
    </div>
  );
};

export { NiubizPaymentGateway };
