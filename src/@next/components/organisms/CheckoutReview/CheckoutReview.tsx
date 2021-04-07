import { CreditCardIcon } from "@components/atoms";
import { AddressSummary, OutOfTimeMessage } from "@components/molecules";
import { formatShippingMethodDateToString, getScheduleTimesFormat } from "@temp/@next/utils/dateUtils";
import React from "react";
import * as S from "./styles";
import { IProps } from "./types";
/**
 * Review order view showed in checkout.
 */
const CheckoutReview: React.FC<IProps> = ({
  scheduleDate,
  shippingAddress,
  shippingMethodName,
  email,
  creditCardProvider,
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
        { !scheduleDate ? 
          <S.Text>{shippingMethodName}</S.Text>
          :<>
           <S.SubTitle>Pedido programado</S.SubTitle>
           <S.Text>Fecha: {formatShippingMethodDateToString(scheduleDate?.date)}</S.Text>
           <S.Text>Hora: {getScheduleTimesFormat(scheduleDate?.scheduleTime?.startTime,scheduleDate?.scheduleTime?.endTime)}</S.Text>
          </>
        }
      </div>
      <div>
        <S.Title data-cy="checkoutReviewSectionTitle">Método de pago</S.Title>
        <CreditCardIcon creditCardProvider={creditCardProvider} />
        <S.SubTitle>Tarjeta de Crédito / Débito</S.SubTitle>
      </div>
      <OutOfTimeMessage isShippingAvailable={true} />
    </S.Wrapper>
  );
};

export { CheckoutReview };

