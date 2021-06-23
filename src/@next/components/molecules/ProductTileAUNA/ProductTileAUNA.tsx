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
  const refActions = React.useRef({} as any);

  const { canAddToCart } = checkProductCanAddToCart(product, productsOnCart);
  const { isOnSale, isOutStock } = productStickerRules(product);

  useEffect(() => {
    setThumbnails({
      thumbnail: { url: product?.thumbnail?.url || "" },
      thumbnail2x: { url: product?.thumbnail2x?.url || "" },
    });
  }, [product.thumbnail, product.thumbnail2x]);

  return (
    <S.ProductCard  
      className='home-page_product fa-border-b fa-border-solid fa-border-neutral-medium lg:fa-border-0' 
      data-cy="product-tile" 
      canAddToCart={canAddToCart}>
      <div className='fa-w-full fa-block lg:fa-hidden'>
        <S.LinkContainer 
          to={productLink} 
          key={product.id} 
          onClick={(e)=> {
            if (refActions?.current?.contains(e.target)) {
              e.preventDefault();
            }
          }}>
          <div className='home-page_product-image fa-flex fa-flex-col fa-items-center'>
            <div
              className="img fa-rounded-lg fa-bg-white fa-overflow-hidden"
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
            <div className='home-page_product-sticker fa-mt-2'>
              <ProductSticker isOnSale={isOnSale} isOutStock={isOutStock} />
            </div>
          </div>
          <div className='fa-px-4 fa-pb-4'>
            <div className='home-page_product-price fa-hidden'>
              <div className={getProductPricingClass(canAddToCart, isOnSale)}>
                <TaxedMoney taxedMoney={product?.pricing?.priceRange?.start} />
              </div>
              <div className="price undiscounted_price">
                <TaxedMoney taxedMoney={product?.pricing?.priceRangeUndiscounted?.start} />
              </div>
            </div>
            <div className="description">
              <S.Title className='home-page_product-title fa-text-left'>{product.name}</S.Title>
            </div>
            <div className='home-page_product-button fa-flex fa-justify-between'>
              <div className='search-page_product-price'>
                <div className={getProductPricingClass(canAddToCart, isOnSale)}>
                  <S.Price className='fa-font-base'>
                    <TaxedMoney taxedMoney={product?.pricing?.priceRange?.start} />
                  </S.Price>
                </div>
              </div>
              <div ref={refActions}>
                <ItemsHandler
                  canAddToCart={canAddToCart}
                  product={product}
                  addToCart={addToCart}
                  removeItemToCart={removeItemToCart}
                  subtractItemToCart={subtractItemToCart}
                />
              </div>
            </div>
          </div>
        </S.LinkContainer>
      </div>
      <div className='fa-hidden lg:fa-block'>
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
      </div>
    </S.ProductCard>
  );
};
