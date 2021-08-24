import React from 'react';
import { shallow } from 'enzyme';
import { ProductTileAUNA } from '@temp/@next/components/molecules';
import { ProductsCollection, IProductsCollectionProps } from '.';
import { Title } from './styles';

jest.mock('@temp/@sdk/react', () => ({
  useCart: () => ({
    addItem: jest.fn(),
    items: [],
    removeItem: jest.fn(),
    subtractItem: jest.fn(),
  }),
}));

const props: IProductsCollectionProps = {
  name: 'My landing page',
  products: [
    {
      attributes: [
        {
          __typename: 'SelectedAttribute',
          attribute: {
            __typename: 'Attribute',
            id: 'QXR0cmlidXRlOjI1',
            name: 'factor',
          },
          values: [
            {
              __typename: 'AttributeValue',
              id: 'QXR0cmlidXRlVmFsdWU6ODI=',
              name: '1',
            },
          ],
        },
        {
          __typename: 'SelectedAttribute',
          attribute: {
            __typename: 'Attribute',
            id: 'QXR0cmlidXRlOjI2',
            name: 'limit-max',
          },
          values: [
            {
              __typename: 'AttributeValue',
              id: 'QXR0cmlidXRlVmFsdWU6MTA2',
              name: '3',
            },
          ],
        },
      ],
      category: {
        id: 'Q2F0ZWdvcnk6Mzky',
        name: 'CYBER',
      },
      id: 'UHJvZHVjdDozOTE2',
      name: 'Agua Micelar Sensibio H2O Bioderma 500 ml',
      pricing: {
        onSale: true,
        priceRange: {
          start: {
            gross: {
              amount: 79.9,
              culture: 'es-PE',
              currency: 'PEN',
            },
            net: {
              amount: 79.9,
              culture: 'es-PE',
              currency: 'PEN',
            },
          },
          stop: {
            gross: {
              amount: 79.9,
              culture: 'es-PE',
              currency: 'PEN',
            },
            net: {
              amount: 79.9,
              culture: 'es-PE',
              currency: 'PEN',
            },
          },
        },
        priceRangeUndiscounted: {
          start: {
            gross: {
              amount: 126.2,
              culture: 'es-PE',
              currency: 'PEN',
            },
            net: {
              amount: 126.2,
              culture: 'es-PE',
              currency: 'PEN',
            },
          },
          stop: {
            gross: {
              amount: 126.2,
              culture: 'es-PE',
              currency: 'PEN',
            },
            net: {
              amount: 126.2,
              culture: 'es-PE',
              currency: 'PEN',
            },
          },
        },
      },
      thumbnail: {
        alt: '',
        url: 'https://my-site/30009651_SENSIBIO_H2O_SOL-thumbnail-255x255-70.jpg',
      },
      thumbnail2x: {
        url: 'https://my-site/30009651_SENSIBIO_H2O_SOL-thumbnail-510x510-70.jpg',
      },
    },
    {
      attributes: [],
      category: {
        id: 'Q2F0ZWdvcnk6Mzky',
        name: 'CYBER',
      },
      id: 'UHJvZHVjdDo0Nzgx',
      name: 'Alcohol 70% con atomizador Frasco 1000 ml',
      pricing: {
        onSale: true,
        priceRange: {
          start: {
            gross: {
              amount: 8.9,
              culture: 'es-PE',
              currency: 'PEN',
            },
            net: {
              amount: 8.9,
              culture: 'es-PE',
              currency: 'PEN',
            },
          },
          stop: {
            gross: {
              amount: 8.9,
              culture: 'es-PE',
              currency: 'PEN',
            },
            net: {
              amount: 8.9,
              culture: 'es-PE',
              currency: 'PEN',
            },
          },
        },
        priceRangeUndiscounted: {
          start: {
            gross: {
              amount: 12.9,
              culture: 'es-PE',
              currency: 'PEN',
            },
            net: {
              amount: 12.9,
              culture: 'es-PE',
              currency: 'PEN',
            },
          },
          stop: {
            gross: {
              amount: 12.9,
              culture: 'es-PE',
              currency: 'PEN',
            },
            net: {
              amount: 12.9,
              culture: 'es-PE',
              currency: 'PEN',
            },
          },
        },
      },
      thumbnail: {
        alt: '',
        url: 'https://my-site/alcohol_atomizador-thumbnail-255x255.png',
      },
      thumbnail2x: {
        url: 'https://my-site/alcohol_atomizador-thumbnail-510x510.png',
      },
    },
  ],
};

describe('<ProductsCollection />', () => {
  it('renders', () => {
    const wrapper = shallow(<ProductsCollection {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders name', () => {
    const wrapper = shallow(<ProductsCollection {...props} />);
    expect(wrapper.find(Title).text()).toBe(props.name);
  });

  it('renders product cards', () => {
    const wrapper = shallow(<ProductsCollection {...props} />);
    expect(wrapper.find(ProductTileAUNA).length).toBe(2);
  });
});
