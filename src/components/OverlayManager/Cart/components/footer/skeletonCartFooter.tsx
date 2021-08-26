import React from 'react';
import { Skeleton as SSkeleton } from '@components/atoms';
import * as S from './FooterWithShippingPriceStyles';

export const SkeletonCartFooter = () => {
  return (
    <S.Container>
      <SSkeleton height={1} />
      <SSkeleton height={1} />
      <SSkeleton height={1} />
      <SSkeleton height={3} />
    </S.Container>
  );
};
