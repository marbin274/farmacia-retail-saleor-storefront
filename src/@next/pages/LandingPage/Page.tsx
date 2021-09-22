import React, { FC } from 'react';
import * as S from './styles';
import { Breadcrumbs } from '@temp/@next/components/organisms/BreadcrumbsLegacy';
import { ProductsCollection } from '@components/organisms';
import { BannerCarousel } from '@app/components/containers/BannerCarousel';
import { Landing_landing } from '@sdk/queries/gqlTypes/Landing';
import { maybe } from '@temp/core/utils';
import { ISimpleProduct } from '@sdk/types/IProduct';
import { useRouter } from 'next/router';

type IProps = {
  landing: Landing_landing;
};

const LandingPage: FC<IProps> = ({ landing }) => {
  const router = useRouter();
  return (
    <S.Container>
      <S.BannerContainer>
        <BannerCarousel>
          {landing.banner.frames?.map((frame) => {
            const bannerDesktop = frame.images?.find(
              (it) => it.screenType === 'desktop'
            );
            const bannerMobile = frame.images?.find(
              (it) => it.screenType === 'mobile'
            );

            return (
              <div key={frame.id}>
                {bannerDesktop && (
                  <S.BannerImageDesktop src={bannerDesktop.url} />
                )}
                {bannerMobile && <S.BannerImageMobile src={bannerMobile.url} />}
              </div>
            );
          })}
        </BannerCarousel>
      </S.BannerContainer>
      <S.ContainerWrapper>
        <Breadcrumbs
          breadcrumbs={[{ link: router.pathname, label: landing.title }]}
          breadcrumbsAlwaysVisible
        />
        <S.CollectionsContainer>
          <S.Collections>
            {landing.collections?.edges?.map(({ node: collection }) => {
              const products: ISimpleProduct[] = maybe(
                () =>
                  collection.products.edges.map((product) => ({
                    ...product.node,
                  })),
                []
              );

              return (
                <ProductsCollection
                  key={collection.id}
                  name={collection.name}
                  products={products}
                />
              );
            })}
          </S.Collections>
        </S.CollectionsContainer>
      </S.ContainerWrapper>
    </S.Container>
  );
};

export default LandingPage;
