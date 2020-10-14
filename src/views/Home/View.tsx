import "./scss/index.scss";

import * as React from "react";

import { MetaWrapper } from "../../components";
import Page from "./Page";

// import { TypedHomePageQuery } from "./queries";
import {TypedCategoryProductsQuery} from "@temp/views/Category/queries";

const emptyResult = { edges: []};

const categoryVariables = {
    id: "Q2F0ZWdvcnk6MjA=", // paints
    pageSize: 20,
    sortBy: {
        direction: "ASC",
        field: "PRICE",
    },
}

const isEdgeNotEmpty = (prop) => prop && prop.edges && prop.edges.length > 0;

const View: React.FC = () => (
  <div className="home-page container">
    {/*<TypedHomePageQuery alwaysRender displayLoader={false} errorPolicy="all">*/}

      <TypedCategoryProductsQuery
          variables={categoryVariables}
          errorPolicy="all"
          loaderFull
      >
      {({ data, loading }) => {
        console.log('[HOME] data.category, data.products:', data.category, data.products);

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
                              backgroundImage= {null}
                              products={data.products}
                              shop={ emptyResult }
                          />
                      )}
                  </div>
              </div>
          </MetaWrapper>
        );
      }}
    </TypedCategoryProductsQuery>
    {/*</TypedHomePageQuery>*/}
  </div>
);

export default View;
