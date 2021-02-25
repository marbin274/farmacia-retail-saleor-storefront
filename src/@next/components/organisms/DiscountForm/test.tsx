import { mount, shallow } from "enzyme";
import { Input, Button } from "@components/atoms";
import "jest-styled-components";
import React from "react";

import { DiscountForm } from ".";
import { IDiscountFormData } from "./types";

const mockDiscountData: IDiscountFormData = {
  promoCode: "ABCD",
  voucherType: "shipping",
};

describe("<DiscountForm />", () => {
  it("exists", () => {
    const wrapper = shallow(<DiscountForm />);

    expect(wrapper.exists()).toEqual(true);
  });
});

describe("Discount form with discount data", () => {
  const wrapper = mount(<DiscountForm discount={mockDiscountData} />);

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
  const wrapper = mount(<DiscountForm />);

  it("not exist promo code div", () => {
    const div = wrapper.find(".promoCode").exists();
    expect(div).toBe(false);
  });

  it("exist input field", () => {
    const div = wrapper.find(Input).exists();
    expect(div).toBe(true);
  });

  it("exist button", () => {
    const div = wrapper.find(Button).exists();
    expect(div).toBe(true);
  });
});
