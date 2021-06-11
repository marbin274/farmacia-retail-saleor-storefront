import { mount, shallow } from "enzyme";
import { InputField, Button } from "@farmacia-retail/farmauna-components";
import "jest-styled-components";
import React from "react";

import { DiscountForm } from ".";
import { IDiscountFormData } from "./types";

const DEFAULT_PROPS = {
  setReRenderNiubiz: () => {
    jest.fn();
  },
  setShowLabelCupon: () => {
    jest.fn();
  },
};

const mockDiscountData: IDiscountFormData = {
  promoCode: "ABCD",
  voucherType: "shipping",
};

describe("<DiscountForm />", () => {
  it("exists", () => {
    const wrapper = shallow(<DiscountForm {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });
});

describe("Discount form with discount data", () => {
  const wrapper = mount(
    <DiscountForm {...DEFAULT_PROPS} discount={mockDiscountData} />
  );

  it("exist promo code", () => {
    const div = wrapper.find(".promoCode").exists();
    expect(div).toBe(true);
  });

  it("not exist button", () => {
    const div = wrapper.find(Button).exists();
    expect(div).toBe(false);
  });
});

describe("Discount form without discount data", () => {
  const wrapper = mount(<DiscountForm {...DEFAULT_PROPS} />);

  it("not exist promo code div", () => {
    const div = wrapper.find(".promoCode").exists();
    expect(div).toBe(false);
  });

  it("exist input field", () => {
    const div = wrapper.find(InputField).exists();
    expect(div).toBe(true);
  });

  it("exist button", () => {
    const div = wrapper.find(Button).exists();
    expect(div).toBe(true);
  });
});
