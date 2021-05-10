import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Address summary
 */
const AddressSummary: React.FC<IProps> = ({ address, checkout, email }: IProps) => {
  if (address) {
    const direction = address.streetAddress1;
    const reference = address.streetAddress2;
    return (
      <S.Wrapper>
        <S.Text>
          Direccion: 
          <S.TextBold>
            {direction} 
          </S.TextBold>
        </S.Text>
        <S.Text>
          Referencia:
          <S.TextBold>
            {reference} 
          </S.TextBold>
        </S.Text>
      </S.Wrapper>
    );
  } else if (email) {
    return <S.Text>{email}</S.Text>;
  }
  return null;
};

export { AddressSummary };
