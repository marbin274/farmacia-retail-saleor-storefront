import { CreditCardIcon, ErrorMessage } from "@components/atoms";
import { AddressSummary, OutOfTimeMessage } from "@components/molecules";
import React from "react";
import * as S from "./styles";
import { IProps } from "./types";
/**
 * Review order view showed in checkout.
 */
const CheckoutReview: React.FC<IProps> = ({
  isShippingAvailable,
  shippingAddress,
  billingAddress,
  shippingMethodName,
  paymentMethodName,
  email,
  creditCardProvider,
  errors,
}: IProps) => {
  return (
    <S.Wrapper>
      <div>
        <S.Title data-cy="checkoutReviewSectionTitle">Datos de envío</S.Title>
        <AddressSummary address={shippingAddress} email={email} />
      </div>
      <div>
        <S.Title data-cy="checkoutReviewSectionTitle">
          Tiempo de entrega
        </S.Title>
        <S.Text>{shippingMethodName}</S.Text>
      </div>
      <div>
        <S.Title data-cy="checkoutReviewSectionTitle">Método de pago</S.Title>
        <CreditCardIcon creditCardProvider={creditCardProvider} />
        <S.Text>Tarjeta de Crédito / Débito</S.Text>
      </div>
      <OutOfTimeMessage isShippingAvailable={isShippingAvailable ? isShippingAvailable : false} />

      <S.ErrorMessages>
        <ErrorMessage errors={errors} />
      </S.ErrorMessages>
    </S.Wrapper>
  );
};

export { CheckoutReview };

