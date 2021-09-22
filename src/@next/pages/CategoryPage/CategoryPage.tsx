import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from '@app/components/molecules/ProductTileAUNA/types';
import { SORT_OPTIONS } from '@app/utils/sorts';
import { Loader, MetaWrapper } from '@components/atoms';
import { useCart, useCategoryDetails } from '@sdk/react';
import { NotFound } from '@pages';
import { getGraphqlIdFromDBId } from '@temp/core/utils';
import { convertToFilterSideBar } from '@temp/core/utils/filters';
import React, { FC } from 'react';
import Page from './Page';

export const CategoryPage: FC<{ id: string }> = ({ id }) => {
  const categoryId = getGraphqlIdFromDBId(id, 'Category');
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
