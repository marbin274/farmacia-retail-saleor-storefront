import "./scss/index.scss";

import * as React from "react";

import { MetaWrapper } from "../../components";
import Page from "./Page";

import {OrderDirection} from "../../../gqlTypes/globalTypes";
import { TypedHomePageQuery } from "./queries";

const homePageVariables = {
    categoryId: "Q2F0ZWdvcnk6MjA=", // paints category
    pageSize: 20,
    sortBy: {
        direction: OrderDirection.ASC,
        field: "PRICE",
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
        console.log('[HOME] data', data);

        return (
          <MetaWrapper
            meta={{
              description: data.shop ? data.shop.description : "",
              title: data.shop ? data.shop.name : "",
            }}
          >
              <div style={{display: 'grid', gridTemplateColumns: '1fr 4fr', columnGap: '3rem', marginTop: '6.75rem'}}>
                  <div className="left-banner" style={{backgroundColor: '#eee'}}>
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
