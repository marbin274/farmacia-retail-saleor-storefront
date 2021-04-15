import { mount, shallow } from "enzyme";
import React from "react";
import { Input } from "@components/atoms";

import { AddressAutocomplete, IAddressAutocompleteValue } from ".";

const value: IAddressAutocompleteValue = {
  lat: -20.7,
  lng: 14,
  text: "My address",
};

describe("<AddressAutocomplete />", () => {
  it("Renders", () => {
    const wrapper = shallow(<AddressAutocomplete />);
    expect(wrapper.exists());
  });

  it("Renders correct text on input", () => {
    const wrapper = mount(<AddressAutocomplete value={value} />);

    expect(
      wrapper
        .find(Input)
        .at(0)
        .props().value
    ).toBe(value.text);
  });

  it("Call onChangeValue correctly", () => {
    const onChangeValue = jest.fn();
    const wrapper = mount(
      <AddressAutocomplete value={value} onChangeValue={onChangeValue} />
    );

    wrapper.setProps({ value: { text: "new text" } });
    wrapper.prop("onChangeValue")();
    expect(onChangeValue).toHaveBeenCalledTimes(1);
  });
});
