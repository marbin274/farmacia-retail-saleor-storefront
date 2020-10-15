import "./scss/index.scss";

import * as React from "react";

import { ProductList } from "@components/organisms";
import {Category_products} from "@temp/views/Category/gqlTypes/Category";

import {
  ProductsList_shop,
} from "./gqlTypes/ProductsList";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

interface PageProps {
    loading: boolean;
    products: Category_products;
    shop: ProductsList_shop;
}

const Page: React.FC<PageProps> = ({
    loading,
    products,
    shop,
}) => {

  const productsExist = () => {
    return products && products.edges && products.edges.length > 0;
  };

  return (
    <div className="">
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>

      {productsExist && (
          <ProductList
              products={products.edges.map(edge => edge.node)}
              canLoadMore={false}
              loading={loading}
              onLoadMore={null}
          />
      )}

    </div>
  );
};

export default Page;
