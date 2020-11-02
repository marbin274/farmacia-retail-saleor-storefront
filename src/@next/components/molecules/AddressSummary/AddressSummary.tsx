import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Address summary
 */
const AddressSummary: React.FC<IProps> = ({ address, email }: IProps) => {
  if (address) {
    return (
      <S.Wrapper>
        <S.Title>{`${address.firstName} ${address.lastName}`}</S.Title>
        <S.Text>{address.streetAddress1}</S.Text>
        {address.streetAddress2 && <S.Text>{address.streetAddress2}</S.Text>}
        <S.Text>{address.city}</S.Text>
        {address.countryArea && <S.Text>{address.countryArea}</S.Text>}
        <S.Text>{address.country?.country}</S.Text>
        {address.phone && <S.Text>Telefono: {address.phone}</S.Text>}
        {email && <S.Text>Email: {email}</S.Text>}
      </S.Wrapper>
    );
  } else if (email) {
    return <S.Text>{email}</S.Text>;
  }
  return null;
};

export { AddressSummary };
