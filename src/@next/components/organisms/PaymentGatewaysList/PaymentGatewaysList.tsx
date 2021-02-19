import React, { useEffect, useState } from "react";

// import {AunaPaymentGateway} from "@components/organisms/AunaPaymentGateway";
import { DummyPaymentGateway } from "@components/organisms/DummyPaymentGateway";
import { NiubizPaymentGateway } from "@components/organisms/NiubizPaymentGateway";
import { Radio } from "@components/atoms";
import creditCardIcon from "@temp/images/auna/icon-credit-card.svg";
import visaIcon from "@temp/images/auna/visa-payment.svg";
import masterCardIcon from "@temp/images/auna/mastercard-payment.svg";
import americanExpress from "@temp/images/auna/american-express-payment.svg";
import dinersClub from "@temp/images/auna/diners-club-payment.svg";
import ReactSVG from "react-svg";

import { PROVIDERS } from "@temp/core/config";
import { ThemeContext } from "styled-components";
import { IProps } from "./types";
import * as S from "./styles";
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
}: IProps) => {
  const customTheme = React.useContext(ThemeContext);

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
        const checked = selectedPaymentGateway === id;
        switch (id) {
          case PROVIDERS.DUMMY.id:
            return (
              <div key={index}>
                <S.Tile checked={checked}>
                  <Radio
                    data-cy="checkoutPaymentGatewayDummyInput"
                    name="payment-method"
                    value="dummy"
                    checked={checked}
                    onChange={() =>
                      selectPaymentGateway && selectPaymentGateway(id)
                    }
                    customLabel={true}
                  >
                    <S.PaymentLine>
                      <S.PaymentTitle
                        data-cy="checkoutPaymentGatewayDummyName"
                        checked={checked}
                      >
                        {name}
                      </S.PaymentTitle>
                      <S.PaymentIcon checked={checked}>
                        <ReactSVG
                          path={creditCardIcon}
                          svgStyle={{
                            stroke: S.getIconColor(checked, customTheme),
                          }}
                        />
                      </S.PaymentIcon>
                    </S.PaymentLine>
                  </Radio>
                </S.Tile>
                {checked && (
                  <DummyPaymentGateway
                    formRef={formRef}
                    formId={formId}
                    processPayment={token => processPayment(id, token)}
                  />
                )}
              </div>
            );
          case PROVIDERS.AUNA.id: {
            return (
              <div key={index}>
                <S.Tile checked={checked}>
                  <S.RadioContainerPayment>
                    <Radio
                      data-cy="checkoutPaymentGatewayDummyInput"
                      name="payment-method"
                      value="dummy"
                      checked={checked}
                      onChange={() =>
                        selectPaymentGateway && selectPaymentGateway(id)
                      }
                      customLabel={true}
                    >
                      <S.PaymentLine>
                        <S.PaymentTitle
                          data-cy="checkoutPaymentGatewayDummyName"
                          checked={checked}
                        >
                          <span>{name}</span>
                        </S.PaymentTitle>
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
                    </Radio>
                  </S.RadioContainerPayment>
                </S.Tile>
                {checked && (
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
              </div>
              // <div key={index}>
              //   <S.Tile checked={checked}>
              //     <Radio
              //       data-cy="checkoutPaymentGatewayDummyInput"
              //       name="payment-method"
              //       value="dummy"
              //       checked={checked}
              //       onChange={() =>
              //         selectPaymentGateway && selectPaymentGateway(id)
              //       }
              //       customLabel={true}
              //     >
              //       <S.PaymentLine>
              //         <S.PaymentTitle data-cy="checkoutPaymentGatewayDummyName" checked={checked}>
              //           AUNA Payment Gateway
              //         </S.PaymentTitle>
              //         <S.PaymentIcon checked={checked}>
              //           <ReactSVG path={creditCardIcon} svgStyle={{stroke: S.getIconColor(checked, customTheme)}}/>
              //         </S.PaymentIcon>
              //       </S.PaymentLine>
              //     </Radio>
              //   </S.Tile>
              //   {checked && (
              //     <AunaPaymentGateway
              //       config={config}
              //       formRef={formRef}
              //       formId={formId}
              //       onError={onError}
              //       processPayment={processPayment}
              //       checkoutBillingAddress={checkoutBillingAddress}
              //     />
              //   )}
              // </div>
            );
          }
        }
      })}
      {/* {!selectedPaymentGateway && errors && <ErrorMessage errors={errors} />} */}
    </S.Wrapper>
  );
};

export { PaymentGatewaysList };
