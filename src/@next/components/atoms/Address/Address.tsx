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
    <span className='fa-text-lg fa-mb-4 fa-font-semibold'>{`${firstName} ${lastName}`}</span>
    {companyName && <p>{companyName}</p>}
    <span className='fa-text-sm fa-mb-4 fa-font-medium'>{streetAddress1}</span>
    {streetAddress2 && <span className='fa-text-sm fa-mb-4 fa-font-medium'>{streetAddress2}</span>}
    <div className='fa-grid fa-grid-cols-1 lg:fa-grid-cols-2 fa-gap-x-4'>
      <div className='fa-flex fa-items-start'>
        <span className='fa-mr-2 fa-text-neutral-dark'>Distrito: </span>
        <span>{postalCode && `${postalCode},`} {city}</span>
      </div>
      <div className='fa-flex fa-items-start'>
        <span className='fa-mr-2 fa-text-neutral-dark'>Pais: </span>
        <span>
          {countryArea && <span>{countryArea}, </span>}
          <span>{country!.country}</span>
        </span>
      </div>
      {
        phone && 
        <div className='fa-flex fa-items-start'>
          <span className='fa-mr-2  fa-text-neutral-dark'>Celular: </span>
          <span>{phone}</span>
        </div>
      }
    </div>
  </S.Wrapper>
);
