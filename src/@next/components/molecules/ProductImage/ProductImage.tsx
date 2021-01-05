import React from "react";
import { OutStockLabel } from '@components/atoms'
import { Thumbnail } from "@components/molecules";
import * as S from "./styles";
import { IProps } from "./types";

export const ProductImage: React.FC<IProps> = ({
  product,
  outStock = false,
}: IProps) => (
  <S.Wrapper>
    <S.ImageFrame outStock={outStock}>
      {outStock && <OutStockLabel />}
      <Thumbnail source={product} />
    </S.ImageFrame>
  </S.Wrapper>
);
