import { Loader } from '@app/components/atoms';
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from '@app/components/molecules/ProductTileAUNA/types';
import { useCart, useCategoryDetails } from '@sdk/react';
import { MetaWrapper, NotFound } from '@temp/components';
import { getGraphqlIdFromDBId } from '@temp/core/utils';
import { convertToFilterSideBar } from '@temp/core/utils/filters';
import { SORT_OPTIONS } from '@app/utils/sorts';
import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import Page from './Page';

type ViewProps = RouteComponentProps<{
  id: string;
  slug: string;
}>;

export const CategoryPage: FC<ViewProps> = ({ match }) => {
  const categoryId = getGraphqlIdFromDBId(match.params.id, 'Category');
  const { data: categoryDetails, loading: categoryLoading } =
    useCategoryDetails({ id: categoryId });
  const { addItem, items, subtractItem } = useCart();
  const addToCart: IAddToCartCallback = (product, quantity) => {
    addItem(product, quantity);
  };

  const removeItemToCart: IRemoveItemToCartCallback = (product) => {
    subtractItem(product);
  };

  const subtractItemToCart: ISubtractItemToCartCallback = (product) => {
    subtractItem(product);
  };

  if (categoryLoading) {
    return <Loader />;
  }

  if (categoryDetails && categoryDetails.category === null) {
    return <NotFound />;
  }

  return (
    <MetaWrapper
      meta={{
        description: categoryDetails.category.seoDescription,
        title: categoryDetails.category.seoTitle,
        type: 'product.category',
      }}
    >
      <Page
        attributes={convertToFilterSideBar(categoryDetails.attributes)}
        category={categoryDetails.category}
        sortOptions={SORT_OPTIONS}
        addToCart={addToCart}
        items={items}
        removeItemToCart={removeItemToCart}
        subtractItemToCart={subtractItemToCart}
      />
    </MetaWrapper>
  );
};

export default CategoryPage;
