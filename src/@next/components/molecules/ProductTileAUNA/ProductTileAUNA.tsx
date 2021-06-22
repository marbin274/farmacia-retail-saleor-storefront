import { ProductSticker } from "@components/atoms";
import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";
import {
  checkProductCanAddToCart,
  getProductPricingClass,
  productStickerRules,
} from "@temp/@next/utils/products";
import { launchDetailProductEvent } from "@temp/@sdk/gaConfig";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemsHandler from "../../organisms/ItemsHandler/ItemsHandler";
import * as S from "./styles";
import { IProps } from "./types";

export const ProductTileAUNA: React.FC<IProps> = ({
  addToCart,
  removeItemToCart,
  subtractItemToCart,
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
  const { isOnSale, isOutStock } = productStickerRules(product);

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
          <ProductSticker isOnSale={isOnSale} isOutStock={isOutStock} />
          <div
            className="img"
            onClick={() =>
              launchDetailProductEvent(
                product?.name,
                product?.variant?.sku as string,
                product?.variant?.pricing?.price?.gross?.amount as number
              )
            }
          >
            <S.Image>
              <Thumbnail height={510} width={510} source={thumbnails} />
            </S.Image>
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
          <div className="description">
            <S.Title>{product.name}</S.Title>
          </div>
        </S.WrapperStockout>
      </Link>
      <ItemsHandler
        canAddToCart={canAddToCart}
        product={product}
        addToCart={addToCart}
        removeItemToCart={removeItemToCart}
        subtractItemToCart={subtractItemToCart}
      />
    </S.ProductCard>
  );
};
