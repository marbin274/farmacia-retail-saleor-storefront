import { Skeleton as SSkeleton } from '@temp/@next/components/atoms';
import React from 'react';
import * as S from './styles';

export const Skeleton: React.FC = () => {
  return (
    <>
      <SSkeleton height={3} width={20} />
      {[...Array(8)].map((_, index) => (
        <S.SkeletonItem key={index}>
          <SSkeleton height={9} />
        </S.SkeletonItem>
      ))}
    </>
  );
};
