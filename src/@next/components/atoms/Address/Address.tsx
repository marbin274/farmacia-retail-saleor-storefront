import React from "react";

import { IAddress } from "@types";

import * as S from "./styles";

export const Address: React.FC<IAddress> = ({
  firstName,
  lastName,
  companyName,
  streetAddress1,
  streetAddress2,
  city,
  postalCode,
  countryArea,
  country,
  phone,
}: IAddress) => (
  <S.Wrapper>
    <S.Name>{`${firstName} ${lastName}`}</S.Name>
    {companyName && <p>{companyName}</p>}
    <p>{streetAddress1}</p>
    {streetAddress2 && <p>{streetAddress2}</p>}
    <p>{postalCode && `${postalCode},`} {city}</p>
    {countryArea && <p>{countryArea}, </p>}
    <p>{country!.country}</p>
    {phone && <p>Celular: {phone}</p>}
  </S.Wrapper>
);
