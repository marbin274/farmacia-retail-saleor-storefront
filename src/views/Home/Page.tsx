
import * as React from "react";
import { structuredData } from "@temp/core/SEO/Homepage/structuredData";
import { HomePage_shop } from "./gqlTypes/HomePage";
import "./scss/index.scss";
import { ProductsFeatured } from "./";
import { IItems } from "@sdk/api/Cart/types";
import { IAddToCartCallback } from "@app/components/molecules/ProductTileAUNA/types";

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
      <a href="./product/shampoo-head-and-shoulders-2en1-suave-y-manejable-700-ml/4286/">
        <div className="home-page__top-banner">
          <div className="home-page__top-banner__text">
            <h2>Shampoo H&S 700 ml</h2>
            <h3>
              2en1 Suave y Manejable o Limpieza Renovadora
        </h3>
            <p>
              *Promoción válida hasta el 07/01/2021 o hasta agotar el stock. Máx. 3 unidades por producto.<br />
          Aplica máx. 2 promociones por usuario. No acumulable con otras promociones. Aplican más T&C.
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
          <ProductsFeatured
            productsOnCart={productsOnCart}
            loading={loading}
            addToCart={addToCart}
          />
        </div>
      </div>

      <div className="home-page__bottom-section">
        <div className="home-page__bottom-banner">
          <p>Llegamos a 12 distritos de Lima ¡en menos de 60 minutos!</p>
        </div>
        <div className="home-page__districts-list" />
      </div>

    </div>
  );
};

export default Page;
