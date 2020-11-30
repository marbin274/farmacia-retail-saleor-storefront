import React, { MouseEvent } from "react";

import { Thumbnail } from "@components/molecules";
import { TaxedMoney } from "@components/containers";

import * as S from "./styles";
import { IProps } from "./types";
import { Link } from "react-router-dom";
import { Button } from "../../atoms";

export const ProductTileAUNA: React.FC<IProps> = ({
  product,
  addToCart,
  linkProduct,
  items,
}: IProps) => {
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
      } else {
        console.error("ProductTile.onAddToCartBtn(): no product.variants!");
      }
    }
  };

  const { thumbnail, thumbnail2x } = product;
  const quantityAvailable: number | undefined =
    product.variants && product.variants[0].quantityAvailable;
  let messageAvailableProducts: string = "No disponible";

  const _product = items?.filter(x => x.variant?.product?.id === product.id)[0];

  let thumbnailsInfo = {
    thumbnail: { url: "null" },
    thumbnail2x: { url: "null" },
  };

  if (!(!thumbnail && !thumbnail2x)) {
    thumbnailsInfo = {
      thumbnail: { url: product.thumbnail.url! },
      thumbnail2x: { url: product.thumbnail2x.url! },
    };
  }

  if (quantityAvailable && quantityAvailable > 0) {
    messageAvailableProducts = "";
  }

  // TODO: we need to remove the hardcode 250 g attribute and implement it in a proper way as soon as we need it (ASAWNI)
  return (
    <S.ProductCard
      data-cy="product-tile"
      quantityAvailable={quantityAvailable}
      quantityOrdered={_product?.quantity}
    >
      <Link to={linkProduct} key={product.id}>
        <div className="img">
          <S.Image>
            <Thumbnail source={thumbnailsInfo} />
          </S.Image>
        </div>
        <div className="description">
          <S.Title>{product.name}</S.Title>
          {/* <S.ProductAttribute>250 g</S.ProductAttribute> */}
          <S.ProductAttribute>
            {messageAvailableProducts}&nbsp;
          </S.ProductAttribute>
        </div>
        <div className="price">
          <S.Price>
            <TaxedMoney taxedMoney={price} />
          </S.Price>
        </div>
      </Link>
      <div className="button">
        {(addToCart &&
          quantityAvailable &&
          quantityAvailable > 0 &&
          _product === undefined) ||
        (_product && _product?.quantity < 50) ? (
          <Button onClick={onAddToCartBtn}>+</Button>
        ) : (
          <Button onClick={onAddToCartBtn} disabled>
            +
          </Button>
        )}
      </div>
    </S.ProductCard>
  );
};
