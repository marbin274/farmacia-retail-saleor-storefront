import React from "react";

import {AunaPaymentGateway} from "@components/organisms/AunaPaymentGateway";
import {ErrorMessage, Radio} from "@components/atoms";
import creditCardIcon from "@temp/images/auna/icon-credit-card.svg";
import ReactSVG from "react-svg";

import { PROVIDERS } from "@temp/core/config";
import {ThemeContext} from "styled-components";
import { IProps } from "./types";
import * as S from "./styles";

// TODO: temporary use this config instead of data from backend, until we have Aun payments plugin [Denn 04/11/20]
const dummyConfig = [
    {
      field: 'client_token',
      value: 'QAZWSXEDC',
    },
];

/**
 * Payment Gateways list
 */
const PaymentGatewaysList: React.FC<IProps> = ({
  paymentGateways,
  selectedPaymentGateway,
  selectPaymentGateway,
  formRef,
  formId,
  processPayment,
  errors,
  onError,
}: IProps) => {
  const customTheme = React.useContext(ThemeContext);

  return (
    <S.Wrapper>
      {paymentGateways.map(({ id, name, config }, index) => {
        const checked = selectedPaymentGateway === id;

        switch (id) {
          // TODO: we tempory use Dummy payment gateway until we have payments plugin [Denn 04/11/20]
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
                      <S.PaymentTitle data-cy="checkoutPaymentGatewayDummyName" checked={checked}>
                        AUNA Payment Gateway
                      </S.PaymentTitle>
                      <S.PaymentIcon checked={checked}>
                        <ReactSVG path={creditCardIcon} svgStyle={{stroke: S.getIconColor(checked, customTheme)}}/>
                      </S.PaymentIcon>
                    </S.PaymentLine>
                  </Radio>
                </S.Tile>
                {checked && (
                  <AunaPaymentGateway
                    config={dummyConfig}
                    formRef={formRef}
                    formId={formId}
                    onError={onError}
                    processPayment={processPayment}
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
