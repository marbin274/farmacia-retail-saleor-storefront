import { Input } from "@components/atoms";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { components } from "react-select";
import { AddressForm } from ".";
import { DOCUMENT_NUMBER_CHARACTERS_VALIDATION_MESSAGE, DOCUMENT_NUMBER_REQUIRED, EMAIL_REQUIRED, FULLNAME_REQUIRED, PHONE_REQUIRED, TERMS_AND_CONTIDIONS_REQUIRED } from "../../../utils/schemas.messages";
import { InputSelect, TextField } from "../../molecules";
import { citiesOptions } from "../CheckoutAddress/cities";
import { DISTRITO_REQUIRED, STREET_ADDRESS_1_REQUIRED } from "./adddressForm.schema";
import { CitySelect } from "./AddressFormContent/AddressFormFields";
import { address, countries, wrongDocumentNumber, userAddress, checkoutData } from "./fixtures";
import { IProps } from "./types";


const PROPS: IProps = {
  address,
  citiesOptions,
  countriesOptions: countries,
  errors: [],
  handleSubmit: jest.fn(),
  includeEmail: true,
};

describe("<AddressForm />", () => {
  it("exists", () => {
    const wrapper = shallow(<AddressForm {...PROPS} />);
    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain partial data if provided", () => {
    const wrapper = mount(<AddressForm {...PROPS} />);

    const getField = (n: number) =>
      wrapper
        .find(Input)
        .at(n)
        .prop("value");

    expect(getField(0)).toEqual(PROPS.address?.firstName);
    expect(getField(2)).toEqual(PROPS.address?.email);
    expect(getField(3)).toEqual(PROPS.address?.phone);
    expect(getField(4)).toEqual(PROPS.address?.streetAddress1);
    expect(getField(5)).toEqual(PROPS.address?.streetAddress2);
  });
});

describe("form contain data", () => {
  it("should contain user data only", () => {
    const PROPSCUSTOM: IProps = {
      ...PROPS,
      address: undefined,
      user: userAddress,
    };
    const wrapper = mount(<AddressForm {...PROPSCUSTOM} />);

    const getField = (n: number) =>
      wrapper
        .find(Input)
        .at(n)
        .prop("value");

    expect(getField(0)).toEqual(`${userAddress?.firstName} ${userAddress?.lastName}`);
    expect(getField(1)).toEqual(userAddress?.documentNumber);
    expect(getField(2)).toEqual(userAddress?.email);
    expect(getField(3)).toEqual(userAddress?.addresses?.[0]?.phone);
    expect(getField(4)).toEqual(userAddress?.addresses?.[0]?.streetAddress1);
    expect(getField(5)).toEqual(userAddress?.addresses?.[0]?.streetAddress2);
  });

  it("should contain user data and checkoutdata", () => {
    const PROPSCUSTOM: IProps = {
      ...PROPS,
      address: undefined,
      checkoutData,
      user: userAddress,
    };
    const wrapper = mount(<AddressForm {...PROPSCUSTOM} />);

    const getField = (n: number) =>
      wrapper
        .find(Input)
        .at(n)
        .prop("value");

    expect(getField(0)).toEqual(checkoutData?.shippingAddress.firstName);
    expect(getField(1)).toEqual(checkoutData?.documentNumber);
    expect(getField(2)).toEqual(checkoutData?.email);
    expect(getField(3)).toEqual(checkoutData?.shippingAddress?.phone);
    expect(getField(4)).toEqual(checkoutData?.shippingAddress?.streetAddress1);
    expect(getField(5)).toEqual(checkoutData?.shippingAddress?.streetAddress2);
  });

  it("should contain user data and the checkoutdata contain undefined data", () => {
    const PROPSCUSTOM: IProps = {
      ...PROPS,
      address: undefined,
      checkoutData: {
        token: undefined,
      },
      user: userAddress,
    };
    const wrapper = mount(<AddressForm {...PROPSCUSTOM} />);

    const getField = (n: number) =>
      wrapper
        .find(Input)
        .at(n)
        .prop("value");

    expect(getField(0)).toEqual(`${userAddress?.firstName} ${userAddress?.lastName}`);
    expect(getField(1)).toEqual(userAddress?.documentNumber);
    expect(getField(2)).toEqual(userAddress?.email);
    expect(getField(3)).toEqual(userAddress?.addresses?.[0]?.phone);
    expect(getField(4)).toEqual(userAddress?.addresses?.[0]?.streetAddress1);
    expect(getField(5)).toEqual(userAddress?.addresses?.[0]?.streetAddress2);
  });

});

describe("form messages error when not contain data", () => {

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

});
