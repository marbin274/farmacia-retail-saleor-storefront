import React from "react";

import { Icon } from "../Icon";

import * as S from "./styles";
import { IProps } from "./types";

export const IconButton: React.FC<IProps> = ({
  name,
  color,
  size = 36,
  heightViewPort = 32,
  viewPort = 32,
  widthViewPort = 32,
  onClick,
  ...props
}: IProps) => {
  return (
    <S.Wrapper
      className="icon_button"
      data-cy="icon_button"
      onClick={onClick} {...props}>
      <Icon
        name={name}
        size={size}
        color={color}
        heightViewPort={heightViewPort}
        viewPort={viewPort}
        widthViewPort={widthViewPort}
      />
    </S.Wrapper>
  );
};