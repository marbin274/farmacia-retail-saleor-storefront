import React from 'react';

import { icons } from './definitions';
import { IProps } from './types';

const getPathColor = (color: string | string[], index: number) => {
  if (typeof color === 'string') {
    return color;
  }

  return color[index] ? color[index] : 'inherit';
};

export const Icon: React.FC<IProps> = ({
  color,
  heightViewPort,
  name,
  size = 32,
  viewPort = 32,
  widthViewPort,
}: IProps) => {
  const icon = icons[name];
  const hVP = heightViewPort ? heightViewPort : viewPort;
  const wVP = widthViewPort ? widthViewPort : viewPort;
  return (
    <svg height={size} viewBox={`0 0 ${wVP} ${hVP}`} width={size}>
      {icon &&
        icon.map((path, index) => (
          <path
            d={path.d}
            fill={color ? getPathColor(color, index) : path.fill}
            key={index}
            stroke={path.stroke}
            strokeWidth={path.strokeWidth}
            strokeMiterlimit={path.strokeMiterlimit}
            fillRule={path.fillRule}
            clipRule={path.clipRule}
          />
        ))}
    </svg>
  );
};
