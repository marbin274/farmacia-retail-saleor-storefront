import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  LANDING_COLLECTIONS_PER_PAGE,
  PRODUCTS_PER_PAGE,
} from "@temp/core/config";
import { NotFound } from "@temp/components";
import Page from "./Page";
import { TypedLandingQuery } from "./queries";
import { Container } from "./styles";

type IProps = RouteComponentProps<{ slug: string }>;

const LandingView: FC<IProps> = ({
  match: {
    params: { slug },
  },
}) => {
  return (
    <TypedLandingQuery
      loaderFull
      variables={{
        collectionsFirst: LANDING_COLLECTIONS_PER_PAGE,
        productsFirst: PRODUCTS_PER_PAGE,
        slug,
      }}
      errorPolicy="all"
    >
      {({ data }) => {
        if (!data.landing) {
          return (
            <Container>
              <NotFound />
            </Container>
          );
        }

        return <Page landing={data.landing} />;
      }}
    </TypedLandingQuery>
  );
};

export default LandingView;
