import "./scss/index.scss";

import * as React from "react";
// import classNames from "classnames";
// import { Link } from "react-router-dom";

// import { Button, Loader, ProductsFeatured } from "../../components";
import { ProductList } from "@components/organisms";

// import { generateCategoryUrl } from "../../core/utils";

import {
  ProductsList_categories,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage,
} from "./gqlTypes/ProductsList";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

interface PageProps {
    loading: boolean;
    // categories: ProductsList_categories;
    products: object; // @todo change to proper type imported from ./gqlTypes
    // backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
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
