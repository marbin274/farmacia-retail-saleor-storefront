import * as React from "react";

import { useCart } from "@sdk/react";
import { HOME_PAGE_CONF } from "@temp/core/config";

import { MetaWrapper } from "../../components";
import Page from "./Page";
import "./scss/index.scss";

import { ISimpleProduct } from "@app/types/IProduct";
import { IAddToCartCallback } from "@components/molecules/ProductTileAUNA/types";
import { HomePage_products, HomePageVariables } from "./gqlTypes/HomePage";
import { TypedHomePageQuery } from "./queries";
import TagManager from "react-gtm-module";

const homePageVariables: HomePageVariables = {
  pageSize: HOME_PAGE_CONF.PAGE_SIZE,
  sortBy: {
    direction: HOME_PAGE_CONF.SORT_DIR,
    field: HOME_PAGE_CONF.SORT_FIELD,
  },
};

const View: React.FC = () => {
  const { items, addItem } = useCart();
  const extractNodes = (productEdges: HomePage_products) => productEdges.edges.map(edge => edge.node);

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
          const productList: ISimpleProduct[] = extractNodes(data.products);
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
                {data && data.products && (
                  <Page
                    addToCart={addToCart}
                    loading={loading}
                    items={items}
                    products={productList}
                    shop={data.shop}
                  />
                )}
              </div>
            </MetaWrapper>
          );
        }}
      </TypedHomePageQuery>
    </div>
  );
};

export default View;
