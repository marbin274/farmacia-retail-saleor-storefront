import { IAddToCartCallback } from "@app/components/molecules/ProductTileAUNA/types";
import { ProductListAUNA } from "@app/components/organisms";
import { ISimpleProduct } from "@app/types/IProduct";
import { IItems } from "@sdk/api/Cart/types";
import { TypedFeaturedProductsQuery } from "@temp/components/ProductsFeatured/queries";
import { PRODUCTS_PER_PAGE } from "@temp/core/config";
import { maybe } from "@temp/core/utils";
import * as React from "react";
import "./scss/index.scss";

interface ProductsFeaturedProps {
  loading: boolean;
  productsOnCart: IItems;
  title?: string;
  addToCart: IAddToCartCallback;
}

const ProductsFeatured: React.FC<ProductsFeaturedProps> = ({ loading, productsOnCart, addToCart }) => {
  return (
    <TypedFeaturedProductsQuery
      displayError={false}
      variables={{ first: PRODUCTS_PER_PAGE }}>
      {({ data }) => {

        if (data?.shop?.homepageCollections?.length) {
          return data.shop.homepageCollections.map(collection => {
            const products: ISimpleProduct[] = maybe(
              () => collection.products.edges.map(product => ({ ...product.node })),
              []
            );
            return <>
              <h2 className="home-page__products-title">{collection.name}</h2>
              <ProductListAUNA
                canLoadMore={false}
                loading={loading}
                onLoadMore={null}
                products={products}
                productsOnCart={productsOnCart}
                addToCart={addToCart}
              />
              <br />
            </>
          });
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
