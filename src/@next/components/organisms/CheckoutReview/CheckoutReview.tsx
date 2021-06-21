import { CreditCardIcon } from "@components/atoms";
import { AddressSummary, OutOfTimeMessage } from "@components/molecules";
import { formatShippingMethodDateToString } from "@temp/@next/utils/dateUtils";
import React from "react";
import * as S from "./styles";
import { IProps } from "./types";
/**
 * Review order view showed in checkout.
 */
const CheckoutReview: React.FC<IProps> = ({
  checkout,
  scheduleDate,
  shippingAddress,
  shippingMethodName,
  email,
  creditCardProvider,
}: IProps) => {
  return (
    <S.Wrapper>
      <div>
        <S.MainTitle> Datos de entrega</S.MainTitle>
        <S.Title data-cy="checkoutReviewSectionTitle">Datos personales</S.Title>
        <S.Text>
          <S.TextBold>
            {checkout?.billingAddress?.firstName}{" "}
            {checkout?.billingAddress?.lastName}
          </S.TextBold>
        </S.Text>
        <S.Text>
          Número de documento:{" "}
          <S.TextBold>{checkout?.documentNumber}</S.TextBold>
        </S.Text>
        <S.Text>
          Correo electrónico: <S.TextBold>{email}</S.TextBold>
        </S.Text>
        <S.Text>
          Telefono: <S.TextBold>{checkout?.billingAddress?.phone}</S.TextBold>
        </S.Text>
        <S.Title className="secondary" data-cy="checkoutReviewSectionTitle">
          Dirección de entrega
        </S.Title>
        <AddressSummary
          address={shippingAddress}
          checkout={checkout}
          email={email}
        />
      </div>
      <div>
        <S.Title className="secondary" data-cy="checkoutReviewSectionTitle">
          Tiempo de entrega
        </S.Title>
        {!scheduleDate ? (
          <S.TextBold>{shippingMethodName}</S.TextBold>
        ) : (
          <>
            <S.TextBold> {shippingMethodName}</S.TextBold>
            <S.Text>
              Fecha:{" "}
              <S.TextBold>
                {formatShippingMethodDateToString(scheduleDate?.date)}
              </S.TextBold>
            </S.Text>
            <S.Text>
              Hora:{" "}
              <S.TextBold>
                {checkout?.deliveryDate}
              </S.TextBold>
            </S.Text>
          </>
        )}
      </div>
      <div>
        <S.Title className="secondary" data-cy="checkoutReviewSectionTitle">
          Método de pago
        </S.Title>
        <CreditCardIcon creditCardProvider={creditCardProvider} />
      </div>
      <OutOfTimeMessage isShippingAvailable={true} />
    </S.Wrapper>
  );
};

export { CheckoutReview };
