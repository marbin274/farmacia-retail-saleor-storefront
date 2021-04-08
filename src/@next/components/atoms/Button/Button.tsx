import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * The basic button
 */
export const Button: React.FC<IProps> = ({
  color = "primary",
  btnRef,
  children,
  fullWidth = false,
  size = "md",
  outline = false,
  ...props
}: IProps) => {
  const getButtonTheme = () => {
    if (outline) {
      return S.Outline;
    }
    
    return color === "primary" ? S.Primary : S.Secondary;
  };

  const ButtonWithTheme = getButtonTheme();

  return (
    <ButtonWithTheme
      color={color}
      fullWidth={fullWidth}
      size={size}
      ref={btnRef}
      {...props}
    >
      <S.Text size={size}>{children}</S.Text>
    </ButtonWithTheme>
  );
};
