import { IAddToCartCallback } from "@app/components/molecules/ProductTileAUNA/types";
import { IItems } from "@sdk/api/Cart/types";
import { structuredData } from "@temp/core/SEO/Homepage/structuredData";
import * as React from "react";
import { ProductsFeatured } from "./";
import { HomePage_shop } from "./gqlTypes/HomePage";
import "./scss/index.scss";

interface IPageProps {
  loading: boolean;
  productsOnCart: IItems;
  shop: HomePage_shop;
  addToCart: IAddToCartCallback;
}

const Page: React.FC<IPageProps> = ({
  loading,
  productsOnCart,
  shop,
  addToCart,
}) => {
  return (
    <>
      <div className="container">
        <a href="./product/protector-solar-corporal-eucerin-sensitive-protect-150-ml/4400/">
          <div className="home-page__top-banner">
            <div className="home-page__top-banner__text">
              <h2>EN TODO EUCERIN </h2>
              <h3>
                <strong>Cuida tu piel como se merece</strong>
              </h3>
              <p>
                Válido hasta el 28/02/21 o agotar stock. Máx. 3 unids por
                producto. Aplica máx. 2 promociones por usuario. *Rango de tiempo
                referencial, sujeto a demanda. T&C:
                <a href="http://bit.ly/TyC_Farmauna" target="_blank">
                  http://bit.ly/TyC_Farmauna
                </a>
              </p>
            </div>
          </div>
        </a>
        <script className="structured-data-list" type="application/ld+json">
          {structuredData(shop)}
        </script>

      </div>
      <ProductsFeatured
        productsOnCart={productsOnCart}
        loading={loading}
        addToCart={addToCart}
      />
      <div className="container">
        <div className="home-page__bottom-section">
          <div className="home-page__bottom-banner">
            <p>Llegamos a 12 distritos de Lima ¡en menos de 75 minutos!</p>
          </div>
          <div className="home-page__districts-list" />
        </div>
      </div>
      
    </>
  );
};

export default Page;
