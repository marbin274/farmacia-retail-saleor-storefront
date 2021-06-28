import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback
} from "@app/components/molecules/ProductTileAUNA/types";
import { IItems } from "@sdk/api/Cart/types";
import { ModalBackground } from "@temp/@next/components/organisms/ModalBackground/ModalBackground";
import { somosAunaPage } from "@temp/app/routes";
import { ProductsFeatured } from "@temp/components";
import { cndUrl } from "@temp/constants";
import { structuredData } from "@temp/core/SEO/Homepage/structuredData";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { Banner } from "./Banner";
import { HomePage_shop } from "./gqlTypes/HomePage";
import "./scss/index.scss";
import * as S from "./styles";
interface IPageProps {
  banners?: Array<{ link: string | null, desktop: string, mobile: string }>;
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

const imageCoverageDistrictDesktop = `${cndUrl}/media/banner_coverage/home-banner-coverage-delivery.png`;
const imageCoverageDistrictMobile = `${cndUrl}/media/banner_coverage/home-banner-coverage-delivery-mobile.png`;


const Page: React.FC<IPageProps> = ({
  banners,
  loading,
  productsOnCart,
  shop,
  addToCart,
  removeItemToCart,
  subtractItemToCart,
}) => {
  const history = useHistory();
  const [showModal, setShowModal] = React.useState<boolean>(false);

  return (
    <>
      <S.WraperOpenBanner>
        <S.TopImagesContainer>
          <S.TopImageAunaContainer>
            <S.TopImageAuna
              imageDesktop={imageAboutAunaDesktop}
              imageMobile={imageAboutAunaMobile}
              onClick={() => {
                history.push(somosAunaPage);
              }}
            />
          </S.TopImageAunaContainer>
          <S.TopImageDistrictContainer>
            <S.TopImageDistrict
              imageDesktop={imageConverageDistrictDesktop}
              imageMobile={imageConverageDistrictMobile}
              onClick={() => {
                setShowModal(true);
              }}
            />
          </S.TopImageDistrictContainer>
        </S.TopImagesContainer>
      </S.WraperOpenBanner>
      <ModalBackground
        imageDesktop={imageCoverageDistrictDesktop}
        imageMobile={imageCoverageDistrictMobile}
        hide={() => {
          setShowModal(false);
        }}
        show={showModal}
      />
      <Banner
        banners={banners}
        loading={loading}
      />
      <div className="container">
        <script className="structured-data-list" type="application/ld+json">
          {structuredData(shop)}
        </script>

        <div>
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
      </div>
    </>
  );
};

export default Page;
