import "./scss/index.scss";

import * as React from "react";

import { ProductList } from "@components/organisms";

import { structuredData } from "../../core/SEO/Homepage/structuredData";
import { HomePage_products, HomePage_shop } from "./gqlTypes/HomePage";

interface PageProps {
    loading: boolean;
    products: HomePage_products;
    shop: HomePage_shop;
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
