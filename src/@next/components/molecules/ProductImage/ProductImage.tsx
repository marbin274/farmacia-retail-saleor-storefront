import React from "react";
import { Thumbnail } from "@components/molecules";
import * as S from "./styles";
import { IProps } from "./types";

export const ProductImage: React.FC<IProps> = ({
  product,
  outStock = false,
}: IProps) => (
  <S.Wrapper>
    <S.DecorativeSquare />
    <S.ImageFrame outStock={outStock}>
      {outStock && <S.OutStockLabel>Agotado</S.OutStockLabel>}
      <Thumbnail source={product} />
    </S.ImageFrame>
  </S.Wrapper>
);
