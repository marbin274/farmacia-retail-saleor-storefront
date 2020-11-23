import * as React from "react";

import { useCart } from "@sdk/react";
import { HOME_PAGE_CONF } from "@temp/core/config";

import { MetaWrapper } from "../../components";
import Page from "./Page";
import "./scss/index.scss";

import { ISimpleProduct } from "@app/types/IProduct";
import { IAddToCartCallback } from "@components/molecules/ProductTileAUNA/types";
import {HomePage_products, HomePageVariables} from "./gqlTypes/HomePage";
import { TypedHomePageQuery } from "./queries";

const homePageVariables:HomePageVariables = {
    pageSize: HOME_PAGE_CONF.PAGE_SIZE,
    sortBy: {
        direction: HOME_PAGE_CONF.SORT_DIR,
        field: HOME_PAGE_CONF.SORT_FIELD,
    },
}

const View: React.FC = () => {
  const { addItem } = useCart();
  const extractNodes = (productEdges: HomePage_products) => productEdges.edges.map(edge => edge.node);

  return (
  <div className="home-page container">
      <TypedHomePageQuery
          alwaysRender
          errorPolicy="all"
          loaderFull
          variables={homePageVariables}
      >
      {({ data, loading }) => {
        const productList: ISimpleProduct[] = extractNodes(data.products) ;

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
                  <div className="home-banner">
                      &nbsp;
                  </div>
                  <div className="product-list">
                      {data && data.products && (
                          <Page
                              addToCart={addToCart}
                              loading={loading}
                              products={productList}
                              shop={ data.shop }
                          />
                      )}
                  </div>
              </div>
          </MetaWrapper>
        );
      }}
    </TypedHomePageQuery>
  </div>
  );
};

export default View;
