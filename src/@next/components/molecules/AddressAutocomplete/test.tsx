import { mount, shallow } from "enzyme";
import React from "react";
import { InputField } from "@farmacia-retail/farmauna-components";

import { AddressAutocomplete, IAddressAutocompleteValue } from ".";

const value: IAddressAutocompleteValue = {
  lat: -20.7,
  lng: 14,
  text: "My address",
};

describe("<AddressAutocomplete />", () => {
  it("Renders", () => {
    const wrapper = shallow(<AddressAutocomplete placeholder='' />);
    expect(wrapper.exists());
  });

  it("Renders correct text on input", () => {
    const wrapper = mount(<AddressAutocomplete placeholder='' value={value} />);

    expect(
      wrapper
        .find(InputField)
        .at(0)
        .props().value
    ).toBe(value.text);
  });

  it("Call onChangeValue correctly", () => {
    const onChangeValue = jest.fn();
    const wrapper = mount(
      <AddressAutocomplete value={value} placeholder='' onChangeValue={onChangeValue} />
    );

    wrapper.setProps({ value: { text: "new text" } });
    wrapper.prop("onChangeValue")();
    expect(onChangeValue).toHaveBeenCalledTimes(1);
  });
});
