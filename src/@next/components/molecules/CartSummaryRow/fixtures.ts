import { IProps } from './types';

export const DEFAULT_PROPS: IProps = {
  canAddToCart: true,
  isOnSale: false,
  name: 'The Great Square Table',
  price: {
    gross: {
      amount: 123,
      culture: 'en-US',
      currency: 'USD',
    },
    net: {
      amount: 100,
      culture: 'en-US',
      currency: 'USD',
    },
  },
  quantity: 2,
  sku: 'TGS-122A',
  thumbnail: {
    alt: 'Product image',
    url: '',
  },
};

// TODO: We need to use the same Money type definition, we found at least three of them so that's
// generating some weird jest issues like https://github.com/facebook/jest/issues/1740
// when we make this story/test with peruvian culture/currency
// we can get more issue details on this link https://stackoverflow.com/questions/39786514/jest-snapshot-different-when-testing-through-ci-vs-locally
