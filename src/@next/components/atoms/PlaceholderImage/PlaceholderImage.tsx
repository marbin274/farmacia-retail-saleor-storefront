import React from 'react';
import { IProps } from './types';

export const PlaceholderImage: React.FC<IProps> = ({
  alt = 'placeholder',
}: IProps) => {
  return <img src="/assets/no-photo.svg" alt={alt} />;
};
