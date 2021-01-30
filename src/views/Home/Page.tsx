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
    <div className="container">
      <a href="./product/mascarilla-3-pliegues-caja-50-und/2458/">
        <div className="home-page__top-banner">
          <div className="home-page__top-banner__text">
            <h2>EN PRODUCTOS PARA TU CUIDADO</h2>
            <h3><strong>Protégete del COVID</strong></h3>
            <p>
            * Válido hasta el 31/01/21 o hasta agotar stock. Máx. 3 unids por producto. 
            Aplica max. 2 promociones por usuario. Delivery S/0.01 hasta el 31/01/21. T&C: <a href="http://bit.ly/TyC_Farmauna" target="_blank">http://bit.ly/TyC_Farmauna</a>
            </p>
          </div>
        </div>
      </a>
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>

      <div className="inner-container">
        <div className="home-page__products">
          <ProductsFeatured
            productsOnCart={productsOnCart}
            loading={loading}
            addToCart={addToCart}
          />
        </div>
      </div>

      <div className="home-page__bottom-section">
        <div className="home-page__bottom-banner">
          <p>Llegamos a 12 distritos de Lima ¡en menos de 75 minutos!</p>
        </div>
        <div className="home-page__districts-list" />
      </div>
    </div>
  );
};

export default Page;
