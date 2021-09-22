import { Skeleton as SSkeleton } from '@temp/@next/components/atoms';
import React from 'react';
import { LazyImage } from 'react-lazy-images';

export const AsyncImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (
  props
) => {
  if (!props.src) {
    return <SSkeleton height={(props.height as number) / 16} />;
  }
  return (
    <LazyImage
      src={props.src}
      alt={props.alt}
      placeholder={({ ref }) => (
        <div ref={ref}>
          {' '}
          <SSkeleton height={(props.height as number) / 16} />
        </div>
      )}
      actual={({ imageProps }) => {
        const finalProps = { ...imageProps, ...props };
        return <img {...finalProps} />;
      }}
    />
  );
};
