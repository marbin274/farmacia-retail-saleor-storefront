import { removeCountryCodeInPhoneNumber } from '@temp/@next/utils/addresForm';
import {
  DOCUMENT_NUMBER_CHARACTERS_VALIDATION_MESSAGE,
  DOCUMENT_NUMBER_REQUIRED,
  EMAIL_REQUIRED,
  FULLNAME_REQUIRED,
  PHONE_REQUIRED,
  TERMS_AND_CONTIDIONS_REQUIRED,
} from '@temp/@next/utils/schemasMessages';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';
import { AddressForm } from '.';
import { checkoutData, userAddress, wrongDocumentNumber } from './fixtures';
import { DISTRITO_REQUIRED, STREET_ADDRESS_1_REQUIRED } from './schema';

jest.mock('@temp/@next/pages/CheckoutPage/hooks', () => ({
  useCheckoutContext: () => ({
    shouldUnselectDistrict: false,
    setShouldUnselectDistrict: jest.fn(),
  }),
}));

jest.mock('@app/hooks', () => ({
  useFeaturePlugins: () => ({
    lastMileActive: false,
  }),
  useDistrictSelected: () => ['', () => jest.fn()],
}));

jest.mock('@sdk/react', () => ({
  useCheckout: () => ({
    clearCheckout: jest.fn(),
    setPrime: jest.fn(),
  }),
  useCart: () => ({
    addItem: jest.fn(),
    items: [],
    removeItem: jest.fn(),
    subtractItem: jest.fn(),
  }),
  usePotentialShippingMethods: () => ({
    data: [],
    loaing: false,
  }),
}));

const ref: React.RefObject<HTMLFormElement> = React.createRef();

const PROPS = {
  formRef: ref,
  isLastMileActive: false,
  handleSubmit: jest.fn(),
};

describe('<AddressForm />', () => {
  it('should contain partial data if provided', () => {
    render(
      <AddressForm {...PROPS} checkout={checkoutData} user={userAddress} />
    );
    expect(
      screen.queryByTestId('addressFormFirstName')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('addressFormEmail')).not.toBeInTheDocument();
    expect(
      (screen.getByTestId('addressFormPhone') as HTMLInputElement).value
    ).toBe(
      removeCountryCodeInPhoneNumber(checkoutData?.shippingAddress.phone || '')
    );
    expect(
      (screen.getByTestId('addressAutocomplete') as HTMLInputElement).value
    ).toBe(checkoutData?.shippingAddress.streetAddress1);
    expect(
      (screen.getByTestId('addressFormStreetAddress2') as HTMLInputElement)
        .value
    ).toBe(checkoutData?.shippingAddress.streetAddress2);
  });
});

describe('form contain data', () => {
  it('should contain checkoutdata only', () => {
    render(<AddressForm {...PROPS} checkout={checkoutData} user={undefined} />);
    expect(
      (screen.getByTestId('addressFormFirstName') as HTMLInputElement).value
    ).toBe(checkoutData?.shippingAddress.firstName);
    expect(
      (screen.getByTestId('addressFormDNI') as HTMLInputElement).value
    ).toBe(checkoutData?.documentNumber);
    expect(
      (screen.getByTestId('addressFormEmail') as HTMLInputElement).value
    ).toBe(checkoutData?.email);
    expect(
      (screen.getByTestId('addressFormPhone') as HTMLInputElement).value
    ).toBe(
      removeCountryCodeInPhoneNumber(checkoutData?.shippingAddress.phone || '')
    );
    expect(
      (screen.getByTestId('addressAutocomplete') as HTMLInputElement).value
    ).toBe(checkoutData?.shippingAddress.streetAddress1);
    expect(
      (screen.getByTestId('addressFormStreetAddress2') as HTMLInputElement)
        .value
    ).toBe(checkoutData?.shippingAddress.streetAddress2);
  });

  it('should contain user data only', () => {
    render(<AddressForm {...PROPS} checkout={undefined} user={userAddress} />);
    expect(
      screen.queryByTestId('addressFormFirstName')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('addressFormDNI')).not.toBeInTheDocument();
    expect(screen.queryByTestId('addressFormEmail')).not.toBeInTheDocument();
    expect(
      (screen.getByTestId('addressFormPhone') as HTMLInputElement).value
    ).toBe(
      removeCountryCodeInPhoneNumber(
        userAddress?.defaultShippingAddress.phone || ''
      )
    );
    expect(
      (screen.getByTestId('addressAutocomplete') as HTMLInputElement).value
    ).toBe(userAddress?.defaultShippingAddress.streetAddress1);
    expect(
      (screen.getByTestId('addressFormStreetAddress2') as HTMLInputElement)
        .value
    ).toBe(userAddress?.defaultShippingAddress.streetAddress2);
  });

  it('should contain user data and checkoutdata', () => {
    render(
      <AddressForm {...PROPS} checkout={checkoutData} user={userAddress} />
    );
    expect(
      screen.queryByTestId('addressFormFirstName')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('addressFormDNI')).not.toBeInTheDocument();
    expect(screen.queryByTestId('addressFormEmail')).not.toBeInTheDocument();
    expect(
      (screen.getByTestId('addressFormPhone') as HTMLInputElement).value
    ).toBe(
      removeCountryCodeInPhoneNumber(checkoutData?.shippingAddress.phone || '')
    );
    expect(
      (screen.getByTestId('addressAutocomplete') as HTMLInputElement).value
    ).toBe(checkoutData?.shippingAddress.streetAddress1);
    expect(
      (screen.getByTestId('addressFormStreetAddress2') as HTMLInputElement)
        .value
    ).toBe(checkoutData?.shippingAddress.streetAddress2);
  });
});

describe('form messages error when not contain data', () => {
  it('should not contain data', async () => {
    render(<AddressForm {...PROPS} checkout={undefined} user={undefined} />);
    const addressform = screen.getByRole('form');
    fireEvent.submit(addressform);

    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(screen.getByText(FULLNAME_REQUIRED)).toBeDefined();
    expect(screen.getByText(DOCUMENT_NUMBER_REQUIRED)).toBeDefined();
    expect(screen.getByText(EMAIL_REQUIRED)).toBeDefined();
    expect(screen.getByText(PHONE_REQUIRED)).toBeDefined();
    expect(screen.getByText(TERMS_AND_CONTIDIONS_REQUIRED)).toBeDefined();
    expect(screen.getByText(STREET_ADDRESS_1_REQUIRED)).toBeDefined();
    expect(screen.getByText(DISTRITO_REQUIRED)).toBeDefined();
  });

  it('should provided a document number with spaces', async () => {
    const checkoutDataError = {
      ...checkoutData,
      documentNumber: wrongDocumentNumber,
    };

    render(
      <AddressForm {...PROPS} checkout={checkoutDataError} user={undefined} />
    );
    const addressform = screen.getByRole('form');
    fireEvent.submit(addressform);

    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(
      screen.getByText(DOCUMENT_NUMBER_CHARACTERS_VALIDATION_MESSAGE)
    ).toBeDefined();
  });
});
