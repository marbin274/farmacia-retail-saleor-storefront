import { getContentWindowHeight } from '@temp/@next/utils/styles';
import React from 'react';
import * as S from './styles';
import { IProps } from './types';

export const Loader: React.FC<IProps> = ({ fullScreen }: IProps) => {
  const [height, setHeight] = React.useState('');
  React.useEffect(() => {
    setHeight(!!fullScreen ? '100%' : `${getContentWindowHeight()}px`);
  }, []);
  return (
    <S.Wrapper height={height}>
      <S.Items>
        <span />
        <span />
        <span />
      </S.Items>
    </S.Wrapper>
  );
};
