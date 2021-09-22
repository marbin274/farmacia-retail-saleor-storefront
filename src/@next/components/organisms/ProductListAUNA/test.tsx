import { mount, shallow } from 'enzyme';
import 'jest-styled-components';
import React from 'react';
import { ProductListAUNA } from '.';
import { products, productsOnCart } from './fixtures';
import './matchMedia.mock';

jest.mock('@temp/libraries/optimizely/hooks', () => ({
  useAddToCartButtonVariable: () => 'Agregar',
  useShowPersonalizedCollection: () => ({ enable: false, variationKey: '' }),
}));

jest.mock('@temp/libraries/optimizely/tracks', () => ({
  trackAddToCart: jest.fn(),
}));

describe('<ProductList />', () => {
  it('exists', () => {
    const wrapper = shallow(
      <ProductListAUNA
        products={products}
        productsOnCart={productsOnCart}
        canLoadMore={true}
        loading={false}
        onLoadMore={jest.fn()}
        page={1}
        pageSize={12}
        total={1}
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it('show loading', () => {
    const wrapper = mount(
      <ProductListAUNA
        products={products}
        productsOnCart={productsOnCart}
        canLoadMore={true}
        loading={true}
        onLoadMore={jest.fn()}
        page={1}
        pageSize={12}
        total={1}
      />
    );

    expect(wrapper.text()).not.toContain('More +');
  });
});
