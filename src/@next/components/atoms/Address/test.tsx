import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Address } from '.';
import { IAddressProps } from './types';

const DEFAULT_PROPS: IAddressProps = {
  address: {
    city: 'Wroclaw',
    country: {
      code: 'PL',
      country: 'Poland',
    },
    firstName: 'John',
    lastName: 'Doe',
    phone: '555-5555',
    streetAddress1: 'St Street',
    streetAddress2: 'Second',
    latitude: 1,
    longitude: -1,
    alias: 'My alias',
  },
};

describe('<Address />', () => {
  it('render correct information', () => {
    render(<Address {...DEFAULT_PROPS} />);

    const streetAddress1 = screen.getByText(
      DEFAULT_PROPS.address.streetAddress1
    );
    expect(streetAddress1).toBeDefined();

    const alias = screen.getByText(DEFAULT_PROPS.address.alias);
    expect(alias).toBeDefined();

    const streetAddress2 = screen.getByText(
      DEFAULT_PROPS.address.streetAddress2
    );
    expect(streetAddress2).toBeDefined();

    const city = screen.getByText(DEFAULT_PROPS.address.city);
    expect(city).toBeDefined();
  });

  it('render information without alias', () => {
    const props = { ...DEFAULT_PROPS };
    props.address.alias = null;
    render(<Address {...DEFAULT_PROPS} />);
    const alias = screen.getByTestId('address-title');
    expect(alias.textContent).toBe(
      `${DEFAULT_PROPS.address.firstName} ${DEFAULT_PROPS.address.lastName}`
    );
  });
  it('render information without alias and without name', () => {
    const props = { ...DEFAULT_PROPS };
    props.address.alias = null;
    props.address.firstName = null;
    render(<Address {...DEFAULT_PROPS} />);
    const alias = screen.getByTestId('address-title');
    expect(alias.textContent).toBe('Mi dirección');
  });

  it('render address with error', () => {
    render(<Address {...DEFAULT_PROPS} hasError />);
    const addressDescription = screen.getByTestId('address-description');
    expect(addressDescription).toHaveClass('fa-text-error-medium');
  });

  it('render address without error', () => {
    render(<Address {...DEFAULT_PROPS} />);
    const addressDescription = screen.getByTestId('address-description');
    expect(addressDescription).not.toHaveClass('fa-text-error-medium');
  });
});
