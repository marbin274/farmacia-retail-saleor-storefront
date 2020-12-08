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
    <div className="container">
      <div className="home-page__top-banner">
        <div className="home-page__top-banner__text">
          <h2>Bienvenido a la experiencia digital más ágil en farmacia</h2>
          <p>
            Compra todo lo que necesites y recíbelo en menos de{" "}
            <b>60 minutos</b>.
          </p>
        </div>
      </div>

      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>

      <div className="inner-container">
        <div className="home-page__products">
          <p>
            <h2>Recomendados para tu botiquín</h2>
          </p>
          {products && (
            <ProductListAUNA
              addToCart={addToCart}
              canLoadMore={false}
              loading={loading}
              onLoadMore={null}
              products={products}
              productsOnCart={items}
            />
          )}
        </div>
      </div>

      <div className="home-page__bottom-section">
        <div className="home-page__bottom-banner">
          <p>Llegamos a 12 distritos de lima ¡en menos de 60 minutos!</p>
        </div>
        <div className="home-page__districts-list"></div>
      </div>
    </div>
  );
};

export default Page;
