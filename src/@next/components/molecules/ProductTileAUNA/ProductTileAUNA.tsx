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

  const { thumbnail, thumbnail2x } = product;
  const quantityAvailable: number | undefined = product.variants && product.variants[0].quantityAvailable;
  let messageAvailableProducts: string = "No disponible";

  let thumbnailsInfo = { thumbnail: { url: "null"}, thumbnail2x: { url: "null"} };
  
  if(!(!thumbnail && !thumbnail2x)){
    thumbnailsInfo = { thumbnail: { url: product.thumbnail.url!}, thumbnail2x: { url: product.thumbnail2x.url!} };
  }

  if (quantityAvailable && quantityAvailable > 0) {
    messageAvailableProducts = "";
  }


  // TODO: we need to remove the hardcode 250 g attribute and implement it in a proper way as soon as we need it (ASAWNI)
  return (
    <S.ProductCard data-cy="product-tile" quantityAvailable={quantityAvailable}>
        <S.Image>
            <Thumbnail source={thumbnailsInfo} />
        </S.Image>
        <S.Title>{product.name}</S.Title>
        <S.ProductAttribute>250 g</S.ProductAttribute>
        <S.ProductAttribute>{messageAvailableProducts}&nbsp;</S.ProductAttribute> 
        <S.Price>
          <TaxedMoney taxedMoney={price} />
      </S.Price>
      {addToCart && quantityAvailable && quantityAvailable > 0
        ? <S.AddToCartButton onClick={onAddToCartBtn}>+</S.AddToCartButton>
        : <S.DisabledAddToCartButton>+</S.DisabledAddToCartButton>
      }
    </S.ProductCard>
  );
};
