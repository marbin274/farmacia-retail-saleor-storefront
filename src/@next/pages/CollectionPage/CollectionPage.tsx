import { SortOptions } from '@app/pages/SearchPage/Page';
import { SORT_OPTIONS } from '@app/utils/sorts';
import { Loader, MetaWrapper } from '@components/atoms';
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from '@temp/@next/components/molecules/ProductTileAUNA/types';
import { useCart, useCollectionCategories } from '@temp/@sdk/react';
import { NotFound } from '@pages';
import { COLLECTION_CATEGORY_FILTER_LABEL } from '@temp/core/config';
import { getGraphqlIdFromDBId, maybe } from '@temp/core/utils';
import { convertToFilterSideBar } from '@temp/core/utils/filters';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Page from './Page';

type ViewProps = RouteComponentProps<{
  id: string;
}>;

export const CollectionPage: React.FC<ViewProps> = ({ match }) => {
  const { addItem, items, subtractItem } = useCart();

  const collectionId = getGraphqlIdFromDBId(match.params.id, 'Collection');
  const { data: collectionCategories, loading: collectionCategoriesLoading } =
    useCollectionCategories({ id: collectionId });

  const categoryOptions = React.useMemo((): SortOptions => {
    return [{ label: COLLECTION_CATEGORY_FILTER_LABEL, value: null }].concat(
      maybe(
        () =>
          collectionCategories?.collection?.categories?.edges?.map(
            ({ node }) => ({ label: node.name, value: node.id })
          ),
        []
      )
    );
  }, [collectionCategories]);

  const addToCart: IAddToCartCallback = (product, quantity) => {
    addItem(product, quantity);
  };

  const removeItemToCart: IRemoveItemToCartCallback = (product) => {
    subtractItem(product);
  };

  const subtractItemToCart: ISubtractItemToCartCallback = (product) => {
    subtractItem(product);
  };

  if (collectionCategoriesLoading) {
    return <Loader />;
  }

  if (collectionCategories && collectionCategories.collection === null) {
    return <NotFound />;
  }

  return (
    <MetaWrapper
      meta={{
        description: collectionCategories.collection.seoDescription,
        title: collectionCategories.collection.seoTitle,
        type: 'product.collection',
      }}
    >
      <Page
        attributes={convertToFilterSideBar(collectionCategories.attributes)}
        categoryOptions={categoryOptions}
        collection={collectionCategories.collection}
        items={items}
        sortOptions={SORT_OPTIONS}
        addToCart={addToCart}
        removeItemToCart={removeItemToCart}
        subtractItemToCart={subtractItemToCart}
      />
    </MetaWrapper>
  );
};

export default CollectionPage;
