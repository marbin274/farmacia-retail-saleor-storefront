import React from 'react';
import { SkeletonCarousel } from '@temp/@next/components/molecules';

export const Skeleton: React.FC = () => {
  return (
    <>
      {[...Array(5)].map((_, row) => (
        <SkeletonCarousel key={row} />
      ))}
    </>
  );
};
