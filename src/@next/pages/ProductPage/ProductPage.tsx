import { useCart, useProductDetails } from '@sdk/react';
import { useDistrictSelected } from '@temp/@next/hooks/useDistrictSelected';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { MetaWrapper, NotFound } from '@temp/components';
import { getGraphqlIdFromDBId, maybe } from '@temp/core/utils';
import { ProductDetails_product } from '@sdk/queries/gqlTypes/ProductDetails';
import Page from './Page';
import { Skeleton } from './skeleton';

const extractMeta = (product: ProductDetails_product) => {
  const productMetas: Array<{ content: string; property: string }> = [
    {
      content: product.pricing.priceRange.start.gross.amount.toString(),
      property: 'product:price:amount',
    },
    {
      content: product.pricing.priceRange.start.gross.currency,
      property: 'product:price:currency',
    },
    {
      content: product.isAvailable ? 'in stock' : 'out off stock',
      property: 'product:isAvailable',
    },
  ];
  if (product.category) {
    productMetas.push({
      content: product.category.name,
      property: 'product:category',
    });
  }
  return {
    custom: productMetas,
    description: product.seoDescription || product.descriptionJson,
    image: maybe(() => product.thumbnail.url, null),
    title: product.name || product.seoTitle,
    type: 'product.item',
    url: window.location.href,
  };
};

export const ProductPage: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
}) => {
  const { addItem, removeItem, subtractItem, items } = useCart();
  const [districtSelected] = useDistrictSelected();
  const productId = getGraphqlIdFromDBId(match.params.id, 'Product');
  const { data: product, loading: productLoading } = useProductDetails({
    id: productId,
    districtId: districtSelected.id,
  });

  if (productLoading) {
    return <Skeleton />;
  }

  if (product && product.id === null) {
    return <NotFound />;
  }

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
};

export default ProductPage;
