// TODO: We'll remove the commented code after complete the unhappy path

import React, { useEffect, useState } from "react";
// import { useCart } from "@sdk/react";
import { Formik } from "formik";
import { ErrorMessage, Loader } from "@components/atoms";
// import { Loader } from "@components/atoms";
// import { CreditCardForm } from "@components/organisms";
// import { IFormError, IPaymentGateway, IPaymentGatewayConfig } from "@types";
import { IFormError, IPaymentGatewayConfig } from "@types";

import {
  createSession,
  createToken,
  ErrorData,
  GatewayOptions,
  // niubizPayment,
  // ICardInputs,
  // ICardPaymentInput,
  // IPaymentCardError,
  // PaymentData,
  // setConfiguration,
  // tokenizeCreditCard,
} from "../../../../core/payments/niubiz";
// import { maybe, removeEmptySpaces } from "../../../../core/utils";

import * as S from "./styles";
import { IProps } from "./types";
// import { Observable } from "apollo-link";
// import { tokenAuthMutation } from "@temp/@sdk/mutations/auth";

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
  return config.find(x => x.field === element)?.value;
};

const getTokenRequirements = (config: IPaymentGatewayConfig[]) => {
  console.table(config);
  const securityAPI =
    getConfigElement(config, "nb_security_api") ||
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
  amount: any
) => {
  const merchantId = getConfigElement(config, "merchant_id") || "342062522";

  const sessionAPI =
    getConfigElement(config, "nb_session_url") ||
    "https://apitestenv.vnforapps.com/api.ecommerce/v2/ecommerce/token/session";

  const url = sessionAPI + merchantId;
  const total = amount;

  const sessionRequirements: GatewayOptions = {
    amount: total,
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
  postalCode,
  onError,
  requestPayload,
  totalPrice,
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
    getConfigElement(config, "payform_url") ||
    "https://pocpaymentserve.s3.amazonaws.com/payform.min.js";

  // const clientToken = config.find(({ field }) => field === "client_token")
  //   ?.value;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = payformUrl;
    script.async = true;
    document.body.appendChild(script);

    // const cssRemoteFile = "https://pocpaymentserve.s3.amazonaws.com/payform.min.css";
    // const style = document.createElement("link");
    // style.rel = "stylesheet";
    // style.href = cssRemoteFile;
    // document.body.appendChild(style);

    const tokenRequirements = getTokenRequirements(config);
    const amount = totalPrice?.gross.amount.toString();
    // @ts-ignore
    createToken(tokenRequirements)
      .then((token: any) => {
        const sessionRequirements = getSessionRequirements(
          config,
          token,
          amount
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
  }, []);

  // const setCardErrorsHelper = (errors: IPaymentCardError[]) =>
  //   errors.map(({ field, message }: IPaymentCardError) =>
  //     setCardErrors(({ fieldErrors }) => ({
  //       fieldErrors: {
  //         ...fieldErrors,
  //         [field]: { field, message },
  //       },
  //     }))
  //   );

  // const tokenizeCcCard = async (creditCard: ICardPaymentInput) => {
  //   const amount = totalPrice?.gross.amount.toString();
  //   const tokenizerRequirements = getTokenizerRequirements(
  //     config,
  //     sessionKey,
  //     amount
  //   );

  //   tokenizeCreditCard(tokenizerRequirements)
  //     .then(res => {
  //       console.log("response here");
  //       console.log(res);
  //     })
  //     .catch(console.log);

  //   setCardErrors(INITIAL_CARD_ERROR_STATE);
  //   try {
  //     if (clientToken) {
  //       const cardData = (await niubizPayment(
  //         clientToken,
  //         creditCard
  //       )) as PaymentData;
  //       return cardData;
  //     } else {
  //       const niubizTokenErrors = [
  //         {
  //           message: "Niubiz gateway misconfigured. Client token not provided.",
  //         },
  //       ];
  //       setSubmitErrors(niubizTokenErrors);
  //       onError(niubizTokenErrors);
  //     }
  //   } catch (errors) {
  //     setCardErrorsHelper(errors);
  //     onError(errors);
  //     return null;
  //   }
  // };

  const handleSubmit = async (formData: any) => {
    // console.log("formData", formData);
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

    // console.log(data);

    // // @ts-ignore
    // console.log(window.cardNumber);
    // // @ts-ignore
    // console.log(window.cardExpiry);
    // // @ts-ignore
    // console.log(window.cardCvv);

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
          // console.table(transactionToken);
          processPayment(transactionToken);
        } else {
          const niubizPayloadErrors = [
            {
              message:
                "Payment submission error. Niubiz gateway returned no token in payload.",
            },
          ];
          setSubmitErrors(niubizPayloadErrors);
          onError(niubizPayloadErrors);
        }
      });

    // const creditCard: ICardPaymentInput = {
    //   billingAddress: { postalCode },
    //   cvv: removeEmptySpaces(maybe(() => formData.ccCsc, "") || ""),
    //   expirationDate: removeEmptySpaces(maybe(() => formData.ccExp, "") || ""),
    //   number: removeEmptySpaces(maybe(() => formData.ccNumber, "") || ""),
    // };
    // const payment = await tokenizeCcCard(creditCard);
    // if (payment?.token) {
    //   processPayment(payment?.token, {
    //     brand: payment?.ccType,
    //     lastDigits: payment?.lastDigits,
    //   });
    // } else {
    //   const niubizPayloadErrors = [
    //     {
    //       message:
    //         "Payment submission error. Niubiz gateway returned no token in payload.",
    //     },
    //   ];
    //   setSubmitErrors(niubizPayloadErrors);
    //   onError(niubizPayloadErrors);
    // }
  };

  const allErrors = [...errors, ...submitErrors];
  const styles = {
    hidde: {
      display: "none",
    },
    show: {
      display: "block",
    },
  };

  return (
    <div>
      {showForm ? <label htmlFor=""></label> : <Loader fullScreen={true} />}
      <Formik
        initialValues={null}
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
                  <h4 className="card-title">Tarjeta de crédito</h4>
                  <h5>Paga con tarjetas visa y mastercard</h5>
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
