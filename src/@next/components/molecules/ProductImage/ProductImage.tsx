import React from "react";
import { ProductDetailSticker } from "@components/atoms";
import { Thumbnail } from "@components/molecules";
import * as S from "./styles";
import { IProps } from "./types";

export const ProductImage: React.FC<IProps> = ({
  product,
  canAddToCart = true,
  isOnSale,
  isOutStock,
  hasMagnifier = false,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.ImageFrame canAddToCart={canAddToCart}>
        <ProductDetailSticker isOnSale={isOnSale} isOutStock={isOutStock} />
        <Thumbnail height={510} source={product} hasMagnifier={hasMagnifier} width={510} />
      </S.ImageFrame>
    </S.Wrapper>
  );
};
