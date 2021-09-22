import { TaxedMoney } from '@components/containers';
import { Thumbnail } from '@components/molecules';
import {
  checkProductCanAddToCart,
  productStickerRules,
} from '@sdk/utils/products';
import { getProductPricingClass } from '@temp/@next/utils/products';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ItemsHandler from '../../organisms/ItemsHandler/ItemsHandler';
import * as S from './styles';
import { IProps } from './types';

export const ProductTileHorizontalAUNA: React.FC<IProps> = ({
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
    thumbnail: { url: '' },
    thumbnail2x: { url: '' },
  });

  const { canAddToCart } = checkProductCanAddToCart(product, productsOnCart);
  const { isOnSale } = productStickerRules(product);

  useEffect(() => {
    setThumbnails({
      thumbnail: { url: product?.thumbnail?.url || '' },
      thumbnail2x: { url: product?.thumbnail2x?.url || '' },
    });
  }, [product.thumbnail, product.thumbnail2x]);

  return (
    <S.ProductCard canAddToCart={canAddToCart}>
      <Link href={productLink} key={product.id}>
        <S.WrapperImage className="fa-cursor-pointer">
          <div className="img">
            <Thumbnail height={510} width={510} source={thumbnails} />
          </div>
        </S.WrapperImage>
      </Link>
      <S.WrapperDetail>
        <Link href={productLink} key={product.id}>
          <S.ProductTitle className="fa-cursor-pointer">
            {product.name}
          </S.ProductTitle>
        </Link>
        <S.ProductPrice>
          <div className={getProductPricingClass(canAddToCart, isOnSale)}>
            <S.ProductTitlePrice>Precio</S.ProductTitlePrice>
            <TaxedMoney taxedMoney={product?.pricing?.priceRange?.start} />
          </div>
          {isOnSale && (
            <div className="price undiscounted_price">
              <S.ProductTitlePrice>Antes</S.ProductTitlePrice>
              <TaxedMoney
                taxedMoney={product?.pricing?.priceRangeUndiscounted?.start}
              />
            </div>
          )}
          <S.WrapperItemHandler>
            <ItemsHandler
              canAddToCart={canAddToCart}
              product={product}
              addToCart={addToCart}
              removeItemToCart={removeItemToCart}
              subtractItemToCart={subtractItemToCart}
            />
          </S.WrapperItemHandler>
        </S.ProductPrice>
      </S.WrapperDetail>
    </S.ProductCard>
  );
};
