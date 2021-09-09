import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

import { CheckoutAddress } from '.';
import { ANONYMOUS_USER_PROPS } from './fixtures';
import { removeCountryCodeInPhoneNumber } from '@temp/@next/utils/addresForm';

describe('<CheckoutAddress />', () => {
  it('renders address form', () => {
    const setShippingAddress = jest.fn();
    render(
      <CheckoutAddress
        {...ANONYMOUS_USER_PROPS}
        checkoutData={{
          email: ANONYMOUS_USER_PROPS.checkoutAddress.email,
          shippingAddress: {
            ...ANONYMOUS_USER_PROPS.checkoutAddress,
            latitude: ANONYMOUS_USER_PROPS.checkoutAddress.latitude as number,
            longitude: ANONYMOUS_USER_PROPS.checkoutAddress.longitude as number,
          },
          token: '',
        }}
        setShippingAddress={setShippingAddress}
      />
    );

    const address = ANONYMOUS_USER_PROPS.checkoutAddress;
    const inputs = screen.getAllByRole('input-field');

    expect(inputs[0]).toHaveValue(address.firstName);
    expect(inputs[1]).toHaveValue('');
    expect(inputs[2]).toHaveValue(address.email);
    expect(inputs[3]).toHaveValue(
      removeCountryCodeInPhoneNumber(address.phone || '')
    );
    expect(inputs[4]).toHaveValue(address.streetAddress1);
    expect(inputs[5]).toHaveValue(address.streetAddress2);
  });
});
