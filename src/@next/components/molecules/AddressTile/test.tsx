import { IconButton } from "@components/atoms";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { AddressTile } from ".";

const onEdit = jest.fn();
const onRemove = jest.fn();
const removeDefault = jest.fn();
const setDefault = jest.fn();

const DEFAULT_PROPS = {
  address: {
    city: "Wroclaw",
    companyName: "Mirumee",
    country: {
      code: "PL",
      country: "Poland",
    },
    countryArea: "dolnyslask",
    firstName: "John",
    isDefaultBillingAddress: true,
    isDefaultShippingAddress: true,
    lastName: "Doe",
    phone: "555-5555",
    postalCode: "55-555",
    streetAddress1: "St Street",
    streetAddress2: "Second",
  },
  onEdit,
  onRemove,
  removeDefault,
  setDefault,
};

describe("<AddressTile />", () => {
  it("exists", () => {
    const wrapper = shallow(<AddressTile {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should run onRemove function for clicking on trash button", () => {
    const wrapper = mount(<AddressTile {...DEFAULT_PROPS} />);

    wrapper
      .find(IconButton)
      .last()
      .simulate("click");

    expect(onRemove).toHaveBeenCalled();
  });


  it("should run onEdit function for clicking on edit button", () => {
    const wrapper = mount(<AddressTile {...DEFAULT_PROPS} />);

    wrapper
      .find(IconButton)
      .first()
      .simulate("click");

    expect(onEdit).toHaveBeenCalled();
  });

  it("should run remove setDefault method for clicking on Set default when address is default already", () => {
    const wrapper = mount(<AddressTile {...DEFAULT_PROPS} />);

    wrapper
      .find('[role="default-address"]')
      .first()
      .simulate("click");

    expect(removeDefault).toBeCalled();
  });

  it("should run setDefault method for clicking on Set default", () => {
    const DEFAULT_PROPS_NOT_DEFAULT = {
      ...DEFAULT_PROPS,
      address: {
        ...DEFAULT_PROPS.address,
        isDefaultBillingAddress: false,
        isDefaultShippingAddress: false,
      },
    };

    const wrapper = mount(<AddressTile {...DEFAULT_PROPS_NOT_DEFAULT} />);

    wrapper
      .find('[role="default-address"]')
      .first()
      .simulate("click");

    expect(setDefault).toHaveBeenCalledWith("BILLING");
    expect(setDefault).toHaveBeenCalledWith("SHIPPING");
  });

  it("should present Default address if address is default shipping", () => {
    const wrapper = mount(<AddressTile {...DEFAULT_PROPS} />);
    const setDefaultAddressText = wrapper
      .find('[role="default-address"]')
      .first()
      .find("span")
      .first();

    expect(getComputedStyle(setDefaultAddressText.getDOMNode()).getPropertyValue("color")).toBe("rgb(0, 176, 202)"); // aunaInteractive
  });

});
