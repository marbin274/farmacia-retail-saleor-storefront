import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from '@app/components/molecules/ProductTileAUNA/types';
import { ProductsFeatured } from '@components/organisms/ProductsFeatured';
import { IItems } from '@sdk/api/Cart/types';
import { HomePage_shop } from '@sdk/queries/gqlTypes/HomePage';
import { ModalBackground } from '@temp/@next/components/organisms/ModalBackground/ModalBackground';
import { somosAunaPage } from '@temp/app/routes';
import { cndUrl } from '@temp/core/constants';
import { structuredData } from '@temp/core/SEO/Homepage/structuredData';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Banner } from './Banner';
import * as S from './styles';

interface IPageProps {
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
  productsOnCart,
  shop,
  addToCart,
  removeItemToCart,
  subtractItemToCart,
}) => {
  const router = useRouter();
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [showFeatures, setShowFeatures] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTimeout(() => {
      setShowFeatures(true);
    }, 500);
  }, []);

  return (
    <>
      <S.WraperOpenBanner>
        <S.TopImagesContainer>
          <S.TopImageAunaContainer>
            <S.TopImageAuna
              imageDesktop={imageAboutAunaDesktop}
              imageMobile={imageAboutAunaMobile}
              onClick={() => {
                router.push(somosAunaPage);
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
      <Banner />
      <S.ProductsFeaturedWrapper>
        <script className="structured-data-list" type="application/ld+json">
          {structuredData(shop)}
        </script>

        <div className="fa-pt-8 fa-px-0 fa-pb-16">
          {showFeatures && (
            <ProductsFeatured
              productsOnCart={productsOnCart}
              addToCart={addToCart}
              removeItemToCart={removeItemToCart}
              subtractItemToCart={subtractItemToCart}
            />
          )}
        </div>
      </S.ProductsFeaturedWrapper>
    </>
  );
};

export default Page;
