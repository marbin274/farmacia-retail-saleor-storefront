import React from "react";
import { ProductSticker } from '@components/atoms'
import { Thumbnail } from "@components/molecules";
import * as S from "./styles";
import { IProps } from "./types";

export const ProductImage: React.FC<IProps> = ({
  product,
  canAddToCart = true,
  isOnSale = false,
}: IProps) => (
  <S.Wrapper>
    <S.ImageFrame canAddToCart={canAddToCart}>
      <ProductSticker
        canAddToCart={canAddToCart}
        isOnSale={isOnSale}
      />
      <Thumbnail source={product} />
    </S.ImageFrame>
  </S.Wrapper>
);
