import React from "react";

import {ErrorMessage, Radio} from "@components/atoms";
import creditCardIcon from "@temp/images/auna/icon-credit-card.svg";

import { PROVIDERS } from "@temp/core/config";
import {ThemeContext} from "styled-components";

import {
  DummyPaymentGateway,
  } from "..";
import * as S from "./styles";
import { IProps } from "./types";
import ReactSVG from "react-svg";

/**
 * Payment Gateways list
 */
const PaymentGatewaysList: React.FC<IProps> = ({
  paymentGateways,
  selectedPaymentGateway,
  selectedPaymentGatewayToken,
  selectPaymentGateway,
  formRef,
  formId,
  processPayment,
  errors,
  // onError,
}: IProps) => {
  const customTheme = React.useContext(ThemeContext);

  return (
    <S.Wrapper>
      {paymentGateways.map(({ id, name, config }, index) => {
        const checked = selectedPaymentGateway === id;

        switch (name) {
          case PROVIDERS.DUMMY.label:
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
                      <S.PaymentTitle data-cy="checkoutPaymentGatewayDummyName" checked={checked}>
                        {name}
                      </S.PaymentTitle>
                      <S.PaymentIcon checked={checked}>
                        <ReactSVG path={creditCardIcon} svgStyle={{stroke: S.getIconColor(checked, customTheme)}}/>
                      </S.PaymentIcon>
                    </S.PaymentLine>
                  </Radio>
                </S.Tile>
                {checked && (
                  <DummyPaymentGateway
                    formRef={formRef}
                    formId={formId}
                    processPayment={token => processPayment(id, token)}
                    initialStatus={selectedPaymentGatewayToken}
                  />
                )}
              </div>
            );
        }
      })}
      {!selectedPaymentGateway && errors && <ErrorMessage errors={errors} />}
    </S.Wrapper>
  );
};

export { PaymentGatewaysList };
