import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback
} from "@temp/@next/components/molecules/ProductTileAUNA/types";
import { useCart } from "@temp/@sdk/react";
import { MetaWrapper } from "@temp/components";
import BannerMobile from "images/auna/home-banner-mob.png";
import BannerDesktop from "images/auna/home-banner-top.png";
import * as React from "react";
import Page from "./Page";
import { TypedHomePageQuery } from "./queries";
import "./scss/index.scss";


const View: React.FC = () => {
  const {
    items: productsOnCart,
    addItem,
    removeItem,
    subtractItem,
  } = useCart();

  return (
    <div className="home-page">
      <TypedHomePageQuery
        alwaysRender
        errorPolicy="all"
        loaderFull
      >
        {({ data, loading }) => {
          const addToCart: IAddToCartCallback = (product, quantity) => {
            addItem(product, quantity);
          };

          const removeItemToCart: IRemoveItemToCartCallback = product => {
            removeItem(product);
          };

          const subtractItemToCart: ISubtractItemToCartCallback = product => {
            subtractItem(product);
          };

          const banners: Array<{ link: string | null, desktop: string, mobile: string }> =
            data?.mainBanner?.frames ?
              data?.mainBanner.frames.map((banner): { link: string | null, desktop: string, mobile: string } => {
                const bannerDesktop = banner.images?.find(
                  it => it.screenType === "desktop"
                );
                const bannerMobile = banner.images?.find(
                  it => it.screenType === "mobile"
                );
                const result: { link: string | null, desktop: string, mobile: string } = {
                  link: banner.link,
                  desktop: bannerDesktop?.url || '',
                  mobile: bannerMobile?.url || '',
                }
                return result;
              })
              : [{
                link: null,
                desktop: BannerDesktop,
                mobile: BannerMobile,
              }];

          return (
            <MetaWrapper
              meta={{
                description: data.shop ? data.shop.description : "",
                title: data.shop ? data.shop.name : "",
              }}
            >
              <div className="home-view fa-bg-neutral-light">
                <Page
                  banners={banners}
                  loading={loading}
                  productsOnCart={productsOnCart}
                  shop={data.shop}
                  addToCart={addToCart}
                  removeItemToCart={removeItemToCart}
                  subtractItemToCart={subtractItemToCart}
                />
              </div>
            </MetaWrapper>
          );
        }}
      </TypedHomePageQuery>
    </div>
  );
};

export default View;
