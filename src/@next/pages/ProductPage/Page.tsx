import { ProductImage } from '@components/molecules';
import { ProductsSelled } from '@components/organisms/ProductsSelled';
import { ProductDescription } from '@components/organisms/ProductDescription';
import { Breadcrumbs } from '@farmacia-retail/farmauna-components';
import { ProductDetails_product } from '@sdk/queries/gqlTypes/ProductDetails';
import {
  ICheckoutModelLine,
  ICheckoutModelLineVariantLocalStorage,
} from '@sdk/repository';
import { ISimpleProduct } from '@sdk/types/IProduct';
import {
  checkProductCanAddToCart,
  getOneProductWithQuantity,
  productStickerRules,
} from '@sdk/utils/products';
import { useMediaScreen } from '@temp/@next/globalStyles';
import { largeScreen } from '@temp/@next/globalStyles/constants';
import { baseUrl } from '@temp/app/routes';
import { structuredData as structuredCategoryData } from '@temp/core/SEO/Category/structuredData';
import { structuredData } from '@temp/core/SEO/Product/structuredData';
import {
  convertToSimpleProduct,
  getBreadcrumbsFromProduct,
} from '@temp/core/utils';
import React from 'react';
import * as S from './styles';
import { launchDetailProductEvent } from '@temp/@sdk/gaConfig';

// TODO: Add as soon as we need to add related products
// import OtherProducts from "./Other";
// TODO: Add as soon as we need to add more product information below the
// import { ProductDescription as NewProductDescription } from "../../@next/components/molecules";

export interface IProps {
  product: ProductDetails_product;
  add: (
    variant: ICheckoutModelLineVariantLocalStorage,
    quantity: number
  ) => void;
  remove: (variantId: string) => void;
  subtract: (variantId: string) => void;
  items: ICheckoutModelLine[];
}

export const Page: React.FC<IProps> = (props) => {
  const { isMobileScreen } = useMediaScreen();
  const { add, remove, subtract, items, product } = props;
  const simpleProduct: ISimpleProduct = getOneProductWithQuantity(
    convertToSimpleProduct(product),
    items
  );
  const { canAddToCart } = checkProductCanAddToCart(simpleProduct, items);
  const { isOnSale, isOutStock } = productStickerRules(simpleProduct);
  const [detailGaEventSended, setDetailGaEventSended] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (!detailGaEventSended) {
      setDetailGaEventSended(true);
      launchDetailProductEvent(
        product?.name,
        product?.variants[0]?.sku as string,
        product?.variants[0]?.pricing?.price?.gross?.amount as number,
        product?.category?.name,
        !isOutStock
      );
    }
  });

  const renderProductRightInfo = () => (
    <>
      <ProductDescription
        canAddToCart={canAddToCart}
        descriptionJson={product.descriptionJson}
        isOnSale={isOnSale}
        isOutStock={isOutStock}
        items={items}
        product={simpleProduct}
        pricing={product.pricing}
        productVariants={product.variants}
        addToCart={add}
        removeToCart={remove}
        subtractToCart={subtract}
        isSmallScreen={isMobileScreen}
      />
      <ProductsSelled
        productDetail={product}
        productsOnCart={items}
        addToCart={add}
        removeItemToCart={remove}
        subtractItemToCart={subtract}
      />
    </>
  );

  return (
    <S.ProductPage>
      <S.BreadcrumbsContainer>
        <Breadcrumbs
          baseUrl={baseUrl}
          breadcrumbs={getBreadcrumbsFromProduct(product)}
          minDesktopBreakpoint={largeScreen}
        />
      </S.BreadcrumbsContainer>
      <S.Container>
        <S.ProductWrapper>
          <script className="structured-data-list" type="application/ld+json">
            {structuredData(product)}
          </script>
          <script className="structured-data-list" type="application/ld+json">
            {structuredCategoryData(product.category)}
          </script>
          <S.ProductImageWrapper>
            <ProductImage
              canAddToCart={canAddToCart}
              isOnSale={isOnSale}
              isOutStock={isOutStock}
              product={product}
              hasMagnifier
            />
          </S.ProductImageWrapper>
          <S.ProductInfoWrapper>
            {isMobileScreen ? (
              renderProductRightInfo()
            ) : (
              <S.ProductInfoFixedWrapper>
                {renderProductRightInfo()}
              </S.ProductInfoFixedWrapper>
            )}
          </S.ProductInfoWrapper>
        </S.ProductWrapper>
      </S.Container>
    </S.ProductPage>
  );
};

export default Page;
