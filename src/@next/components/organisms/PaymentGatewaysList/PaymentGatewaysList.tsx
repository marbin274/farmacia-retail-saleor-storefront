import {
  Alert,
  Collapse,
  PaymentPOS,
  PaymentYape,
  TileRadio,
} from '@components/molecules';
import {
  CardTokenPaymentGateway,
  NiubizPaymentGateway,
} from '@components/organisms';
import { NOT_CHARGE_TOKEN } from '@components/organisms/DummyPaymentGateway';
import { alertService } from '@temp/@next/services/AlertService';
import { IPaymentGatewayConfig } from '@temp/@next/types';
import { useCreateUserCardToken, useUserDetails } from '@temp/@sdk/react';
import { LocalRepository } from '@temp/@sdk/repository';
import { HIDE_CARDTOKENS_IN_CHECKOUT, PROVIDERS } from '@temp/core/config';
import { ICardTokenizationResult } from '@temp/core/payments/niubiz';
import React, { useEffect, useState } from 'react';
import { DummyPaymentGateway } from '..';
import {
  generateNiubizPurchaseNumber,
  initNiubizAntiFraud,
  loadNiubizAntiFraudScript,
} from '../NiubizPaymentGateway/utils';
import * as S from './styles';
import { IProps } from './types';

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
  onForceReRender,
}: IProps) => {
  // @ts-ignore
  const [token, setToken] = useState('');
  // @ts-ignore
  const [orderNumber, setOrderNumber] = useState('');
  const [collapseOption, setCollapseOption] = useState<number>();
  const { data: user, loading: userLoading } = useUserDetails();
  const [selectedCardToken, setSelectedCardToken] = useState<string>();
  const [cardTokenError, setCardTokenError] = useState<string>();
  const [saveCardSelected, setSaveCardSelected] = useState(false);
  const [cardNumberTosave, setCardNumberToSave] = useState<string>();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const localRepository = new LocalRepository();
  const userLoggedIn = !HIDE_CARDTOKENS_IN_CHECKOUT && !!user;
  const userHasCardTokens =
    !HIDE_CARDTOKENS_IN_CHECKOUT && user?.cardTokens?.length > 0;

  useEffect(() => {
    loadNiubizAntiFraudScript(() => {
      setScriptLoaded(true);
    });
  }, []);

  useEffect(() => {
    const pathname = window?.location.pathname;
    const pathElements = pathname.split('/');
    if (selectPaymentGateway) {
      selectPaymentGateway('');
    }
    if (pathElements.length > 0) {
      setToken(pathElements[4]);
      setOrderNumber(pathElements[5]);
    }
    selectedPaymentGateway = undefined;
  }, [voucherCode]);

  const [
    createUserCardToken,
    { data: createData, error: createError, loading: createLoading },
  ] = useCreateUserCardToken();

  useEffect(() => {
    if (createData?.user && !createData?.errors.length && !createError) {
      const currentCardToken = createData.user.cardTokens.find(
        (x) => x.cardNumber === cardNumberTosave
      );

      processPayment({
        gateway: PROVIDERS.AUNA.id,
        token: currentCardToken.id,
        withToken: true,
        cardData: {
          firstDigits: currentCardToken.binNumber,
        },
      });
      setCardNumberToSave(undefined);
    }

    if (!createData?.user && (createData?.errors.length > 0 || createError)) {
      onError([]);
      setCardNumberToSave(undefined);
      alertService.sendAlert({
        buttonText: 'Entendido',
        message: 'Ha ocurrido un error al intentar guardar la tarjeta',
        type: 'Text',
      });
    }
  }, [createData, createError]);

  const generatePurchaseNumber = (withAntiFraud?: boolean): number => {
    const purchaseNumber = generateNiubizPurchaseNumber();

    const payload: any = {
      purchase_number: purchaseNumber,
    };

    if (withAntiFraud) {
      const config = paymentGateways.find(
        (x) => x.id === PROVIDERS.AUNA.id
      ).config;

      payload.device_fingerprint = initNiubizAntiFraud(
        config,
        String(purchaseNumber)
      );
    }

    changeRequestPayload(payload);
    localRepository.setPurchase(String(purchaseNumber));

    return purchaseNumber;
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
    generatePurchaseNumber(true);
  };

  const onChangeSaveCardSelected = (value: boolean) => {
    setSaveCardSelected(value);
    onForceReRender?.();
  };

  const onCardTokenization = (data: ICardTokenizationResult) => {
    if (createLoading) {
      return;
    }

    const { card, token } = data;

    setCardNumberToSave(card.cardNumber);
    createUserCardToken({
      input: {
        binNumber: card.bin,
        brand: card.brand,
        cardNumber: card.cardNumber,
        tokenId: token.tokenId,
        firstName: card.firstName,
        lastName: card.lastName,
        email: card.email,
      },
    });
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
          saveCardSelected={saveCardSelected}
          onClickSaveCard={onChangeSaveCardSelected}
          showSaveCardCheck={userLoggedIn}
          onCardTokenization={onCardTokenization}
          onForceReRender={onForceReRender}
        />
      )}
    </>
  );

  if (!scriptLoaded) {
    return null;
  }

  if (paymentGateways?.length === 0) {
    return (
      <div>
        <Alert type="error" message="No se han encontrado medios pago" />
      </div>
    );
  }

  return (
    <S.Wrapper>
      {paymentGateways?.map(({ id, config }, index) => {
        const checked = selectedPaymentGateway === id;

        switch (id) {
          case PROVIDERS.DUMMY.id:
            return (
              <TileRadio
                key={index}
                label={PROVIDERS.DUMMY.label}
                radioProps={{ name: 'payment-method', value: 'dummy', checked }}
                onClick={() => onSelectPaymentMethod(id, true)}
                hasError={hasListError}
                className="fa-bg-white"
              >
                <DummyPaymentGateway
                  formRef={formRef}
                  formId={formId}
                  processPayment={(token) =>
                    processPayment({ gateway: id, token })
                  }
                />
              </TileRadio>
            );
          case PROVIDERS.POS.id:
            return (
              <TileRadio
                key={index}
                label={PROVIDERS.POS.label}
                radioProps={{ name: 'payment-method', value: 'pos', checked }}
                onClick={() => onSelectPaymentMethod(id, true)}
                hasError={hasListError}
                className="fa-bg-white"
              >
                <div className="fa-my-3">
                  <PaymentPOS />
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
          case PROVIDERS.YAPE.id:
            return (
              <TileRadio
                key={index}
                label={PROVIDERS.YAPE.label}
                radioProps={{ name: 'payment-method', value: 'yape', checked }}
                onClick={() => onSelectPaymentMethod(id, true)}
                hasError={hasListError}
                className="fa-bg-white"
              >
                <div className="fa-flex fa-items-start fa-mt-2 fa-mx-2 fa-mb-3">
                  <PaymentYape />
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
                  name: 'payment-method',
                  value: 'niubiz',
                  checked,
                }}
                onClick={() => onSelectPaymentMethod(id, false)}
                hasError={hasListError}
                contentNoSpacing
                className="fa-bg-white"
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
                          onSelectCardToken={(ct) => setSelectedCardToken(ct)}
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
                                'Elige una tarjeta guardada o compra con una nueva'
                              );
                              return;
                            }

                            const currentCardToken = user.cardTokens.find(
                              (x) => x.id === selectedCardToken
                            );

                            processPayment({
                              gateway: id,
                              token: selectedCardToken,
                              withToken: true,
                              cardData: {
                                firstDigits: currentCardToken.binNumber,
                              },
                            });
                          }}
                        />
                      </>
                    </Collapse>
                    <Collapse
                      header="Comprar con otra tarjeta"
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
                  <div className="fa-bg-neutral-light fa-p-4">
                    {renderNiubizForm(id, config)}
                  </div>
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
