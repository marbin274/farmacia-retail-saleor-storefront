import { ProductImage } from "@components/molecules";
import {
  ICheckoutModelLine,
  ICheckoutModelLineVariantLocalStorage,
} from "@sdk/repository";
import { ISimpleProduct } from "@temp/@next/types/IProduct";
import {
  checkProductCanAddToCart,
  getOneProductWithQuantity,
  productStickerRules,
} from "@temp/@next/utils/products";
import { ProductsSelled } from "@temp/components/productsSelled";
import {
  convertToSimpleProduct,
  getBreadcrumbsFromProduct,
} from "@temp/core/utils";
import React from "react";
import Media from "react-media";
import { ProductDescription } from "../../components";
import { structuredData } from "../../core/SEO/Product/structuredData";
import { structuredData as structuredCategoryData } from "../../core/SEO/Category/structuredData";
import { smallScreen } from "../../globalStyles/scss/variables.scss";
import { ProductDetails_product } from "./gqlTypes/ProductDetails";
import { Breadcrumbs } from "@farmacia-retail/farmauna-components";
import { largeScreen } from "@temp/@next/globalStyles/constants";
import { baseUrl } from "@temp/app/routes";
import * as S from "./styles";
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

export const Page: React.FC<IProps> = props => {
  const { add, remove, subtract, items, product } = props;
  const simpleProduct: ISimpleProduct = getOneProductWithQuantity(
    convertToSimpleProduct(product),
    items
  );
  const { canAddToCart } = checkProductCanAddToCart(simpleProduct, items);
  const { isOnSale, isOutStock } = productStickerRules(simpleProduct);

  const renderProductRightInfo = matches => (
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
        isSmallScreen={matches}
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
          <Media query={{ maxWidth: smallScreen }}>
            {matches => (
              <>
                <S.ProductImageWrapper>
                  <ProductImage
                    canAddToCart={canAddToCart}
                    isOnSale={isOnSale}
                    isOutStock={isOutStock}
                    product={product}
                    hasMagnifier
                  />
                </S.ProductImageWrapper>
                {matches ? (
                  <S.ProductInfoWrapper>
                    {renderProductRightInfo(matches)}
                  </S.ProductInfoWrapper>
                ) : (
                  <S.ProductInfoWrapper>
                    <S.ProductInfoFixedWrapper>
                      {renderProductRightInfo(matches)}
                    </S.ProductInfoFixedWrapper>
                  </S.ProductInfoWrapper>
                )}
              </>
            )}
          </Media>
        </S.ProductWrapper>
      </S.Container>
    </S.ProductPage>
  );
};

export default Page;
