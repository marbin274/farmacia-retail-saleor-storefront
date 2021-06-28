import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CheckoutShipping } from ".";
import { DEFAULT_PROPS } from "./fixtures";

describe("<CheckoutShipping />", () => {
  it("renders shipping methods", () => {
    const selectShippingMethod = jest.fn();
    const wrapper = mount(
      <CheckoutShipping
        {...DEFAULT_PROPS}
        selectShippingMethod={selectShippingMethod}
      />
    );

    expect(wrapper.exists()).toEqual(true);
    const renderedText = wrapper.text();
    
    expect(renderedText.includes(DEFAULT_PROPS.shippingMethods[0].name)).toBe(
      true
    );
    expect(renderedText.includes(DEFAULT_PROPS.shippingMethods[1].name)).toBe(
      true
    );
  });

});
