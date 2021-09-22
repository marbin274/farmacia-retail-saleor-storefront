import { ProductSticker } from '@components/atoms';
import { Money } from '@components/containers/Money/Money';
import { Thumbnail } from '@components/molecules';
import ItemsHandler from '@components/organisms/ItemsHandler/ItemsHandler';
import {
  checkProductCanAddToCart,
  getOneProductWithQuantity,
  productStickerRules,
} from '@sdk/utils/products';
import { searchProductsService } from '@temp/@next/services/searchProductsService';
import { getProductPricingClass } from '@temp/@next/utils/products';
import { SearchResults_products_edges } from '@temp/@sdk/queries/gqlTypes/SearchResults';
import { useCart } from '@temp/@sdk/react';
import { convertToSimpleProduct, generateProductUrl } from '@temp/core/utils';
import Link from 'next/link';
import * as React from 'react';
import * as S from './styles';

const ProductItem: React.FC<SearchResults_products_edges> = ({ node }) => {
  const { items, addItem, subtractItem } = useCart();
  const product = getOneProductWithQuantity(
    convertToSimpleProduct(node),
    items
  );
  const { canAddToCart, isStockAvailable } = checkProductCanAddToCart(
    product,
    items
  );
  const { isOnSale, isOutStock } = productStickerRules(product);
  const refActions = React.useRef({} as any);

  const linkToProduct = generateProductUrl(product.id, product.name);
  return (
    <S.ProductItemLi className="fa-border-b fa-border-solid fa-border-neutral-medium fa-bg-white fa-py-4 fa-px-6 fa-relative fa-overflow-hidden fa-h-auto fa-w-full fa-rounded-none fa-max-w-none lg:fa-rounded-3xl lg:fa-border-0 lg:fa-pt-6 lg:fa-pr-8 lg:fa-pb-4 lg:fa-pl-4">
      <div className="fa-flex fa-justify-between fa-flex-col sm:fa-flex-row">
        <Link href={linkToProduct}>
          <div className="fa-w-auto sm:fa-w-full">
            <S.ProductItemSide
              className="fa-grid fa-cursor-pointer"
              onClick={(e) => {
                if (refActions?.current?.contains(e.target)) {
                  e.preventDefault();
                } else {
                  searchProductsService.hide();
                }
              }}
            >
              <div className="fa-flex fa-flex-row fa-flex-wrap fa-justify-center fa-relative">
                <Thumbnail source={node} />
                <span className="lg:fa-absolute lg:fa-top-0 lg:fa-left-0">
                  <ProductSticker isOnSale={isOnSale} isOutStock={isOutStock} />
                </span>
              </div>
              <S.ProductItemNameWrapper className="fa-text-aunaBlack fa-flex-col fa-justify-center fa-font-semibold fa-w-full search__products__item__side__name">
                <div>
                  <S.ProductItemName className="fa-relative lg:fa-overflow-hidden">
                    {product.name}
                  </S.ProductItemName>
                  <S.ProductItemCategory className="fa-text-neutral-dark fa-text-xs fa-mt-2 fa-font-normal fa-block fa-overflow-hidden fa-w-52 lg:fa-w-56">
                    {product.category?.name}
                  </S.ProductItemCategory>
                </div>
                <span className="fa-flex fa-items-center fa-justify-between fa-text-xs fa-mt-1 fa-relative">
                  <S.ProductItemPrice
                    isOnSale={isOnSale}
                    canAddToCart={canAddToCart}
                    className="fa-font-semibold fa-text-xs fa-mb-0 fa-float-left fa-flex fa-flex-col lg:fa-flex-row lg:fa-text-xl lg:fa-float-right fa-items-start lg:fa-items-center"
                  >
                    <span className="fa-text-xs fa-font-medium fa-text-neutral-medium fa-inline-block fa-align-middle fa-leading-6 fa-m-0 fa-mr-4">
                      Precio
                    </span>
                    <Money
                      className="fa-leading-6"
                      money={product.pricing.priceRange.start.net}
                    />
                  </S.ProductItemPrice>
                  <S.ProductItemActions
                    className="fa-flex fa-items-center fa-flex-row fa-justify-between fa-relative sm:fa-flex-col sm:fa-justify-end"
                    ref={refActions}
                  >
                    <div
                      className={getProductPricingClass(canAddToCart, isOnSale)}
                    ></div>
                    <ItemsHandler
                      disableOnAdd={!isStockAvailable}
                      canAddToCart={canAddToCart}
                      product={product}
                      addToCart={addItem}
                      removeItemToCart={subtractItem}
                      subtractItemToCart={subtractItem}
                    />
                  </S.ProductItemActions>
                </span>
              </S.ProductItemNameWrapper>
            </S.ProductItemSide>
          </div>
        </Link>
      </div>
    </S.ProductItemLi>
  );
};
export default ProductItem;
