import { IAvailableShippingMethods } from '@temp/@sdk/api/Checkout/types';

const shippingMethods: IAvailableShippingMethods = [
  {
    __typename: 'ShippingMethod',
    id: '1',
    methodType: {
      __typename: 'ShippingMethodType',
      code: 'EXPRESS',
    },
    name: '75 minutos aproximadamente',
    price: {
      __typename: 'Money',
      amount: 32,
      culture: 'es-PE',
      currency: 'USD',
    },
    scheduleDates: [],
    subtitle: 'subTitle',
  },
  {
    __typename: 'ShippingMethod',
    id: '2',
    methodType: {
      __typename: 'ShippingMethodType',
      code: 'EXPRESS',
    },
    name: '75 minutos aproximadamente',
    price: {
      __typename: 'Money',
      amount: 64,
      culture: 'es-PE',
      currency: 'USD',
    },
    scheduleDates: [],
    subtitle: 'subTitle',
  },
];

export const DEFAULT_PROPS = {
  shippingMethods,
};
