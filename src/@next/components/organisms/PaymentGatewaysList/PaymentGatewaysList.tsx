import React, { useEffect, useState } from "react";
import { NiubizPaymentGateway } from "@components/organisms/NiubizPaymentGateway";
import { Loader } from "@components/atoms";
import { PROVIDERS } from "@temp/core/config";
import { IProps } from "./types";
import * as S from "./styles";

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
  }, [voucherCode]);
  return (
    <S.Wrapper>
      {paymentGateways.map(({ id, name, config }, index) => {
        switch (id) {
          case PROVIDERS.DUMMY.id:
            return <div key={index}></div>;
          case PROVIDERS.AUNA.id: {
            return (
              <div key={index}>
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
                ) : (
                  <Loader />
                )}
              </div>
            );
          }
        }
      })}
    </S.Wrapper>
  );
};

export { PaymentGatewaysList };
