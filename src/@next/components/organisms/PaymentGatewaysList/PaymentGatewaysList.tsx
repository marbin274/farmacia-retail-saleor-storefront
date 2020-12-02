import React, { useEffect, useState } from "react";

// import {AunaPaymentGateway} from "@components/organisms/AunaPaymentGateway";
import { DummyPaymentGateway } from "@components/organisms/DummyPaymentGateway";
import { NiubizPaymentGateway } from "@components/organisms/NiubizPaymentGateway";
import { ErrorMessage, Radio } from "@components/atoms";
import creditCardIcon from "@temp/images/auna/icon-credit-card.svg";
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
  checkoutBillingAddress,
  onError,
  requestPayload,
  totalPrice,
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

    if (pathElements.length > 0) {
      setToken(pathElements[4]);
      setOrderNumber(pathElements[5]);
    }
  }, []);

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
                  <NiubizPaymentGateway
                    config={config}
                    formRef={formRef}
                    formId={formId}
                    processPayment={token => processPayment(id, token)}
                    errors={errors}
                    onError={onError}
                    requestPayload={requestPayload}
                    totalPrice={totalPrice}
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
      {!selectedPaymentGateway && errors && <ErrorMessage errors={errors} />}
    </S.Wrapper>
  );
};

export { PaymentGatewaysList };
