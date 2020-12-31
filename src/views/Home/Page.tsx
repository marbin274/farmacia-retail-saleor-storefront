import {IItems} from "@sdk/api/Cart/types";
import * as React from "react";

import { ProductListAUNA } from "@components/organisms";
import { structuredData } from "../../core/SEO/Homepage/structuredData";

import { IAddToCartCallback } from "@components/molecules/ProductTileAUNA/types";
import { ISimpleProduct } from "@app/types/IProduct";
import { HomePage_shop } from "./gqlTypes/HomePage";
import "./scss/index.scss";

interface IPageProps {
  addToCart: IAddToCartCallback;
  items: IItems;
  loading: boolean;
  products: ISimpleProduct[];
  shop: HomePage_shop;
}

const Page: React.FC<IPageProps> = ({
  addToCart,
  items,
  loading,
  products,
  shop }) => {
  return (
    <div className="container">
        <a href="./product/protector-solar-facial-isdin-fusion-water-color-50ml/4481/">
      <div className="home-page__top-banner">
        <div className="home-page__top-banner__text">
          <h2>Bloqueadores Isdin 50 ml</h2>
          <h3>
            <a href="./product/protector-solar-facial-isdin-fusion-water-color-50ml/4481/">
            Fusion Water
            </a>&nbsp;y&nbsp; 
            <a href="./product/fotoprotect-facial-isdin-fusion-fluid-ultraligero-50ml/4076/">Fusion Fluid</a>
          </h3>
          <p>
            *Promoción válida hasta el 04/01/2021 o hasta agotar stock. Max. 3 unidades por producto.<br/>
            Aplica max. 2 promociones por usuario. No acumulable con otras promociones. Aplican más T&C.
          </p>
        </div>
      </div>
      </a>

      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>

      <div className="inner-container">
        <div className="home-page__products">
          <h2 className="home-page__products-title">Nuestros recomendados</h2>
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
          <p>Llegamos a 12 distritos de Lima ¡en menos de 60 minutos!</p>
        </div>
        <div className="home-page__districts-list"/>
      </div>

    </div>
  );
};

export default Page;
