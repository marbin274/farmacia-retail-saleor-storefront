import * as React from "react";
import { HOME_PAGE_CONF } from "@temp/core/config";

import { MetaWrapper } from "@temp/components";
import Page from "./Page";
import "./scss/index.scss";
import { TypedHomePageQuery } from "./queries";
import TagManager from "react-gtm-module";
import { HomePageVariables } from "./gqlTypes/HomePage";
import { useCart } from "@temp/@sdk/react";
import { IAddToCartCallback } from "@temp/@next/components/molecules/ProductTileAUNA/types";

const homePageVariables: HomePageVariables = {
  pageSize: HOME_PAGE_CONF.PAGE_SIZE,
  sortBy: {
    direction: HOME_PAGE_CONF.SORT_DIR,
    field: HOME_PAGE_CONF.SORT_FIELD,
  },
};

const View: React.FC = () => {
  const { items: productsOnCart, addItem } = useCart();
  return (
    <div className="home-page">
      <TypedHomePageQuery
        alwaysRender
        errorPolicy="all"
        loaderFull
        variables={homePageVariables}
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
