import "./scss/index.scss";

import * as React from "react";

import { IAddToCartCallback } from "@components/molecules/ProductTileAUNA/types";
import { ProductListAUNA } from "@components/organisms";

import { ISimpleProduct } from "@app/types/IProduct";
import { structuredData } from "../../core/SEO/Homepage/structuredData";
import { HomePage_shop } from "./gqlTypes/HomePage";
import { useCart } from "@temp/@sdk/react";

interface PageProps {
  addToCart: IAddToCartCallback;
  loading: boolean;
  products: ISimpleProduct[];
  shop: HomePage_shop;
}

const Page: React.FC<PageProps> = ({ addToCart, loading, products, shop }) => {
  const { items } = useCart();

  return (
    <div className="">
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>

      {products && (
        <ProductListAUNA
          addToCart={addToCart}
          canLoadMore={false}
          loading={loading}
          onLoadMore={null}
          products={products}
          items={items}
        />
      )}
    </div>
  );
};

export default Page;
