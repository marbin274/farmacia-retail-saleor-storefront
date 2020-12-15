import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Input } from "@components/atoms";

import { AddressForm } from ".";
import { address, countries, documentNumber, errors } from "./fixtures";

const PROPS = {
  address,
  countriesOptions: countries,
  documentNumber,
  errors: [],
  handleSubmit: jest.fn(),
  includeEmail: true,
};

const ERRORS = { errors };

describe("<AddressForm />", () => {
  it("exists", () => {
    const wrapper = shallow(<AddressForm {...PROPS} />);
    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain error provided as prop", () => {
    const wrapper = mount(<AddressForm {...PROPS} {...ERRORS} />);

    expect(wrapper.text()).toContain(ERRORS.errors[0].message);
  });

  it("should contain partial data if provided", () => {
    const wrapper = mount(<AddressForm {...PROPS} />);

    const getField = (n: number) =>
      wrapper
        .find(Input)
        .at(n)
        .prop("value");

    expect(getField(0)).toEqual(PROPS.address.firstName);
    // expect(getField(1)).toEqual(PROPS.documentNumber);
    expect(getField(2)).toEqual(PROPS.address.email);
    expect(getField(3)).toEqual(PROPS.address.phone);
    expect(getField(4)).toEqual(PROPS.address.streetAddress1);
    expect(getField(5)).toEqual(PROPS.address.streetAddress2);
  });
});
