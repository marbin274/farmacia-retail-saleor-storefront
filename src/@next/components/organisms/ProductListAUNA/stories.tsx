import { storiesOf } from '@storybook/react';
import React from 'react';
import { ProductListAUNA } from '.';
import { products, productsOnCart } from './fixtures';

storiesOf('@components/organisms/ProductListAUNA', module)
  .addParameters({ component: ProductListAUNA })
  .add('default', () => (
    <ProductListAUNA
      products={products}
      productsOnCart={productsOnCart}
      canLoadMore={true}
      loading={false}
      page={1}
      pageSize={12}
      total={1}
    />
  ));
