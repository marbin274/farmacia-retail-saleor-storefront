import { IAddToCartCallback } from "@temp/@next/components/molecules/ProductTileAUNA/types";
import { useCart } from "@temp/@sdk/react";
import { MetaWrapper } from "@temp/components";
import * as React from "react";
import TagManager from "react-gtm-module";
import Page from "./Page";
import { TypedHomePageQuery } from "./queries";
import "./scss/index.scss";

const View: React.FC = () => {
  const { items: productsOnCart, addItem } = useCart();
  return (
    <div className="home-page">
      <TypedHomePageQuery
        alwaysRender
        errorPolicy="all"
        loaderFull
      >
        {({ data, loading }) => {
          TagManager.initialize({
            gtmId: data.shop.analyticsConfig.tagManagerId,
          });
          const addToCart: IAddToCartCallback = (product, quantity) => {
            addItem(product, quantity);
          };
          return (
            <MetaWrapper
              meta={{
                description: data.shop ? data.shop.description : "",
                title: data.shop ? data.shop.name : "",
              }}
            >
              <div className="home-view">
                <Page
                  loading={loading}
                  productsOnCart={productsOnCart}
                  shop={data.shop}
                  addToCart={addToCart}
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
