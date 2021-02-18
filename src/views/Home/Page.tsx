import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubstractItemToCartCallback,
} from "@app/components/molecules/ProductTileAUNA/types";
import { IItems } from "@sdk/api/Cart/types";
import { structuredData } from "@temp/core/SEO/Homepage/structuredData";
import * as React from "react";
import { ProductsFeatured } from "./";
import { HomePage_shop } from "./gqlTypes/HomePage";
import { useHistory } from "react-router-dom";
import "./scss/index.scss";
import { TypedHomePageQuery } from "./queries";
import styled from "styled-components";
import { BannerCarousel } from "@components/containers";
import BannerDesktop from "../../images/auna/home-banner-top.png";
import BannerMobile from "../../images/auna/home-banner-mob.png";

interface IPageProps {
  loading: boolean;
  productsOnCart: IItems;
  shop: HomePage_shop;
  addToCart: IAddToCartCallback;
  removeItemToCart: IRemoveItemToCartCallback;
  substractItemToCart: ISubstractItemToCartCallback;
}
interface IBanner {
  urlDesktop: string | null;
  urlMobile: string | null;
}

const StyledBanner = styled.div<IBanner>`
  background: no-repeat url(${props => props.urlDesktop});
  @media (max-width: 540px) {
    background: no-repeat url(${props => props.urlMobile});
  }
`;

const Page: React.FC<IPageProps> = ({
  loading,
  productsOnCart,
  shop,
  addToCart,
  removeItemToCart,
  substractItemToCart,
}) => {
  const history = useHistory();

  return (
    <>
      <div className="banner-container">
        <TypedHomePageQuery alwaysRender errorPolicy="all" loaderFull>
          {({ data }) => {
            return (
              <>
                {!!data.mainBanner ? (
                  <BannerCarousel>
                    {data.mainBanner?.frames?.map((banner, index) => (
                      <StyledBanner
                        key={index}
                        className="home-page__top-banner"
                        urlDesktop={banner.images[0].url}
                        urlMobile={banner.images[1].url}
                        onClick={() => history.push(banner.link)}
                      />
                    ))}
                  </BannerCarousel>
                ) : (
                  <StyledBanner
                    className="home-page__top-banner"
                    urlDesktop={BannerDesktop}
                    urlMobile={BannerMobile}
                  />
                )}
              </>
            );
          }}
        </TypedHomePageQuery>
      </div>
      <div className="container">
        <script className="structured-data-list" type="application/ld+json">
          {structuredData(shop)}
        </script>
      </div>
      <ProductsFeatured
        productsOnCart={productsOnCart}
        loading={loading}
        addToCart={addToCart}
        removeItemToCart={removeItemToCart}
        substractItemToCart={substractItemToCart}
      />
      <div className="container">
        <div className="home-page__bottom-section">
          <div className="home-page__bottom-banner">
            <p>Llegamos a 12 distritos de Lima ¡en menos de 75 minutos!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
