import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";

import { useCart } from "@sdk/react";

import {
  ErrorPage,
  MetaWrapper,
  NotFound,
  OfflinePlaceholder,
} from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { getGraphqlIdFromDBId, maybe } from "../../core/utils";
import { ProductDetails_product } from "./gqlTypes/ProductDetails";
import Page from "./Page";
import { TypedProductDetailsQuery } from "./queries";
import { useDistrictSelected } from "@temp/@next/hooks/useDistrictSelected";

const canDisplay = (product: ProductDetails_product) =>
  maybe(
    () =>
      !!product.descriptionJson &&
      !!product.name &&
      !!product.pricing &&
      !!product.variants
  );
const extractMeta = (product: ProductDetails_product) => {
  const productMetas: Array<{ content: string; property: string }> = [
    {
      content: product.pricing.priceRange.start.gross.amount.toString(),
      property: "product:price:amount",
    },
    {
      content: product.pricing.priceRange.start.gross.currency,
      property: "product:price:currency",
    },
    {
      content: product.isAvailable ? "in stock" : "out off stock",
      property: "product:isAvailable",
    },
  ];
  if (product.category) {
    productMetas.push({
      content: product.category.name,
      property: "product:category",
    });
  }
  return {
    custom: productMetas,
    description: product.seoDescription || product.descriptionJson,
    image: maybe(() => product.thumbnail.url, null),
    title: product.name || product.seoTitle,
    type: "product.item",
    url: window.location.href,
  };
};

const View: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const { addItem, removeItem, subtractItem, items } = useCart();
  const [districtSelected] = useDistrictSelected();
  return (
    <TypedProductDetailsQuery
      loaderFull
      variables={{
        id: getGraphqlIdFromDBId(match.params.id, "Product"),
        districtId: districtSelected.id,
      }}
      errorPolicy="all"
      key={match.params.id}
    >
      {({ data }) => (
        <NetworkStatus>
          {isOnline => {
            const { product } = data;
            if (product === null) {
              return <NotFound />;
            }

            if (!product.pricing) {
              return <ErrorPage />;
            }

            if (canDisplay(product)) {
              return (
                <MetaWrapper meta={extractMeta(product)}>
                  <Page
                    product={product}
                    add={addItem}
                    remove={removeItem}
                    subtract={subtractItem}
                    items={items}
                  />
                </MetaWrapper>
              );
            }
            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
          }}
        </NetworkStatus>
      )}
    </TypedProductDetailsQuery>
  );
};

export default View;
