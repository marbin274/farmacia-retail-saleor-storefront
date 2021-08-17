import React from 'react';

import * as S from './styles';
import { IProps } from './types';

/**
 * The attribute
 */
export const Attribute: React.FC<IProps> = ({
  description,
  attributeValue,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Description>{description}</S.Description>
      <p className="fa-text-center">{attributeValue}</p>
    </S.Wrapper>
  );
};
