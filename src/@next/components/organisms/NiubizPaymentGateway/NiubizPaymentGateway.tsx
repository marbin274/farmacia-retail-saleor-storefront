import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import classNames from "classnames";
import { Checkbox, Loader } from "@components/atoms";
import { PopAlert } from "@components/molecules";
import { InputField } from "@farmacia-retail/farmauna-components";
import farmatheme from "@farmatheme";
import americanExpress from "@temp/images/auna/american-express-payment.svg";
import dinersClub from "@temp/images/auna/diners-club-payment.svg";
import masterCardIcon from "@temp/images/auna/mastercard-payment.svg";
import niubizTextIcon from "@temp/images/auna/niubiz-text.svg";
import visaIcon from "@temp/images/auna/visa-payment.svg";
import CardTickIcon from "images/auna/card-tick.svg";
import { ICardData } from "@types";
import ErrorFormPopulateIcon from "images/auna/form-populate-error.svg";
import ReactSVG from "react-svg";
import _ from "lodash";
import {
  cardTokenization,
  createSession,
  createToken,
  ICardTokenizationResult,
  INiubizCreateTokenData,
} from "../../../../core/payments/niubiz";
import { alertService } from "../../atoms/Alert";
import { IAlertServiceProps } from "../../atoms/Alert/types";
import { validatePaymentGateway } from "./NiubizPaymentGatewayValidation";
import * as S from "./styles";
import { IFormPayment, initialValuesFormPayment, IProps } from "./types";
import {
  getConfigElement,
  getTokenRequirements,
  getSessionRequirements,
  getTokenizerRequirements,
  getCardTokenizationRequirements,
} from "./utils";

enum ERROR_DICTIONARY {
  CARD_NUMBER = 0,
  EXPIRATION_DATE = 1,
  CVV = 2,
}

const errorsDictionary = ["invalid_number", "invalid_expiry", "invalid_cvc"];

const styles = {
  hidde: {
    display: "none",
  },
  show: {
    display: "block",
  },
};

const NiubizPaymentGateway: React.FC<IProps> = ({
  config,
  errors = [],
  formRef,
  formId,
  fullWidthInputs,
  generatePurchaseNumber,
  onClickSaveCard,
  onCardTokenization,
  onError,
  onForceReRender,
  processPayment,
  saveCardSelected,
  showSaveCardCheck,
  totalPrice,
  userDataForNiubiz,
}: IProps) => {
  const [token, setToken] = useState<string>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<any[]>([]);

  useEffect(() => {
    const purchaseNumber = generatePurchaseNumber(
      saveCardSelected && showSaveCardCheck
    ).toString();

    const payformUrl =
      getConfigElement(config, "nb_payform_url") ||
      "https://pocpaymentserve.s3.amazonaws.com/payform.min.js";

    const script: HTMLScriptElement = document.createElement("script");
    const idIframes: string = "tmx_tags_iframe"; // IFrame Ids loaded by Niubiz - share same Id
    script.src = payformUrl;
    script.async = true;
    document.body.appendChild(script);
    createTokenScript(purchaseNumber);

    return () => {
      removeNiubizElements(script, idIframes);
    };
  }, []);

  const createTokenScript = (purchaseNumber: string) => {
    const tokenRequirements = getTokenRequirements(config);
    const amount = saveCardSelected ? 1 : totalPrice?.gross.amount.toString();
    const channel = saveCardSelected ? "paycard" : "web";
    // @ts-ignore
    createToken(tokenRequirements)
      .then((token: any) => {
        if (saveCardSelected) {
          setToken(token);
        }

        const sessionRequirements = getSessionRequirements(
          config,
          token,
          amount,
          userDataForNiubiz,
          channel
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
          channel,
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

  const configureErrorMessages = (alert: IAlertServiceProps) => {
    alertService.sendAlert(alert);
    onError(errors);
  };

  const handleSubmit = async (formData: IFormPayment) => {
    const data: INiubizCreateTokenData = {
      alias: "KS",
      email: formData.email,
      lastName: formData.lastname,
      name: formData.name,
    };

    if (saveCardSelected) {
      data.userBlockId = Math.floor(Math.random() * 10000) + 1;
      handleTokenization(data);
    } else {
      data.recurrence = false;
      niubizTransaction(data);
    }
  };

  const niubizTransaction = (data: INiubizCreateTokenData) => {
    createPayFormToken(data, result => {
      const bin = "bin";
      const cardData: ICardData = {
        firstDigits: result[bin],
      };
      processPayment?.(result.transactionToken, cardData);
    });
  };

  const createPayFormToken = (data: any, callback: (result: any) => void) => {
    try {
      // @ts-ignore
      window.payform
        .createToken(
          // @ts-ignore
          [window.cardNumber, window.cardExpiry, window.cardCvv],
          data
        )
        .then((result: any) => {
          if (result.transactionToken) {
            callback(result);
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

  const handleTokenization = (data: INiubizCreateTokenData) => {
    createPayFormToken(data, result => {
      const ctRequirements = getCardTokenizationRequirements(
        config,
        result.transactionToken,
        token
      );

      cardTokenization(ctRequirements)
        .then((res: ICardTokenizationResult) => {
          if (res.errorCode === 0) {
            onCardTokenization?.({
              ...res,
              card: { ...res.card, bin: result.bin, email: data.email },
            });
          } else {
            showTokenizationCommonError();
          }
        })
        .catch(() => {
          showTokenizationCommonError();
        });
    });
  };

  const showTokenizationCommonError = () => {
    configureErrorMessages({
      buttonText: "Volver a intentar",
      message: (
        <>
          <p>
            1. Por favor verifica que los datos de tu tarjeta sean correctos.{" "}
          </p>
          <br />
          <p>
            2. Verifica que tu tarjeta sea válida o intenta con una distinta.
          </p>
        </>
      ),
      type: "Text",
      acceptDialog: () => {
        onForceReRender?.();
      },
    });
  };

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
          <div>
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
                  <div
                    className={classNames("fa-flex fa-mb-6", {
                      "fa-justify-center fa-items-start lg:fa-justify-start lg:fa-items-center fa-flex-col lg:fa-flex-row": !fullWidthInputs,
                      "fa-justify-center fa-flex-col": fullWidthInputs,
                    })}
                  >
                    <div
                      className={classNames("fa-font-semibold", {
                        "fa-mb-2 lg:fa-mb-0 lg:fa-mr-6": !fullWidthInputs,
                        "fa-mb-2": fullWidthInputs,
                      })}
                    >
                      Pagos seguros con:
                    </div>
                    <div className="fa-flex fa-items-center">
                      <ReactSVG path={niubizTextIcon} className="fa-mr-2" />
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
                    </div>
                  </div>

                  {showSaveCardCheck && (
                    <>
                      <PopAlert
                        title="Ahora puedes guardar tu tarjeta"
                        message="Activa el check completa los datos de la tarjeta y tu próxima compra será más rápida."
                        icon={<img width={20} src={CardTickIcon} />}
                        className="fa-w-full md:fa-w-96"
                      />
                      <div className="fa-flex fa-mb-2">
                        <Checkbox
                          checked={saveCardSelected}
                          name="saveCard"
                          onChange={() => onClickSaveCard?.(!saveCardSelected)}
                        />
                        <span>
                          <span className="fa-font-semibold fa-text-sm">
                            Guardar
                          </span>{" "}
                          en mis{" "}
                          <span className="fa-font-semibold fa-text-sm">
                            medios de pago
                          </span>
                        </span>
                      </div>
                    </>
                  )}

                  <div
                    className={classNames({
                      row: !fullWidthInputs,
                      "row-w-full": fullWidthInputs,
                    })}
                  >
                    <div
                      className={classNames({
                        "row-input": !fullWidthInputs,
                        "row-input-w-full": fullWidthInputs,
                      })}
                    >
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
                    <div
                      className={classNames({
                        "row-input": !fullWidthInputs,
                        "row-input-w-full": fullWidthInputs,
                      })}
                    >
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
                    <div
                      className={classNames({
                        "row-input": !fullWidthInputs,
                        "row-input-w-full": fullWidthInputs,
                      })}
                    >
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
          </div>
        )}
      </Formik>
    </div>
  );
};

export { NiubizPaymentGateway };
