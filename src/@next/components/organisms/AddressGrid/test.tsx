import { shallow } from 'enzyme';
import React from 'react';
import { AddressGrid } from '.';
import { IProps } from './types';

const DEFAULT_PROPS: IProps = {
  addresses: [
    {
      __typename: 'Address',
      id: '123',
      alias: 'My Home',
      city: 'Wroclaw',
      companyName: 'Mirumee',
      country: {
        __typename: 'CountryDisplay',
        code: 'PL',
        country: 'Poland',
      },
      countryArea: 'dolnyslask',
      district: {
        __typename: 'District',
        id: '',
        name: '',
      },
      firstName: 'John',
      isDefaultBillingAddress: false,
      isDefaultShippingAddress: true,
      lastName: 'Doe',
      phone: '555-5555',
      postalCode: '55-555',
      streetAddress1: 'St Street',
      streetAddress2: 'Second',
      latitude: 1,
      longitude: -1,
    },
  ],
  onClickAdd: () => undefined,
  onClickEdit: () => undefined,
  onClickDelete: () => undefined,
  onClickSetDefault: () => undefined,
};

describe('<AddressGrid />', () => {
  it('exists', () => {
    const wrapper = shallow(<AddressGrid {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });
});
