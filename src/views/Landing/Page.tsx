import React, { FC } from "react";
import * as S from "./styles";
import { Breadcrumbs, ProductsCollection } from "@temp/components";
import { BannerCarousel } from "@temp/@next/components/containers/BannerCarousel";
import { Landing_landing } from "./gqlTypes/Landing";
import { maybe } from "@temp/core/utils";
import { ISimpleProduct } from "@temp/@next/types/IProduct";

type IProps = {
  landing: Landing_landing;
};

const LandingPage: FC<IProps> = ({ landing }) => {
  return (
    <S.Container>
      <S.BannerContainer>
        <BannerCarousel>
          {landing.banner.frames?.map(frame => {
            const bannerDesktop = frame.images?.find(
              it => it.screenType === "desktop"
            );
            const bannerMobile = frame.images?.find(
              it => it.screenType === "mobile"
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
      <div className="container">
        <Breadcrumbs
          breadcrumbs={[{ link: location.pathname, value: landing.title }]}
        />
        <S.CollectionsContainer>
          <S.Collections>
            {landing.collections?.edges?.map(({ node: collection }) => {
              const products: ISimpleProduct[] = maybe(
                () =>
                  collection.products.edges.map(product => ({
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
      </div>
    </S.Container>
  );
};

export default LandingPage;
