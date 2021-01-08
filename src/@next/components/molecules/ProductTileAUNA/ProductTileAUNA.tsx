import React, { useEffect, useState } from "react";
import { OutStockLabel, Button } from '@components/atoms'
import { Thumbnail } from "@components/molecules";
import { TaxedMoney } from "@components/containers";
import * as S from "./styles";
import { IProps } from "./types";
import { Link } from "react-router-dom";
import { checkCanAddToCart } from "@temp/@next/utils/products";

export const ProductTileAUNA: React.FC<IProps> = ({
  addToCart,
  productUrl: productLink,
  product,
  productsOnCart,
}: IProps) => {
  const [thumbnails, setThumbnails] = useState<{
    thumbnail: { url: string | undefined };
    thumbnail2x: { url: string | undefined };
  }>({
    thumbnail: { url: "" },
    thumbnail2x: { url: "" },
  });

  const canAddToCart = checkCanAddToCart(product, productsOnCart);

  const onAddToCart = () => {
    if (canAddToCart) {
      const firstProductVariant = product?.variants?.[0];
      if (firstProductVariant) {
        addToCart?.(firstProductVariant.id, 1);
      }
    }
  };

  useEffect(() => {
    setThumbnails({
      thumbnail: { url: product?.thumbnail?.url || "" },
      thumbnail2x: { url: product?.thumbnail2x?.url || "" },
    });
  }, [product.thumbnail, product.thumbnail2x]);


  return (
    <S.ProductCard data-cy="product-tile" canAddToCart={canAddToCart}>
      <Link to={productLink} key={product.id}>
        <S.WrapperStockout>
          {!canAddToCart && <OutStockLabel />}
          <div className="img">
            <S.Image>
              <Thumbnail source={thumbnails} />
            </S.Image>
          </div>
          <div className="description">
            <S.Title>{product.name}</S.Title>
          </div>
          <div className="price">
            <S.Price>
              <TaxedMoney taxedMoney={product?.pricing?.priceRange?.start} />
            </S.Price>
          </div>
        </S.WrapperStockout>
      </Link>
      {
        addToCart &&
        <div className="button">
          <Button onClick={onAddToCart} disabled={!canAddToCart}>
            +
        </Button>
        </div>
      }
    </S.ProductCard>
  );
};
