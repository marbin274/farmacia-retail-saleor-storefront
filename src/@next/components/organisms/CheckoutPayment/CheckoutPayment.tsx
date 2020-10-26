import React from "react";

import { PaymentGatewaysList } from "../PaymentGatewaysList";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Payment options used in checkout.
 */
const CheckoutPayment: React.FC<IProps> = ({
  gatewayErrors,
  paymentGateways,
  selectedPaymentGateway,
  selectedPaymentGatewayToken,
  selectPaymentGateway,
  gatewayFormRef,
  gatewayFormId,
  processPayment,
  onGatewayError,
}: IProps) => {
  return (
    <S.Wrapper>
      <PaymentGatewaysList
        errors={gatewayErrors}
        paymentGateways={paymentGateways}
        formRef={gatewayFormRef}
        formId={gatewayFormId}
        processPayment={processPayment}
        selectedPaymentGateway={selectedPaymentGateway}
        selectedPaymentGatewayToken={selectedPaymentGatewayToken}
        selectPaymentGateway={selectPaymentGateway}
        onError={onGatewayError}
      />
    </S.Wrapper>
  );
};

export { CheckoutPayment };
