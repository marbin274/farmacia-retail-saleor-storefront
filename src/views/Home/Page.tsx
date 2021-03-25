import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubstractItemToCartCallback
} from "@app/components/molecules/ProductTileAUNA/types";
import { IItems } from "@sdk/api/Cart/types";
import { BannerCarousel } from "@temp/@next/components/containers/BannerCarousel";
import { structuredData } from "@temp/core/SEO/Homepage/structuredData";
import * as React from "react";
import { useHistory } from "react-router-dom";
import BannerMobile from "images/auna/home-banner-mob.png";
import BannerDesktop from "images/auna/home-banner-top.png";
import { ProductsFeatured } from "./";
import { HomePage_shop } from "./gqlTypes/HomePage";
import { TypedHomePageQuery } from "./queries";
import { cndUrl } from '@temp/constants';
import { ModalBackground } from '@temp/@next/components/organisms/ModalBackground/ModalBackground';
import * as S from "./styles";
import "./scss/index.scss";

interface IPageProps {
  loading: boolean;
  productsOnCart: IItems;
  shop: HomePage_shop;
  addToCart: IAddToCartCallback;
  removeItemToCart: IRemoveItemToCartCallback;
  substractItemToCart: ISubstractItemToCartCallback;
}

const Page: React.FC<IPageProps> = ({
  loading,
  productsOnCart,
  shop,
  addToCart,
  removeItemToCart,
  substractItemToCart,
}) => {
  const history = useHistory();
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const imageCoverageDistrictDesktop = `${cndUrl}/media/banner_coverage/home-banner-coverage-delivery.png`
  const imageCoverageDistrictMobile = `${cndUrl}/media/banner_coverage/home-banner-coverage-delivery-mobile.png`
  const imageOpenBannerDesktop = `${cndUrl}/media/banner_coverage/top-banner-district.png`;
  const imageOpenBannerMobile = `${cndUrl}/media/banner_coverage/top-banner-district-mobile.png`;



  const redirectTo = (url?: string) => {
    if (!url) { return; };
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
      <S.WraperOpenBanner onClick={()=>{ setShowModal(true) }}>
        <S.TopImageDistrictBannerOpen
          imageDesktop={imageOpenBannerDesktop}
          imageMobile= {imageOpenBannerMobile} >
        </S.TopImageDistrictBannerOpen>    
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
                  {data.mainBanner?.frames?.map((banner, index) =>
                    <div key={index} onClick={() => { redirectTo(banner.link) }}>
                      <img src={banner.images[0].url} className="banner-image desktop" />
                      <img src={banner.images[1].url} className="banner-image mobile" />
                    </div>
                  )
                  }
                </BannerCarousel>) : (<div>
                  <img src={BannerDesktop} className="banner-image desktop" />
                  <img src={BannerMobile} className="banner-image mobile" />
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
              substractItemToCart={substractItemToCart}
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
