import React from 'react';
import { Skeleton as SSkeleton } from '@components/atoms';
import { useMediaScreen } from '@temp/@next/globalStyles';
import { SectionContent } from './styles';
export const Skeleton = () => {
  const { isMaxLargeScreen } = useMediaScreen();
  return (
    <>
      <SectionContent>
        <SSkeleton height={2} width={10} />
        <SSkeleton height={1} width={10} />
        <SSkeleton height={1} width={10} />
        <SSkeleton height={1} width={10} />
        <SSkeleton height={1} width={10} />
        <SSkeleton height={isMaxLargeScreen ? 1 : 1.5625} width={10} />
      </SectionContent>
      <SectionContent>
        <SSkeleton height={isMaxLargeScreen ? 2 : 1} width={10} />
        <SSkeleton height={isMaxLargeScreen ? 2 : 1.625} width={10} />
      </SectionContent>
    </>
  );
};
