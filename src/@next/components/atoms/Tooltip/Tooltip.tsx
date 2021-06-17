import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const Tooltip: React.FC<IProps> = ({
  children,
  text,
  className,
  backgroundColor = "black",
  textColor = "white",
}: IProps) => {
  return (
    <S.TooltipWrapper className={className}>
      <S.TooltipText textColor={textColor} backgroundColor={backgroundColor}>
        {text}
      </S.TooltipText>
      {children}
    </S.TooltipWrapper>
  );
};
