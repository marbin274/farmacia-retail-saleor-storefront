import React from "react";
import { Iprops, TitleDelivery, LineDeliveryData } from "./types";
import { formatShippingMethodDateToString, getScheduleTimesFormat } from "@temp/@next/utils/dateUtils";

import * as S from "./styles";




const  TitleDeliveryData: React.FC<TitleDelivery> = ({children}:TitleDelivery) =>{
  return (<S.SubtitleDetail>{children}</S.SubtitleDetail>);
};

export function LineDetailDeliveryData({label, text}: LineDeliveryData){
  return (
    <S.LineDetailDelivery> 
      {label? `${label}:` : null}<span> {text}</span>
    </S.LineDetailDelivery>);
}

 

const CartDeliveryData: React.FC<Iprops> = ({checkout}) => {
  const billingAddress = checkout?.billingAddress;
  const shippingAddress = checkout?.shippingAddress;
  const direction = `${shippingAddress?.streetAddress1} ${shippingAddress?.city} ${shippingAddress?.country?.country}`; 
  const scheduleDate = checkout?.scheduleDate;
  return (
    <>
      <TitleDeliveryData> Datos personales  </TitleDeliveryData>
      <LineDetailDeliveryData text={billingAddress?.firstName} />
      <LineDetailDeliveryData label="Número de documento" text={checkout?.documentNumber} />
      <LineDetailDeliveryData label="Correo electrónico" text={checkout?.email} />
      <LineDetailDeliveryData label="Telefono" text={checkout?.billingAddress?.phone} />
      
      <TitleDeliveryData> Dirección de entrega  </TitleDeliveryData>
      <LineDetailDeliveryData label="Dirección" text={direction} />
      <LineDetailDeliveryData label="Referencia" text={billingAddress?.streetAddress2} />
      <TitleDeliveryData> Tiempo de entrega  </TitleDeliveryData>
  
      {!scheduleDate ? (
          <S.TextBold>{checkout?.shippingMethod?.name} </S.TextBold>
        ) : (
          <>
            <S.TextBold>{checkout?.shippingMethod?.name}</S.TextBold>
            <S.Text>
              Fecha:{" "}
              <S.TextBold>
                {formatShippingMethodDateToString(scheduleDate?.date)}
              </S.TextBold>
            </S.Text>
            <S.Text>
              Hora:{" "}
              <S.TextBold>
                {getScheduleTimesFormat(
                  scheduleDate?.scheduleTime?.startTime,
                  scheduleDate?.scheduleTime?.endTime
                )}
              </S.TextBold>
            </S.Text>
          </>
        )}
    </>
  );
};

export { CartDeliveryData };
