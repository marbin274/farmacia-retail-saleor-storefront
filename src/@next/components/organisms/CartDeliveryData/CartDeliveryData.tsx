import React from "react";
import { Iprops, TitleDelivery, LineDeliveryData } from "./types";

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
  return (
    <>
      <TitleDeliveryData> Datos personales  </TitleDeliveryData>
      <LineDetailDeliveryData text={billingAddress?.firstName} />
      <LineDetailDeliveryData label="DNI" text={checkout?.documentNumber} />
      <LineDetailDeliveryData label="Correo electrónico" text={checkout?.email} />
      <LineDetailDeliveryData label="Telefono" text={checkout?.billingAddress?.phone} />
      <br/>
      <TitleDeliveryData> Dirección de entrega  </TitleDeliveryData>
      <LineDetailDeliveryData label="Dirección" text={direction} />
      <LineDetailDeliveryData label="Referencia" text={billingAddress?.streetAddress2} />
      <br/>
      <TitleDeliveryData> Tiempo de entrega  </TitleDeliveryData>
      <LineDetailDeliveryData text={checkout?.shippingMethod?.name} />
    </>
  );
};

export { CartDeliveryData };
