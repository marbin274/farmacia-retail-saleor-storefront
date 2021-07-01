import { ProductSticker } from "@components/atoms";
import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";
import {
  trackAddProductToCartFromPersonalized,
  trackSelectProductFromPersonalized,
} from "@temp/@next/optimizely/tracks";
import {
  checkProductCanAddToCart,
  getProductPricingClass,
  productStickerRules,
} from "@temp/@next/utils/products";
import { launchDetailProductEvent } from "@temp/@sdk/gaConfig";
import { ICheckoutModelLineVariantLocalStorage } from "@temp/@sdk/repository";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemsHandler from "../../organisms/ItemsHandler/ItemsHandler";
import * as S from "./styles";
import { IProps } from "./types";

export const ProductTileAUNA: React.FC<IProps> = ({
  addToCart,
  removeItemToCart,
  subtractItemToCart,
  isPersonalized,
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
  const refActions = React.useRef({} as any);

  const { canAddToCart } = checkProductCanAddToCart(product, productsOnCart);
  const { isOnSale, isOutStock } = productStickerRules(product);

  const handleAddToCart = (
    productId: ICheckoutModelLineVariantLocalStorage,
    quantity: number
  ) => {
    if (!!isPersonalized) {
      trackAddProductToCartFromPersonalized();
    }
    addToCart(productId, quantity);
  };

  useEffect(() => {
    setThumbnails({
      thumbnail: { url: product?.thumbnail?.url || "" },
      thumbnail2x: { url: product?.thumbnail2x?.url || "" },
    });
  }, [product.thumbnail, product.thumbnail2x]);

  return (
    <S.ProductCard
      className="home-page__product fa-border-b fa-border-solid fa-border-neutral-medium lg:fa-border-0"
      data-cy="product-tile"
      canAddToCart={canAddToCart}
    >
      <div className="fa-w-full fa-block lg:fa-hidden">
        <S.LinkContainer
          to={productLink}
          key={product.id}
          onClick={e => {
            trackSelectProductFromPersonalized();
            if (refActions?.current?.contains(e.target)) {
              e.preventDefault();
            }
          }}
        >
          <div className="home-page__product-image fa-flex fa-flex-col fa-items-center">
            <div
              className="img fa-rounded-lg fa-bg-white fa-overflow-hidden"
              onClick={() =>
                launchDetailProductEvent(
                  product?.name,
                  product?.variant?.sku as string,
                  product?.variant?.pricing?.price?.gross?.amount as number,
                  product?.category?.name
                )
              }
            >
              <S.Image>
                <Thumbnail height={510} width={510} source={thumbnails} />
              </S.Image>
            </div>
            <div className="home-page__product-sticker fa-mt-2">
              <ProductSticker isOnSale={isOnSale} isOutStock={isOutStock} />
            </div>
          </div>
          <div className="fa-pl-4">
            <div className="home-page__product-price fa-hidden">
              <div className={getProductPricingClass(canAddToCart, isOnSale)}>
                <S.Price>
                  <TaxedMoney
                    taxedMoney={product?.pricing?.priceRange?.start}
                  />
                </S.Price>
              </div>
              {isOnSale && (
                <div className="price undiscounted_price">
                  <TaxedMoney
                    taxedMoney={product?.pricing?.priceRangeUndiscounted?.start}
                  />
                </div>
              )}
            </div>
            <div className="description">
              <S.Title className="home-page__product-title fa-text-left">
                {product.name}
              </S.Title>
            </div>
            <div className="home-page__product-button fa-flex fa-justify-between">
              <div className="search-page__product-price">
                <div className={getProductPricingClass(canAddToCart, isOnSale)}>
                  <S.Price className="fa-font-base">
                    <TaxedMoney
                      taxedMoney={product?.pricing?.priceRange?.start}
                    />
                  </S.Price>
                </div>
              </div>
              <div ref={refActions}>
                <ItemsHandler
                  canAddToCart={canAddToCart}
                  product={product}
                  addToCart={handleAddToCart}
                  removeItemToCart={removeItemToCart}
                  subtractItemToCart={subtractItemToCart}
                />
              </div>
            </div>
          </div>
        </S.LinkContainer>
      </div>
      <div className="fa-hidden lg:fa-block">
        <Link
          key={product.id}
          onClick={() => {
            trackSelectProductFromPersonalized();
          }}
          to={productLink}
        >
          <S.WrapperStockout>
            <ProductSticker isOnSale={isOnSale} isOutStock={isOutStock} />
            <div
              className="img"
              onClick={() =>
                launchDetailProductEvent(
                  product?.name,
                  product?.variant?.sku as string,
                  product?.variant?.pricing?.price?.gross?.amount as number,
                  product?.category?.name
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
          addToCart={handleAddToCart}
          removeItemToCart={removeItemToCart}
          subtractItemToCart={subtractItemToCart}
        />
      </div>
    </S.ProductCard>
  );
};
