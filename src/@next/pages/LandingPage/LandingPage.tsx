import { Loader } from '@components/atoms';
import { NotFound } from '@pages';
import { useLanding } from '@temp/@sdk/react';
import {
  LANDING_COLLECTIONS_PER_PAGE,
  PRODUCTS_PER_PAGE,
} from '@temp/core/config';
import React, { FC } from 'react';
import Page from './Page';
import { Container } from './styles';

type IProps = { slug: string };

export const LandingPage: FC<IProps> = ({ slug }) => {
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
