import "./scss/index.scss";

import * as React from "react";

import { MetaWrapper } from "../../components";
import Page from "./Page";
import { TypedHomePageQuery } from "./queries";

const fakeProducts = {
    edges:
    [
        {
            node: {
                category: {
                    id: 'Q2F0ZWdvcnk6MjI=',
                    name: 'Categpry 1',
                },
                id: 'UHJvZHVjdDo2Mw==',
                name: 'Red paint',
                pricing : {
                    onSale: false,
                    priceRange: {
                        start: {gross: {amount: 16, currency: "USD"}},
                        stop: {gross: {amount: 16, currency: "USD"}},
                    },
                },
                thumbnail : {
                    url: 'http://localhost:8000/media/__sized__/products/saleordemoproduct_paints_03-thumbnail-255x255.png',
                },
            },
        },

        {
            node: {
                category: {
                    id: 'Q2F0ZWdvcnk6MjI=',
                    name: 'Categpry 1',
                },
                id: 'UHJvZHVjdDo2Mw==',
                name: 'Red paint',
                pricing : {
                    onSale: false,
                    priceRange: {
                        start: {gross: {amount: 16, currency: "USD"}},
                        stop: {gross: {amount: 16, currency: "USD"}},
                    },
                },
                thumbnail : {
                    url: 'http://localhost:8000/media/__sized__/products/saleordemoproduct_paints_03-thumbnail-255x255.png',
                },
            },
        },

        {
            node: {
                category: {
                    id: 'Q2F0ZWdvcnk6MjI=',
                    name: 'Categpry 1',
                },
                id: 'UHJvZHVjdDo2Mw==',
                name: 'Red paint',
                pricing : {
                    onSale: false,
                    priceRange: {
                        start: {gross: {amount: 16, currency: "USD"}},
                        stop: {gross: {amount: 16, currency: "USD"}},
                    },
                },
                thumbnail : {
                    url: 'http://localhost:8000/media/__sized__/products/saleordemoproduct_paints_03-thumbnail-255x255.png',
                },
            },
        },

        {
            node: {
                category: {
                    id: 'Q2F0ZWdvcnk6MjI=',
                    name: 'Categpry 1',
                },
                id: 'UHJvZHVjdDo2Mw==',
                name: 'Red paint',
                pricing : {
                    onSale: false,
                    priceRange: {
                        start: {gross: {amount: 16, currency: "USD"}},
                        stop: {gross: {amount: 16, currency: "USD"}},
                    },
                },
                thumbnail : {
                    url: 'http://localhost:8000/media/__sized__/products/saleordemoproduct_paints_03-thumbnail-255x255.png',
                },
            },
        },

    ],
};

const View: React.FC = () => (
  <div className="home-page">
    <TypedHomePageQuery alwaysRender displayLoader={false} errorPolicy="all">
      {({ data, loading }) => {
        return (
          <MetaWrapper
            meta={{
              description: data.shop ? data.shop.description : "",
              title: data.shop ? data.shop.name : "",
            }}
          >
            <Page
              loading={loading}
              backgroundImage={
                data.shop &&
                data.shop.homepageCollection &&
                data.shop.homepageCollection.backgroundImage
              }
              categories={data.categories}
              products={fakeProducts}
              shop={data.shop}
            />
          </MetaWrapper>
        );
      }}
    </TypedHomePageQuery>
  </div>
);

export default View;
