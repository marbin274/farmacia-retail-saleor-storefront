import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';
import { AddressTile } from '.';
import { IProps } from './types';

const DEFAULT_PROPS: IProps = {
  address: {
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
  onClickEdit: () => undefined,
  onClickDelete: () => undefined,
  onClickSetDefault: () => undefined,
};

describe('<AddressTile />', () => {
  it('exists', () => {
    render(<AddressTile {...DEFAULT_PROPS} />);
  });

  it('should run onRemove function for clicking on trash button', () => {
    const onClickDelete = jest.fn();
    render(<AddressTile {...DEFAULT_PROPS} onClickDelete={onClickDelete} />);
    const deleteOption = screen.getByTestId('delete-button');
    fireEvent.click(deleteOption);
    expect(onClickDelete).toHaveBeenCalledTimes(1);
  });

  it('should run onEdit function for clicking on edit button', () => {
    const onClickEdit = jest.fn();
    render(<AddressTile {...DEFAULT_PROPS} onClickEdit={onClickEdit} />);
    const editOption = screen.getByTestId('edit-button');
    fireEvent.click(editOption);
    expect(onClickEdit).toHaveBeenCalledTimes(1);
  });

  it('should run remove setDefault method for clicking on Set default when address is default already', () => {
    const onClickSetDefault = jest.fn();
    render(
      <AddressTile {...DEFAULT_PROPS} onClickSetDefault={onClickSetDefault} />
    );
    const defaultAddress = screen.getByTestId('default-address');
    fireEvent.click(defaultAddress);
    expect(onClickSetDefault).toBeCalled();
  });
});
