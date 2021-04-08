import React, { useEffect, useState } from "react";

// import {AunaPaymentGateway} from "@components/organisms/AunaPaymentGateway";
import { NiubizPaymentGateway } from "@components/organisms/NiubizPaymentGateway";
import visaIcon from "@temp/images/auna/visa-payment.svg";
import masterCardIcon from "@temp/images/auna/mastercard-payment.svg";
import niubizTextIcon from "@temp/images/auna/niubiz-text.svg"
import americanExpress from "@temp/images/auna/american-express-payment.svg";
import dinersClub from "@temp/images/auna/diners-club-payment.svg";
import ReactSVG from "react-svg";
import { Loader } from "@components/atoms";
import { PROVIDERS } from "@temp/core/config";
import { IProps } from "./types";
import * as S from "./styles";
import * as Sentry from "@sentry/react";
// import { useHistory } from "react-router";

const PaymentGatewaysList: React.FC<IProps> = ({
  paymentGateways,
  selectedPaymentGateway,
  selectPaymentGateway,
  formRef,
  formId,
  processPayment,
  errors,
  onError,
  changeRequestPayload,
  requestPayload,
  totalPrice,
  userDataForNiubiz,
  voucherCode,
  reRender,
}: IProps) => {

  // @ts-ignore
  const [token, setToken] = useState("");
  // @ts-ignore
  const [orderNumber, setOrderNumber] = useState("");

  // const history = useHistory();
  useEffect(() => {
    const pathname = window.location.pathname;
    // alert(pathname);
    const pathElements = pathname.split("/");
    if (selectPaymentGateway) {
      selectPaymentGateway("");
    }
    if (pathElements.length > 0) {
      setToken(pathElements[4]);
      setOrderNumber(pathElements[5]);
    }
    selectedPaymentGateway = undefined;
    if (!paymentGateways.length) {
      Sentry.captureException(
        "Error al renderizar los metodos de pago (Lista vacia).",
        {
          level: Sentry.Severity.Error,
        }
      );
    }
  }, [voucherCode]);
  return (
    <S.Wrapper>
      {paymentGateways.map(({ id, name, config }, index) => {
        const checked = selectedPaymentGateway === id;

        switch (id) {
          case PROVIDERS.DUMMY.id:
            return (
              <div key={index}>
               
              </div>
            );
          case PROVIDERS.AUNA.id: {
            return (
              <div key={index}>
                <S.PaymentSubtitle>
                  Pagos seguros con:
                </S.PaymentSubtitle>
                <S.RadioContainerPayment>
                    <S.PaymentLine>
                      <S.PaymentIconNiubiz >  
                        <ReactSVG path={niubizTextIcon} />
                      </S.PaymentIconNiubiz>
                      <S.PaymentIcon checked={checked}>
                        <ReactSVG path={visaIcon} />
                      </S.PaymentIcon>
                      <S.PaymentIcon checked={checked}>
                        <ReactSVG path={masterCardIcon} />
                      </S.PaymentIcon>
                      <S.PaymentIcon checked={checked}>
                        <ReactSVG path={americanExpress} />
                      </S.PaymentIcon>
                      <S.PaymentIcon checked={checked}>
                        <ReactSVG path={dinersClub} />
                      </S.PaymentIcon>
                    </S.PaymentLine>
                </S.RadioContainerPayment>
                {reRender ? (
                  <NiubizPaymentGateway
                    config={config}
                    formRef={formRef}
                    formId={formId}
                    processPayment={(token, card) =>
                      processPayment(id, token, card)
                    }
                    errors={errors}
                    onError={onError}
                    changeRequestPayload={changeRequestPayload}
                    requestPayload={requestPayload}
                    totalPrice={totalPrice}
                    userDataForNiubiz={userDataForNiubiz}
                  />

                ) : <Loader />}
              </div>
            );
          }
        }
      })}
    </S.Wrapper>
  );
};

export { PaymentGatewaysList };
