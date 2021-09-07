import { removeCountryCodeInPhoneNumber } from '@temp/@next/utils/addresForm';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { AddressForm } from '.';
import { address, checkoutData, countries, userAddress } from './fixtures';
import { IProps } from './types';

const PROPS: IProps = {
  address,
  districtsOptions: ['Miraflores', 'Surquillo'],
  countriesOptions: countries,
  errors: [],
  handleSubmit: jest.fn(),
  includeEmail: true,
  user: null,
};

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
});

// FIXME: enzyme no soposrta useEffect - Validar usando testing Library
/*describe("form messages error when not contain data", () => {

  it("should not contain data", async () => {
    const PROPSERRORS: IProps = {
      ...PROPS,
      address: undefined,
    };

    const wrapper = mount(<AddressForm {...PROPSERRORS} />);

    wrapper.find(CitySelect).find(InputSelect).find("input").simulate("focus");
    wrapper.find(CitySelect).find(InputSelect).find(components.Option).at(0).simulate('click');
    await new Promise(resolve => setTimeout(resolve, 500));
    const texts = wrapper.render().text();

    expect(texts).toContain(FULLNAME_REQUIRED);
    expect(texts).toContain(DOCUMENT_NUMBER_REQUIRED);
    expect(texts).toContain(EMAIL_REQUIRED);
    expect(texts).toContain(PHONE_REQUIRED);
    expect(texts).toContain(TERMS_AND_CONTIDIONS_REQUIRED);
    expect(texts).toContain(STREET_ADDRESS_1_REQUIRED);
    expect(texts).toContain(DISTRITO_REQUIRED);
  });

  it("should provided a document number with spaces", async () => {
    const PROPSERRORS: IProps = {
      ...PROPS,
      checkoutData: {
        documentNumber: wrongDocumentNumber,
        token: '',
      },
    };
    const wrapper = mount(<AddressForm {...PROPSERRORS} />);
    wrapper.find(CitySelect).find(InputSelect).find("input").simulate("focus");
    wrapper.find(CitySelect).find(InputSelect).find(components.Option).at(0).simulate('click');
    await new Promise(resolve => setTimeout(resolve, 500));
    expect(wrapper.find(TextField).at(1).render().text()).toContain(DOCUMENT_NUMBER_CHARACTERS_VALIDATION_MESSAGE);
  });

});*/
