import MetaWrapper from '@temp/@next/components/atoms/Meta/MetaWrapper';
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from '@temp/@next/components/molecules/ProductTileAUNA/types';
import { useCart, useHomePage } from '@temp/@sdk/react';
import * as React from 'react';
import Page from './Page';
import dynamic from 'next/dynamic';

const Loader = dynamic(
  () => import('@temp/@next/components/atoms/Loader').then((mod) => mod.Loader),
  {
    ssr: false,
  }
);

const NotFound = dynamic(
  () => import('src/@next/pages/NotFoundPage').then((mod) => mod.NotFound),
  {
    ssr: false,
  }
);

export const HomePage: React.FC = () => {
  const {
    items: productsOnCart,
    addItem,
    removeItem,
    subtractItem,
  } = useCart();

  const { data: homePage, loading: homePageLoading } = useHomePage();

  const addToCart: IAddToCartCallback = (product, quantity) => {
    addItem(product, quantity);
  };

  const removeItemToCart: IRemoveItemToCartCallback = (product) => {
    removeItem(product);
  };

  const subtractItemToCart: ISubtractItemToCartCallback = (product) => {
    subtractItem(product);
  };

  if (homePageLoading) {
    return <Loader />;
  }

  if (homePage && homePage === null) {
    return <NotFound />;
  }

  return (
    <MetaWrapper
      meta={{
        description: homePage ? homePage.description : '',
        title: homePage ? homePage.name : '',
      }}
    >
      <div className="fa-bg-neutral-light">
        <Page
          productsOnCart={productsOnCart}
          shop={homePage}
          addToCart={addToCart}
          removeItemToCart={removeItemToCart}
          subtractItemToCart={subtractItemToCart}
        />
      </div>
    </MetaWrapper>
  );
};

export default HomePage;
