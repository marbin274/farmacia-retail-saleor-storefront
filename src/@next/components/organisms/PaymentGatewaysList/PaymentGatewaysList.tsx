import React, { useEffect, useState } from "react";
import {
  NiubizPaymentGateway,
  CardTokenPaymentGateway,
} from "@components/organisms";
import { NOT_CHARGE_TOKEN } from "@components/organisms/DummyPaymentGateway";
import { TileRadio, Collapse } from "@components/molecules";
import { POS_DISTRICTS, PROVIDERS } from "@temp/core/config";
import PosIcon from "images/auna/pos.svg";
import { IProps } from "./types";
import * as S from "./styles";
import { DummyPaymentGateway } from "..";
import { IPaymentGatewayConfig } from "@temp/@next/types";
import { useUserDetails } from "@temp/@sdk/react";

const CARD_TOKEN_OPTION = 1;
const CARD_FORM_OPTION = 2;

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
  const [collapseOption, setCollapseOption] = useState<number>();
  const { data: user, loading: userLoading } = useUserDetails();
  const [selectedCardToken, setSelectedCardToken] = useState<string>();
  const [cardTokenError, setCardTokenError] = useState<string>();

  const userHasCardTokens = user?.cardTokens?.length > 0;

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
    if (userLoading || id === selectedPaymentGateway) {
      return;
    }

    setGatewayListError(null);
    if (shouldGeneratePurchaseNumber) {
      generatePurchaseNumber();
    }
    selectPaymentGateway?.(id);

    setSelectedCardToken(undefined);
    setCardTokenError(undefined);

    if (id === PROVIDERS.AUNA.id && userHasCardTokens) {
      selectCardTokenOption();
    } else {
      setCollapseOption(undefined);
    }
  };

  const selectCardTokenOption = () => {
    setCollapseOption(CARD_TOKEN_OPTION);
    generatePurchaseNumber();
  };

  const hasListError = !!gatewayListError;

  const renderNiubizForm = (id: string, config: IPaymentGatewayConfig[]) => (
    <>
      {reRender && (
        <NiubizPaymentGateway
          config={config}
          formRef={formRef}
          formId={formId}
          processPayment={(token, card) =>
            processPayment({ gateway: id, token, cardData: card })
          }
          errors={errors}
          onError={onError}
          totalPrice={totalPrice}
          userDataForNiubiz={userDataForNiubiz}
          generatePurchaseNumber={generatePurchaseNumber}
        />
      )}
    </>
  );

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
                  processPayment={token =>
                    processPayment({ gateway: id, token })
                  }
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
                      processPayment({ gateway: id, token: NOT_CHARGE_TOKEN });
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
                contentNoSpacing={userHasCardTokens}
              >
                {userHasCardTokens ? (
                  <>
                    <Collapse
                      header="Mi tarjeta guardada"
                      active={collapseOption === CARD_TOKEN_OPTION}
                      hasError={!!cardTokenError}
                      onClick={selectCardTokenOption}
                    >
                      <>
                        <CardTokenPaymentGateway
                          cardTokens={user?.cardTokens}
                          onSelectCardToken={ct => setSelectedCardToken(ct)}
                          selectedCardTokenId={selectedCardToken}
                        />
                        <form
                          id={formId}
                          ref={formRef}
                          onSubmit={() => {
                            setCardTokenError(undefined);
                            if (!selectedCardToken) {
                              onError([]);
                              setCardTokenError(
                                "Elige una tarjeta guardada o compra con una nueva"
                              );
                              return;
                            }

                            processPayment({
                              gateway: id,
                              token: selectedCardToken,
                              withToken: true,
                            });
                          }}
                        />
                      </>
                    </Collapse>
                    <Collapse
                      header="Comprar con tarjeta"
                      active={collapseOption === CARD_FORM_OPTION}
                      hasError={!!cardTokenError}
                      onClick={() => {
                        setSelectedCardToken(undefined);
                        setCollapseOption(CARD_FORM_OPTION);
                      }}
                    >
                      {renderNiubizForm(id, config)}
                    </Collapse>
                  </>
                ) : (
                  <>{renderNiubizForm(id, config)}</>
                )}
              </TileRadio>
            );
          }
        }
      })}
      {hasListError && (
        <p className="fa-text-error-medium fa-text-sm">{gatewayListError}</p>
      )}
      {cardTokenError && (
        <p className="fa-text-error-medium fa-text-sm">{cardTokenError}</p>
      )}
    </S.Wrapper>
  );
};

export { PaymentGatewaysList };
