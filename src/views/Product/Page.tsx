import { ProductImage } from "@components/molecules";
import {
  ICheckoutModelLine,
  ICheckoutModelLineVariantLocalStorage
} from "@sdk/repository";
import { ISimpleProduct } from "@temp/@next/types/IProduct";
import {
  checkProductCanAddToCart,
  getOneProductWithQuantity,
  productStickerRules
} from "@temp/@next/utils/products";
import { ProductsSelled } from "@temp/components/productsSelled";
import { convertToSimpleProduct } from "@temp/core/utils";
import React from "react";
import Media from "react-media";
import { ProductDescription } from "../../components";
import { structuredData } from "../../core/SEO/Product/structuredData";
import { structuredData as structuredCategoryData } from "../../core/SEO/Category/structuredData";
import { smallScreen } from "../../globalStyles/scss/variables.scss";
import { ProductDetails_product } from "./gqlTypes/ProductDetails";
// TODO: Add as soon as we need to add related products
// import OtherProducts from "./Other";
// TODO: Add as soon as we need to add more product information below the
// import { ProductDescription as NewProductDescription } from "../../@next/components/molecules";
// TODO: Add as soon as we need to add the breadcrumb

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

  const { add, remove, subtract, items, product } = props;
  const simpleProduct: ISimpleProduct = getOneProductWithQuantity(convertToSimpleProduct(product), items);
  const { canAddToCart } = checkProductCanAddToCart(
    simpleProduct,
    items
  );
  const { isOnSale, isOutStock } = productStickerRules(simpleProduct);


  return (
    <div className="product-page">
      {/* <div className="container">
        <Breadcrumbs breadcrumbs={populateBreadcrumbs(product)} /> 
      </div>*/}
      <div className="container">
        <div className="product-page__product">
          <script className="structured-data-list" type="application/ld+json">
            {structuredData(product)}
          </script>
          <script className="structured-data-list" type="application/ld+json">
            {structuredCategoryData(product.category)}
          </script>
          <Media query={{ maxWidth: smallScreen }}>
            {matches =>
              matches ? (
                <>
                  <ProductImage
                    canAddToCart={canAddToCart}
                    isOnSale={isOnSale}
                    isOutStock={isOutStock}
                    product={product}
                  />
                  <div className="product-page__product__info">
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
                      removeToCart={subtract}
                      isSmallScreen={matches}
                    />
                  </div>
                </>
              ) : (
                <>
                  <ProductImage
                    canAddToCart={canAddToCart}
                    isOnSale={isOnSale}
                    isOutStock={isOutStock}
                    product={product}
                  />
                  <div className="product-page__product__info">
                    <div className={"product-page__product__info--fixed"}>
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
                        removeToCart={subtract}
                        isSmallScreen={matches}
                      />
                    </div>
                  </div>
                </>
              )
            }
          </Media>
        </div>
      </div>
      {/* <div className="container">
          <div className="product-page__product__description">
            <NewProductDescription
              descriptionJson={product.descriptionJson}
              attributes={product.attributes}
            />
          </div>
        </div> */}
      {/* <OtherProducts products={product.category.products.edges} /> */}
      <ProductsSelled
        productDetail={product}
        productsOnCart={items}
        addToCart={add}
        removeItemToCart={remove}
        subtractItemToCart={subtract}
      />
    </div>
  );

}

export default Page;
