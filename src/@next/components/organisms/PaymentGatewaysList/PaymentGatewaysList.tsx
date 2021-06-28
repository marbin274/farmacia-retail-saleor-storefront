import React, { useEffect, useState } from "react";
import { NiubizPaymentGateway } from "@components/organisms/NiubizPaymentGateway";
import { NOT_CHARGE_TOKEN } from "@components/organisms/DummyPaymentGateway";
import { TileRadio } from "@components/molecules";
import { POS_DISTRICTS, PROVIDERS } from "@temp/core/config";
import PosIcon from "images/auna/pos.svg";
import { IProps } from "./types";
import * as S from "./styles";
import * as Sentry from "@sentry/react";
import { DummyPaymentGateway } from "..";

const PaymentGatewaysList: React.FC<IProps> = ({
  paymentGateways,
  selectedPaymentGateway,
  selectPaymentGateway,
  formRef,
  formId,
  processPayment,
  errors,
  gatewayListError,
  onError,
  changeRequestPayload,
  totalPrice,
  userDataForNiubiz,
  voucherCode,
  reRender,
  selectedDistrict,
  setGatewayListError,
}: IProps) => {
  // @ts-ignore
  const [token, setToken] = useState("");
  // @ts-ignore
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const pathname = window.location.pathname;
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

  const generatePurchaseNumber = (): number => {
    const payload: any = {
      purchase_number: Math.floor(Math.random() * (999999999999 - 1)) + 1,
    };

    changeRequestPayload(payload);
    localStorage.setItem("purchase_number", payload.purchase_number);
    
    return payload.purchase_number;
  };

  const onSelectPaymentMethod = (
    id: string,
    shouldGeneratePurchaseNumber: boolean
  ) => {
    setGatewayListError(null);
    if (shouldGeneratePurchaseNumber) {
      generatePurchaseNumber();
    }
    selectPaymentGateway?.(id);
  };

  const hasListError = !!gatewayListError;

  return (
    <S.Wrapper>
      {paymentGateways.map(({ id, config }, index) => {
        const checked = selectedPaymentGateway === id;

        switch (id) {
          case PROVIDERS.DUMMY.id:
            return (
              <TileRadio
                key={index}
                label={PROVIDERS.DUMMY.label}
                radioProps={{ name: "payment-method", value: "dummy", checked }}
                onClick={() => onSelectPaymentMethod(id, true)}
                hasError={hasListError}
              >
                <DummyPaymentGateway
                  formRef={formRef}
                  formId={formId}
                  processPayment={token => processPayment(id, token)}
                />
              </TileRadio>
            );
          case PROVIDERS.POS.id:
            if (!POS_DISTRICTS.includes(selectedDistrict.toLocaleLowerCase())) {
              return null;
            }

            return (
              <TileRadio
                key={index}
                label={PROVIDERS.POS.label}
                radioProps={{ name: "payment-method", value: "pos", checked }}
                onClick={() => onSelectPaymentMethod(id, true)}
                hasError={hasListError}
              >
                <div className="fa-flex fa-items-center">
                  <img
                    src={PosIcon}
                    width={32}
                    height={32}
                    className="fa-mr-2"
                  />
                  <div className="fa-text-xs">
                    El motorizado se acercará a tu dirección con un POS para
                    efectuar el pago con tarjeta.
                  </div>
                  <form
                    id={formId}
                    ref={formRef}
                    onSubmit={() => {
                      processPayment(id, NOT_CHARGE_TOKEN);
                    }}
                  />
                </div>
              </TileRadio>
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
                onClick={() => onSelectPaymentMethod(id, false)}
                hasError={hasListError}
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
                    totalPrice={totalPrice}
                    userDataForNiubiz={userDataForNiubiz}
                    generatePurchaseNumber={generatePurchaseNumber}
                  />
                )}
              </TileRadio>
            );
          }
        }
      })}
      {hasListError && (
        <p className="fa-text-error-medium fa-text-sm">{gatewayListError}</p>
      )}
    </S.Wrapper>
  );
};

export { PaymentGatewaysList };
