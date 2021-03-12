import { ProductSticker } from "@components/atoms";
import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";
import {
  checkProductCanAddToCart,
  checkProductIsOnSale,
  getProductPricingClass,
} from "@temp/@next/utils/products";
import { launchDetailProductEvent } from "@temp/@sdk/utils";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemsHandler from "../../organisms/ItemsHandler/ItemsHandler";
import * as S from "./styles";
import { IProps } from "./types";

declare global {
  interface Window {
    dataLayer: any;
  }
}

export const ProductTileAUNA: React.FC<IProps> = ({
  addToCart,
  removeItemToCart,
  substractItemToCart,
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

  const { canAddToCart } = checkProductCanAddToCart(product, productsOnCart);
  const isOnSale = checkProductIsOnSale(product);

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
          <ProductSticker canAddToCart={canAddToCart} isOnSale={isOnSale} />
          <div
            className="img"
            onClick={() =>
              launchDetailProductEvent(
                product?.name,
                product?.variants?.[0]?.sku as string,
                product?.variants?.[0]?.pricing?.price?.gross?.amount as number
              )
            }
          >
            <S.Image>
              <Thumbnail source={thumbnails} />
            </S.Image>
          </div>
          <div
            className="description"
            onClick={() =>
              launchDetailProductEvent(
                product?.name,
                product?.variants?.[0]?.sku as string,
                product?.variants?.[0]?.pricing?.price?.gross?.amount as number
              )
            }
          >
            <S.Title>{product.name}</S.Title>
          </div>
          <div className={getProductPricingClass(canAddToCart, isOnSale)}>
            <S.Price>
              <TaxedMoney taxedMoney={product?.pricing?.priceRange?.start} />
            </S.Price>
          </div>
          {isOnSale && (
            <div className="price undiscounted_price">
              <TaxedMoney
                taxedMoney={product?.pricing?.priceRangeUndiscounted?.start}
              />
            </div>
          )}
        </S.WrapperStockout>
      </Link>
      <ItemsHandler
        canAddToCart={canAddToCart}
        product={product}
        addToCart={addToCart}
        removeItemToCart={removeItemToCart}
        substractItemToCart={substractItemToCart}
      />
    </S.ProductCard>
  );
};
