import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const Label: React.FC<IProps> = ({ children }: IProps) => {
  return <S.Wrapper className="label">{children}</S.Wrapper>;
};
