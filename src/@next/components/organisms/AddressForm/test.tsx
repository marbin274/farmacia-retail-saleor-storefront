import { removeCountryCodeInPhoneNumber } from '@temp/@next/utils/addresForm';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { AddressForm } from '.';
import {
  address,
  checkoutData,
  countries,
  DISTRICT_1,
  DISTRICT_2,
  userAddress,
} from './fixtures';
import { IProps } from './types';
import {
  DOCUMENT_NUMBER_REQUIRED,
  EMAIL_REQUIRED,
  FULLNAME_REQUIRED,
  PHONE_REQUIRED,
  TERMS_AND_CONTIDIONS_REQUIRED,
} from '@temp/@next/utils/schemasMessages';
import {
  DISTRITO_REQUIRED,
  STREET_ADDRESS_1_REQUIRED,
} from './adddressFormSchema';

const PROPS: IProps = {
  address,
  districtsOptions: [DISTRICT_1, DISTRICT_2],
  countriesOptions: countries,
  errors: [],
  handleSubmit: jest.fn(),
  includeEmail: true,
  user: null,
};

const DOWN_ARROW = { keyCode: 40 };

describe('<AddressForm />', () => {
  it('exists', () => {
    render(<AddressForm {...PROPS} />);
    expect(screen.getByTestId('address-form')).toBeInTheDocument();
  });

  it('should contain partial data if provided', () => {
    render(<AddressForm {...PROPS} />);
    const inputs = screen.getAllByRole('input-field');
    expect(inputs[0]).toHaveValue(PROPS.address?.firstName);
    expect(inputs[2]).toHaveValue(PROPS.address?.email);
    expect(inputs[3]).toHaveValue(PROPS.address?.phone);
    expect(inputs[4]).toHaveValue(PROPS.address?.streetAddress1);
    expect(inputs[5]).toHaveValue(PROPS.address?.streetAddress2);
  });
});

describe('form contain data', () => {
  it('should contain user phone only', () => {
    const PROPSCUSTOM: IProps = {
      ...PROPS,
      address: undefined,
      user: userAddress,
    };
    render(<AddressForm {...PROPSCUSTOM} />);

    const inputs = screen.getAllByRole('input-field');

    expect(inputs[0]).toHaveValue(
      removeCountryCodeInPhoneNumber(
        userAddress?.defaultShippingAddress?.phone || ''
      )
    );
    expect(inputs[1]).toHaveValue(
      userAddress?.defaultShippingAddress?.streetAddress1
    );
    expect(inputs[2]).toHaveValue(
      userAddress?.defaultShippingAddress?.streetAddress2
    );
  });

  it('should contain user phone and checkoutdata', () => {
    const PROPSCUSTOM: IProps = {
      ...PROPS,
      address: undefined,
      checkoutData,
      user: userAddress,
    };
    render(<AddressForm {...PROPSCUSTOM} />);

    const inputs = screen.getAllByRole('input-field');

    expect(inputs[0]).toHaveValue(
      removeCountryCodeInPhoneNumber(checkoutData?.shippingAddress?.phone)
    );
    expect(inputs[1]).toHaveValue(
      checkoutData?.shippingAddress?.streetAddress1
    );
    expect(inputs[2]).toHaveValue(
      checkoutData?.shippingAddress?.streetAddress2
    );
  });

  it('should contain user phone and the checkoutdata contain undefined data', () => {
    const PROPSCUSTOM: IProps = {
      ...PROPS,
      address: undefined,
      checkoutData: {
        token: undefined,
      },
      user: userAddress,
    };
    render(<AddressForm {...PROPSCUSTOM} />);

    const inputs = screen.getAllByRole('input-field');

    expect(inputs[0]).toHaveValue(
      removeCountryCodeInPhoneNumber(
        userAddress?.defaultShippingAddress?.phone || ''
      )
    );
    expect(inputs[1]).toHaveValue(
      userAddress?.defaultShippingAddress?.streetAddress1
    );
    expect(inputs[2]).toHaveValue(
      userAddress?.defaultShippingAddress?.streetAddress2
    );
  });

  it('should not contain data', async () => {
    const PROPSERRORS: IProps = {
      ...PROPS,
      address: undefined,
    };

    render(<AddressForm {...PROPSERRORS} />);
    const inputs = screen.getAllByRole('input-field');
    const inputsCheck = screen.getAllByRole('input-checkfield');

    fireEvent.click(screen.getByRole('select'));

    await Promise.all(
      [...inputsCheck, ...inputs].map(async (inputText) => {
        inputText.focus();
        fireEvent.click(inputText);
        fireEvent.click(inputText);
        fireEvent.keyDown(inputText, DOWN_ARROW);
        await new Promise((resolve) => setTimeout(resolve, 500));
        inputText.blur();
      })
    );

    const addressForm = screen.getByTestId('address-form');
    expect(addressForm.textContent).toContain(FULLNAME_REQUIRED);
    expect(addressForm.textContent).toContain(DOCUMENT_NUMBER_REQUIRED);
    expect(addressForm.textContent).toContain(EMAIL_REQUIRED);
    expect(addressForm.textContent).toContain(PHONE_REQUIRED);
    expect(addressForm.textContent).toContain(TERMS_AND_CONTIDIONS_REQUIRED);
    expect(addressForm.textContent).toContain(STREET_ADDRESS_1_REQUIRED);
    expect(addressForm.textContent).toContain(DISTRITO_REQUIRED);
  });
});
