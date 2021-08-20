import React from 'react';

import * as S from './styles';
import { IProps } from './types';

/**
 * The attribute
 */
export const Attribute: React.FC<IProps> = ({
  description,
  attributeValue,
  role,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Description>{description}</S.Description>
      <p className="fa-text-center fa-break-words" role={role || ''}>
        {attributeValue}
      </p>
    </S.Wrapper>
  );
};
