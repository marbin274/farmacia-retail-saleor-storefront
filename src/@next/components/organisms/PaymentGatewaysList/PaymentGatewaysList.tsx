import React, { useEffect, useState } from "react";
import { NiubizPaymentGateway } from "@components/organisms/NiubizPaymentGateway";
import { TileRadio } from "@components/molecules";
import { PROVIDERS } from "@temp/core/config";
import { IProps } from "./types";
import * as S from "./styles";
import * as Sentry from "@sentry/react";

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
      {paymentGateways.map(({ id, config }, index) => {
        const checked = selectedPaymentGateway === id;

        switch (id) {
          case PROVIDERS.POS.id:
            return (
              <TileRadio
                key={index}
                label={PROVIDERS.POS.label}
                radioProps={{ name: "payment-method", value: "pos", checked }}
                onClick={() => selectPaymentGateway?.(id)}
              />
            );
          case PROVIDERS.AUNA.id: {
            return (
              <TileRadio
                key={index}
                label={PROVIDERS.AUNA.label}
                radioProps={{
                  name: "payment-method",
                  value: "niubiz",
                  checked,
                }}
                onClick={() => selectPaymentGateway?.(id)}
              >
                {reRender && (
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
                )}
              </TileRadio>
            );
          }
        }
      })}
    </S.Wrapper>
  );
};

export { PaymentGatewaysList };
