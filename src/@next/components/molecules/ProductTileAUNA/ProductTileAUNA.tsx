import React, { MouseEvent, useEffect, useState } from "react";
import { Thumbnail } from "@components/molecules";
import { TaxedMoney } from "@components/containers";
import * as S from "./styles";
import { IProps } from "./types";
import { Link } from "react-router-dom";
import { Button } from "../../atoms";
import { MAX_ORDER_PER_PRODUCT } from "@temp/core/config";

export const ProductTileAUNA: React.FC<IProps> = ({
  addToCart,
  linkProduct,
  product,
}: IProps) => {
  const [thumbnails, setThumbnails] = useState({
    thumbnail: { url: "" },
    thumbnail2x: { url: "" },
  });

  useEffect(() => {
    if (product.thumbnail.url && product.thumbnail2x.url) {
      setThumbnails({
        thumbnail: { url: product.thumbnail.url },
        thumbnail2x: { url: product.thumbnail2x.url },
      });
    }
  }, [product.thumbnail, product.thumbnail2x]);

  const price = product?.pricing?.priceRange?.start;

  const canAddToCart =
    typeof product.quantity === "number" &&
    product.quantity < MAX_ORDER_PER_PRODUCT &&
    Array.isArray(product.variants) &&
    product.variants[0].quantityAvailable &&
    product.quantity < product.variants[0].quantityAvailable;

  const onAddToCart = (event: MouseEvent) => {
    if (addToCart && canAddToCart) {
      const firstProductVariant = product.variants && product.variants[0];
      if (firstProductVariant) {
        addToCart(firstProductVariant.id, 1);
      }
    }
  };

  return (
    <S.ProductCard data-cy="product-tile" canAddToCart={canAddToCart}>
      <Link to={linkProduct} key={product.id}>
        <div className="img">
          <S.Image>
            <Thumbnail source={thumbnails} />
          </S.Image>
        </div>
        <div className="description">
          <S.Title>{product.name}</S.Title>
          {!canAddToCart && (
            <S.ProductAttribute>No disponible</S.ProductAttribute>
          )}
        </div>
        <div className="price">
          <S.Price>
            <TaxedMoney taxedMoney={price} />
          </S.Price>
        </div>
      </Link>
      <div className="button">
        <Button onClick={onAddToCart} disabled={!canAddToCart}>
          +
        </Button>
      </div>
    </S.ProductCard>
  );
};
