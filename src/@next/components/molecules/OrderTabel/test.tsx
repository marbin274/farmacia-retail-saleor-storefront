import { mount, shallow } from 'enzyme';
import 'jest-styled-components';
import React from 'react';
import { OrderTabel } from '.';

const ORDERS = [
  {
    node: {
      created: '2019-09-04T10:50:03.994164+00:00',
      customerStatusDisplay: 'Solicitud recibida',
      id: 'T3JkZXI6Nzc=',
      lines: [
        {
          id: 'T3JkZXJMaW5lOjE3Nw==',
          productName: 'Apple Juice',
          thumbnail: {
            alt: '',
            url: 'https://dummyimage.com/600x400/000/fff',
          },
          thumbnail2x: {
            url: 'https://dummyimage.com/600x400/000/fff',
          },
          variant: {
            id: 'UHJvZHVjdFZhcmlhbnQ6MjAz',
            productId: 'UHJvZHVjdDo3Mg==',
          },
        },
      ],
      number: '77',
      sequentialCode: 'DEED6A0E',
      statusDisplay: 'Unfulfilled',
      token: '687f3e43-b198-4c7f-b6e5-75c2c93b3f45',
      total: {
        gross: { amount: 42.91, currency: 'USD' },
        net: { amount: 42.91, currency: 'USD' },
      },
    },
  },
  {
    node: {
      created: '2019-06-10T12:29:54.886836+00:00',
      customerStatusDisplay: 'Solicitud recibida',
      id: 'T3JkZXI6NzY=',

      lines: [
        {
          id: 'T3JkZXJMaW5lOjE3NQ==',
          productName: 'Bean Juice',
          thumbnail: {
            alt: '',
            url: 'https://dummyimage.com/600x400/000/fff',
          },
          thumbnail2x: {
            url: 'https://dummyimage.com/600x400/000/fff',
          },
          variant: {
            id: 'UHJvZHVjdFZhcmlhbnQ6MjIz',
            productId: 'UHJvZHVjdDo3OQ==',
          },
        },
      ],
      number: '76',
      sequentialCode: 'AEED6A0F',
      statusDisplay: 'Fulfilled',
      token: 'c2deea58-00ad-4838-bb7b-0678fd4f1f38',
      total: {
        gross: { amount: 29.24, currency: 'USD' },
        net: { amount: 29.24, currency: 'USD' },
      },
    },
  },
];

(global as any).matchMedia = (media: any) => ({
  addListener: jest.fn(),
  matches: true,
  removeListener: jest.fn(),
});

describe('<OrderTabel />', () => {
  it('exists', () => {
    const wrapper = shallow(<OrderTabel orders={[]} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it('should render passed orders array', () => {
    const wrapper = mount(<OrderTabel orders={ORDERS} />);

    expect(wrapper.text()).toContain('DEED6A0E');
    expect(wrapper.text()).toContain('9/4/2019');
    expect(wrapper.text()).toContain('Solicitud recibida');

    expect(wrapper.text()).toContain('AEED6A0F');
    expect(wrapper.text()).toContain('6/10/2019');
    expect(wrapper.text()).toContain('Solicitud recibida');
  });
});
