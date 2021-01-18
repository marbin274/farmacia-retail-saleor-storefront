
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
      <a href="./product/fotoprotector-facial-anthelios-shaka-color-spf50-50ml/4524/">
        <div className="home-page__top-banner">
          <div className="home-page__top-banner__text">
            <h2>Protectores Solares<br />La Roche Posay</h2>
            <h3>
              <a href="./product/fotoprotector-facial-anthelios-shaka-color-spf50-50ml/4524/">
                Shaka Color
            </a>&nbsp;/&nbsp;
            <a href="./product/protect-solar-anthelios-xl-color-spf50-50-ml/4272/">XL Color 50 ml</a>
            </h3>
            <p>
              *Promoción válida hasta el 21/01/2021 o hasta agotar stock. Max. 3 unidades por producto.<br />
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
