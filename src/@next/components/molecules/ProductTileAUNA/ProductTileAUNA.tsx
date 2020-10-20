import React, { MouseEvent } from "react";

import { Thumbnail } from "@components/molecules";
import { TaxedMoney } from "@components/containers";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductTileAUNA: React.FC<IProps> = ({ product, addToCart }: IProps) => {
  const price =
    product.pricing &&
    product.pricing.priceRange &&
    product.pricing.priceRange.start
      ? product.pricing.priceRange.start
      : undefined;

  const onAddToCartBtn = (event: MouseEvent) => {
      if (addToCart) {
          if (product.variants && product.variants.length > 0) {
            const firstProductVariant = product.variants[0];
            if (firstProductVariant.id) {
              addToCart(firstProductVariant.id, 1);
            }
            // prevent clicking on wrapper link
            event.preventDefault();
          } else {
            console.error("ProductTile.onAddToCartBtn(): no product.variants!")
          }
      }
  };

  const thumbnailsInfo = { thumbnail: { url: product.thumbnail.url!}, thumbnail2x: { url: product.thumbnail2x.url!} };
  return (
    <S.Wrapper data-cy="product-tile">
        <S.Image>
            <Thumbnail source={thumbnailsInfo} />
        </S.Image>
        <S.Title>{product.name}</S.Title>
        <S.ProductAttribute>250 g</S.ProductAttribute>
        <S.Price>
          <TaxedMoney taxedMoney={price} />
      </S.Price>
      {addToCart && (
          <S.AddToCartButton onClick={onAddToCartBtn}>
              +
          </S.AddToCartButton>
      )}
    </S.Wrapper>
  );
};
