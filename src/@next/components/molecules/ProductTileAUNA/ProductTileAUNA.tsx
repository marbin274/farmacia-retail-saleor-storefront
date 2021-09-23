import { ProductSticker } from '@components/atoms';
import { TaxedMoney } from '@components/containers';
import { Thumbnail } from '@components/molecules';
import {
  checkProductCanAddToCart,
  productStickerRules,
} from '@sdk/utils/products';
import { getProductPricingClass } from '@temp/@next/utils/products';
import { ICheckoutModelLineVariantLocalStorage } from '@temp/@sdk/repository';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ItemsHandler from '../../organisms/ItemsHandler/ItemsHandler';
import * as S from './styles';
import { IProps } from './types';

export const ProductTileAUNA: React.FC<IProps> = ({
  addToCart,
  productUrl: productLink,
  product,
  productsOnCart,
  removeItemToCart,
  subtractItemToCart,
  collectionName,
}: IProps) => {
  const [thumbnails, setThumbnails] = useState<{
    thumbnail: { url: string | undefined };
    thumbnail2x: { url: string | undefined };
  }>({
    thumbnail: { url: '' },
    thumbnail2x: { url: '' },
  });
  const refActions = React.useRef({} as any);

  const { canAddToCart } = checkProductCanAddToCart(product, productsOnCart);
  const { isOnSale, isOutStock } = productStickerRules(product);

  const handleAddToCart = (
    productId: ICheckoutModelLineVariantLocalStorage,
    quantity: number
  ) => {
    addToCart(productId, quantity);
  };

  useEffect(() => {
    setThumbnails({
      thumbnail: { url: product?.thumbnail?.url || '' },
      thumbnail2x: { url: product?.thumbnail2x?.url || '' },
    });
  }, [product.thumbnail, product.thumbnail2x]);

  return (
    <S.ProductCard
      className="home-page__product fa-border-b fa-border-solid fa-border-neutral-medium lg:fa-border-0"
      data-cy="product-tile"
      canAddToCart={canAddToCart}
    >
      <div className="fa-w-full fa-block lg:fa-hidden">
        <S.LinkContainer className="home-page__product__link" key={product.id}>
          <Link href={productLink}>
            <div
              className="home-page__product-image fa-flex fa-flex-col fa-items-center"
              onClick={(e) => {
                if (refActions?.current?.contains(e.target)) {
                  e.preventDefault();
                }
              }}
            >
              <div className="img fa-rounded-lg fa-bg-white fa-overflow-hidden">
                <S.Image>
                  <Thumbnail height={510} width={510} source={thumbnails} />
                </S.Image>
              </div>
              <div className="home-page__product-sticker fa-mt-2">
                <div className="fa-flex fa-justify-start">
                  <ProductSticker isOnSale={isOnSale} isOutStock={isOutStock} />
                </div>
              </div>
            </div>
          </Link>
          <div>
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
            <Link href={productLink}>
              <div className="description">
                <S.Title className="home-page__product-title fa-line-clamp-2 fa-text-left fa-text-sm lg:fa-text-lg">
                  {product.name}
                </S.Title>
              </div>
            </Link>
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
              <div ref={refActions} className="fa-z-2">
                <ItemsHandler
                  canAddToCart={canAddToCart}
                  product={product}
                  addToCart={handleAddToCart}
                  removeItemToCart={removeItemToCart}
                  subtractItemToCart={subtractItemToCart}
                  collectionName={collectionName}
                />
              </div>
            </div>
          </div>
        </S.LinkContainer>
      </div>
      <div className="fa-hidden lg:fa-block">
        <Link href={productLink}>
          <S.WrapperStockout>
            <div className="fa-absolute">
              <div className="fa-flex fa-justify-start">
                <ProductSticker isOnSale={isOnSale} isOutStock={isOutStock} />
              </div>
            </div>
            <div className="img">
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
              <S.Title className="fa-line-clamp-2">{product.name}</S.Title>
            </div>
          </S.WrapperStockout>
        </Link>
        <ItemsHandler
          canAddToCart={canAddToCart}
          product={product}
          addToCart={handleAddToCart}
          removeItemToCart={removeItemToCart}
          subtractItemToCart={subtractItemToCart}
          collectionName={collectionName}
        />
      </div>
    </S.ProductCard>
  );
};
