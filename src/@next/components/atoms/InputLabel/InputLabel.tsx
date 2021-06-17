import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const InputLabel: React.FC<IProps> = ({
  children,
  active = false,
  disabled = false,
  error = false,
  labelBackground,
}: IProps) => {
  return (
    <S.Label className='fa-text-gray-01 fa-text-sm' {...{ active, disabled, error, labelBackground }}>
      {children}
    </S.Label>
  );
};
