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
import BannerDesktop from "../../images/auna/home-banner-top.png";
import BannerMobile from "../../images/auna/home-banner-mob.png";
import { BannerCarousel } from "@temp/@next/components/containers/BannerCarousel";

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
interface IBanner {
  urlDesktop: string | null;
  urlMobile: string | null;
}

const StyledBanner = styled.div<IBanner>`
  background-image: url(${props => props.urlDesktop});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  @media (max-width: 540px) {
    background-image: url(${props => props.urlMobile});
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  @media (max-width: 320px) {
    background-size: 100% 100%;
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

  const redirectTo = ( url: string) => {
    const baseUrlPattern = (/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})*\/?/)
    let result = "";
    const match = baseUrlPattern.exec(url);
    if (match != null) {
      result = match[0];
    }
    if (result.length > 0) {
      url = url.replace(result, "");
    }
    history.push(url)
  }
  return (
    <>
      <div className="banner-container">
        <TypedHomePageQuery alwaysRender errorPolicy="all" loaderFull>
          {({ data }) => {
            return <>
              {
                !!data.mainBanner ? ( <BannerCarousel>
                  {data.mainBanner?.frames?.map((banner, index) =>
                    <StyledBanner
                      key={index}
                      className="home-page__top-banner"
                      urlDesktop={banner.images[0].url}
                      urlMobile={banner.images[1].url}
                      onClick={() => redirectTo(banner.link)}
                    />
                  )
                  }
                </BannerCarousel>) : (<StyledBanner
                    className="home-page__top-banner"
                    urlDesktop={BannerDesktop}
                    urlMobile={BannerMobile}
                  />
                )
              }
            </>
          }}
        </TypedHomePageQuery>
      </div>
      <div className="container">
        <script className="structured-data-list" type="application/ld+json">
          {structuredData(shop)}
        </script>

        <div className="inner-container">
          <div className="home-page__products">
            <ProductsFeatured
              productsOnCart={productsOnCart}
              loading={loading}
              addToCart={addToCart}
              removeItemToCart={removeItemToCart}
              substractItemToCart={substractItemToCart}
            />
          </div>
        </div>
        <div className="container">
          <div className="home-page__bottom-section">
            <div className="home-page__bottom-banner">
              <p>Llegamos a 12 distritos de Lima ¡en menos de 75 minutos!</p>
            </div>
            <div className="home-page__districts-list" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
