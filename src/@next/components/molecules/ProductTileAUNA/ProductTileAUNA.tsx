import React, { useEffect, useState } from "react";
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
  const [thumbnails, setThumbnails] = useState<{
    thumbnail: { url: string | undefined };
    thumbnail2x: { url: string | undefined };
  }>({
    thumbnail: { url: "" },
    thumbnail2x: { url: "" },
  });
  
  const [canAddToCart, setCanAddToCart] = useState(false);

  useEffect(() => {
    setThumbnails({
      thumbnail: { url: product?.thumbnail?.url || "" },
      thumbnail2x: { url: product?.thumbnail2x?.url || "" },
    });
  }, [product.thumbnail, product.thumbnail2x]);

  useEffect(() => {
    const quantityAddedToCart = product?.quantity || 0;
    const productQuantityLessThenMax = quantityAddedToCart < MAX_ORDER_PER_PRODUCT;
    const stockAvailable = product.variants?.[0].quantityAvailable || 0;
    const canAddToCart = stockAvailable > quantityAddedToCart
    
    setCanAddToCart(productQuantityLessThenMax && canAddToCart);
  
  },[MAX_ORDER_PER_PRODUCT, product])

  const onAddToCart = () => {
    if (canAddToCart) {
      const firstProductVariant = product?.variants?.[0];
      if (firstProductVariant) {
        addToCart?.(firstProductVariant.id, 1);
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
            <TaxedMoney taxedMoney={product?.pricing?.priceRange?.start} />
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
