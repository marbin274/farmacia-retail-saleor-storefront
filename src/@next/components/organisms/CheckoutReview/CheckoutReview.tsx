import React from "react";

import { ErrorMessage } from "@components/atoms";
import { AddressSummary } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Review order view showed in checkout.
 */
const CheckoutReview: React.FC<IProps> = ({
  shippingAddress,
  billingAddress,
  shippingMethodName,
  paymentMethodName,
  email,
  errors,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Grid>
        <section>
          <S.Title data-cy="checkoutReviewSectionTitle">Datos de envío</S.Title>
          <AddressSummary address={shippingAddress} email={email} />
        </section>
        <section>
          <S.Title data-cy="checkoutReviewSectionTitle">
            Horario de entrega
          </S.Title>
          <S.Text>{shippingMethodName}</S.Text>
        </section>
        <section>
          <S.Title data-cy="checkoutReviewSectionTitle">Método de pago</S.Title>
          <S.ImportantText>{paymentMethodName}</S.ImportantText>
        </section>
      </S.Grid>
      <S.ErrorMessages>
        <ErrorMessage errors={errors} />
      </S.ErrorMessages>
    </S.Wrapper>
  );
};

export { CheckoutReview };
