import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback
} from "@app/components/molecules/ProductTileAUNA/types";
import { IItems } from "@sdk/api/Cart/types";
import { BannerCarousel } from "@temp/@next/components/containers/BannerCarousel";
import { ModalBackground } from '@temp/@next/components/organisms/ModalBackground/ModalBackground';
import { somosAunaPage } from "@temp/app/routes";
import { ProductsFeatured } from "@temp/components";
import { cndUrl } from '@temp/constants';
import { structuredData } from "@temp/core/SEO/Homepage/structuredData";
import BannerMobile from "images/auna/home-banner-mob.png";
import BannerDesktop from "images/auna/home-banner-top.png";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { HomePage_shop } from "./gqlTypes/HomePage";
import { TypedHomePageQuery } from "./queries";
import "./scss/index.scss";
import * as S from "./styles";

interface IPageProps {
  loading: boolean;
  productsOnCart: IItems;
  shop: HomePage_shop;
  addToCart: IAddToCartCallback;
  removeItemToCart: IRemoveItemToCartCallback;
  subtractItemToCart: ISubtractItemToCartCallback;
}

const imageAboutAunaMobile = `${cndUrl}/media/banner_coverage/about-auna-mobile.png`;
const imageAboutAunaDesktop = `${cndUrl}/media/banner_coverage/about-auna-desktop.png`;
const imageConverageDistrictMobile = `${cndUrl}/media/banner_coverage/coverage-district-mobile.png`;
const imageConverageDistrictDesktop = `${cndUrl}/media/banner_coverage/coverage-district-desktop.png`;


const imageCoverageDistrictDesktop = `${cndUrl}/media/banner_coverage/home-banner-coverage-delivery.png`
const imageCoverageDistrictMobile = `${cndUrl}/media/banner_coverage/home-banner-coverage-delivery-mobile.png`
const baseUrlPattern = (/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})*\/?/)

const Page: React.FC<IPageProps> = ({
  loading,
  productsOnCart,
  shop,
  addToCart,
  removeItemToCart,
  subtractItemToCart,
}) => {
  const history = useHistory();
  const [showModal, setShowModal] = React.useState<boolean>(false);


  const redirectTo = (url?: string) => {
    if (!url) { return; };
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
      <S.WraperOpenBanner>
        <S.TopImagesContainer>
          <S.TopImageItem
            imageDesktop={imageAboutAunaDesktop}
            imageMobile={imageAboutAunaMobile}
            aboutauna
            onClick={()=>{history.push(somosAunaPage)}}
          />
          <S.TopImageItem
            imageDesktop={imageConverageDistrictDesktop}
            imageMobile={imageConverageDistrictMobile}
            onClick={() => { setShowModal(true) }}
          />
        </S.TopImagesContainer>
      </S.WraperOpenBanner>
      <ModalBackground
        imageDesktop={imageCoverageDistrictDesktop}
        imageMobile={imageCoverageDistrictMobile}
        hide={() => { setShowModal(false) }}
        show={showModal}
      />
      <div className="banner-container">
        <TypedHomePageQuery alwaysRender errorPolicy="all" loaderFull>
          {({ data }) => {
            return <>
              {
                !!data.mainBanner ? (<BannerCarousel>
                  {data.mainBanner?.frames?.map((banner, index) => {
                    const bannerDesktop = banner.images?.find(it => it.screenType === "desktop");
                    const bannerMobile = banner.images?.find(it => it.screenType === "mobile");
                    return (
                      <div key={index} onClick={() => { redirectTo(banner.link) }}>
                        {bannerDesktop && <img src={bannerDesktop.url} className="banner-image desktop"  alt="banner desktop" />}
                        {bannerMobile && <img src={bannerMobile.url} className="banner-image mobile" alt="banner mobile" />}
                      </div>
                    );
                  }
                  )
                  }
                </BannerCarousel>) : (<div>
                  <img src={BannerDesktop} className="banner-image desktop"  alt="banner desktop" />
                  <img src={BannerMobile} className="banner-image mobile"   alt="banner mobile"/>
                </div>
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
              subtractItemToCart={subtractItemToCart}
            />
          </div>
        </div>
        <div className="container">
          <div className="home-page__bottom-section">
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
