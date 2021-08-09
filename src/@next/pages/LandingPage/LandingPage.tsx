import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  LANDING_COLLECTIONS_PER_PAGE,
  PRODUCTS_PER_PAGE,
} from "@temp/core/config";
import { Loader, NotFound } from "@temp/components";
import Page from "./Page";
import { Container } from "./styles";
import { useLanding } from "@temp/@sdk/react";

type IProps = RouteComponentProps<{ slug: string }>;

export const LandingPage: FC<IProps> = ({
  match: {
    params: { slug },
  },
}) => {

  const { data, loading } = useLanding({
    collectionsFirst: LANDING_COLLECTIONS_PER_PAGE,
    productsFirst: PRODUCTS_PER_PAGE,
    slug,
  });

  if (loading) {
    return <Loader />;
  }

  if (!data.landing) {
    return (
      <Container>
        <NotFound />
      </Container>
    );
  }

  return <Page landing={data.landing} />;
};

export default LandingPage;
