import "./scss/index.scss";

import * as React from "react";

import { MetaWrapper } from "../../components";
import Page from "./Page";

import { HOME_PAGE_CONF } from "@temp/core/config";
import { TypedHomePageQuery } from "./queries";

const homePageVariables = {
    categoryId: HOME_PAGE_CONF.CATEGORY_ID,
    pageSize: HOME_PAGE_CONF.PAGE_SIZE,
    sortBy: {
        direction: HOME_PAGE_CONF.SORT_DIR,
        field: HOME_PAGE_CONF.SORT_FIELD,
    },
}

// const isEdgeNotEmpty = (prop) => prop && prop.edges && prop.edges.length > 0;

const View: React.FC = () => (
  <div className="home-page container">
      <TypedHomePageQuery
          alwaysRender
          errorPolicy="all"
          loaderFull
          variables={homePageVariables}
      >
      {({ data, loading }) => {

        return (
          <MetaWrapper
            meta={{
              description: data.shop ? data.shop.description : "",
              title: data.shop ? data.shop.name : "",
            }}
          >
              <div className="home-view">
                  <div className="left-banner">
                  </div>
                  <div className="product-list">
                      {data && data.category && data.category && data.products && (
                          <Page
                              loading={loading}
                              products={data.products}
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

export default View;
