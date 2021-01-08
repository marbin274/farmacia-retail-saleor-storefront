import * as React from "react";
import { maybe } from "@temp/core/utils";
import { TypedFeaturedProductsQuery } from "@temp/components/ProductsFeatured/queries";

import "./scss/index.scss";
import { ProductListAUNA } from "@app/components/organisms";

import { ISimpleProduct } from "@app/types/IProduct";
import { IItems } from "@sdk/api/Cart/types";
import { IAddToCartCallback } from "@app/components/molecules/ProductTileAUNA/types";

interface ProductsFeaturedProps {
  loading: boolean;
  productsOnCart: IItems;
  title?: string;
  addToCart: IAddToCartCallback;
}

const ProductsFeatured: React.FC<ProductsFeaturedProps> = ({ loading, productsOnCart, addToCart }) => {
  return (
    <TypedFeaturedProductsQuery displayError={false}>
      {({ data }) => {
        const products = maybe(
          () => data.shop.homepageCollection.products.edges,
          []
        );
        const productList: ISimpleProduct[] = products.map(product => ({
          id: product.node.id,
          name: product.node.name,
          pricing: product.node.pricing,
          thumbnail: product.node.thumbnail,
          thumbnail2x: product.node.thumbnail2x,
          variants: product.node.variants.map(variant => ({
            id: variant.id,
            quantityAvailable: variant.quantityAvailable,
          })),
        }));

        if (products.length) {
          return (
            <ProductListAUNA
              canLoadMore={false}
              loading={loading}
              onLoadMore={null}
              products={productList}
              productsOnCart={productsOnCart}
              addToCart={addToCart}
            />
          );
        } else {
          return null;
        }
      }}
    </TypedFeaturedProductsQuery>
  );
};

ProductsFeatured.defaultProps = {
  title: "Nuestros recomendados",
};

export default ProductsFeatured;
