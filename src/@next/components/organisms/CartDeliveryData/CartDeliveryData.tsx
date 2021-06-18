import React from "react";
import { Iprops, TitleDelivery, LineDeliveryData } from "./types";
import { formatShippingMethodDateToString } from "@temp/@next/utils/dateUtils";

import * as S from "./styles";

const TitleDeliveryData: React.FC<TitleDelivery> = ({
  children,
}: TitleDelivery) => {
  return <S.SubtitleDetail>{children}</S.SubtitleDetail>;
};

export function LineDetailDeliveryData({
  label,
  text,
  direction = "row",
}: LineDeliveryData) {
  return (
    <S.LineDetailDelivery direction={direction}>
      {label && <S.LineDetailDeliveryLabel>{label}:</S.LineDetailDeliveryLabel>}
      <S.LineDetailDeliveryValue>{text}</S.LineDetailDeliveryValue>
    </S.LineDetailDelivery>
  );
}

const CartDeliveryData: React.FC<Iprops> = ({ checkout }) => {
  const billingAddress = checkout?.billingAddress;
  const shippingAddress = checkout?.shippingAddress;
  const direction = shippingAddress?.streetAddress1;
  const scheduleDate = checkout?.scheduleDate;
  return (
    <>
      <TitleDeliveryData> Datos personales </TitleDeliveryData>
      <LineDetailDeliveryData text={billingAddress?.firstName} />
      <LineDetailDeliveryData
        label="Número de documento"
        text={checkout?.documentNumber}
      />
      <LineDetailDeliveryData
        label="Correo electrónico"
        text={checkout?.email}
      />
      <LineDetailDeliveryData
        label="Telefono"
        text={checkout?.billingAddress?.phone}
      />

      <TitleDeliveryData> Dirección de entrega </TitleDeliveryData>
      <LineDetailDeliveryData
        label="Dirección de entrega"
        text={direction}
        direction="column"
      />
      <LineDetailDeliveryData
        label="Referencia"
        text={billingAddress?.streetAddress2}
        direction="column"
      />

      <TitleDeliveryData> Tiempo de entrega </TitleDeliveryData>
      {!scheduleDate ? (
        <LineDetailDeliveryData
          label="Tipo de entrega"
          text={checkout?.shippingMethod?.name}
        />
      ) : (
        <>
          <LineDetailDeliveryData
            label="Tipo de entrega"
            text={checkout?.shippingMethod?.name}
          />
          <LineDetailDeliveryData
            label="Fecha"
            text={formatShippingMethodDateToString(scheduleDate?.date)}
          />
          <LineDetailDeliveryData
            label="Hora"
            text={checkout?.deliveryDate}
          />
        </>
      )}
    </>
  );
};

export { CartDeliveryData };
