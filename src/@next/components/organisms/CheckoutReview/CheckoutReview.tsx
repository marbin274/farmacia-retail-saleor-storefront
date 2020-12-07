import React, { useState } from "react";

import { Checkbox, ErrorMessage } from "@components/atoms";
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
  const [privacyAndPolicies, setPrivacyAndPolicies] = useState(false);

  const handlePrivacyAndPolicies = () => {
    setPrivacyAndPolicies(!privacyAndPolicies);
  };

  const [additionals, setAdditionals] = useState(false);

  const handleAdditionals = () => {
    setAdditionals(!additionals);
  };

  return (
    <S.Wrapper>
      <div>
        <S.Title data-cy="checkoutReviewSectionTitle">Datos de envío</S.Title>
        <AddressSummary address={shippingAddress} email={email} />
      </div>
      <div>
        <S.Title data-cy="checkoutReviewSectionTitle">
          Método de entrega
        </S.Title>
        <S.Text>{shippingMethodName}</S.Text>
      </div>
      <div>
        <S.Title data-cy="checkoutReviewSectionTitle">Método de pago</S.Title>
        <S.ImportantText>**** **** **** {paymentMethodName}</S.ImportantText>
      </div>
      <div className="privacyAndPolicies">
        <Checkbox
          data-cy="checkoutPaymentPromoCodeCheckbox"
          name="payment-promo-code"
          checked={privacyAndPolicies}
          onChange={handlePrivacyAndPolicies}
        >
          <label htmlFor="">
            Estoy de acuerdo con las
            <a href="https://saleor-frontend-storage.s3.us-east-2.amazonaws.com/legal/farmacia-politicas-privacidad.pdf">
              {" "}
              Políticas de privacidad
            </a>{" "}
            y
            <a href="https://saleor-frontend-storage.s3.us-east-2.amazonaws.com/legal/farmacia-terminos-condiciones.pdf">
              {" "}
              Terminos y condiciones
            </a>
          </label>
        </Checkbox>
      </div>
      <div className="additionals">
        <Checkbox
          data-cy="checkoutPaymentPromoCodeCheckbox"
          name="payment-promo-code"
          checked={additionals}
          onChange={handleAdditionals}
        >
          <label htmlFor="">
            Acepto el tratamiento para <a href="#"> Fines adicionales</a>{" "}
            (opcional )
          </label>
        </Checkbox>
      </div>

      <S.ErrorMessages>
        <ErrorMessage errors={errors} />
      </S.ErrorMessages>
    </S.Wrapper>
  );
};

export { CheckoutReview };
