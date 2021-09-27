import React from 'react';
import { ErrorForm } from '@components/atoms';

import * as S from './styles';
import { IProps } from './types';

export const ErrorMessage: React.FC<IProps> = ({ errors }: IProps) =>
  errors && errors.length ? (
    <S.ErrorMessage role="error">
      {errors.map((error, index) => (
        <ErrorForm key={index}>{error.message}</ErrorForm>
      ))}
    </S.ErrorMessage>
  ) : null;
