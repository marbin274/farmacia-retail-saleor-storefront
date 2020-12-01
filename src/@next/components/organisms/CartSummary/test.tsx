import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { CartSummaryRow } from "@components/molecules";
import { CartSummary } from ".";
import { DEFAULT_PROPS } from "./fixtures";

const money = {
  gross: {
    amount: 123,
    culture: "es-PE",
    currency: "PEN",
  },
  net: {
    amount: 100,
    culture: "es-PE",
    currency: "PEN",
  },
};

describe("<CartSummary />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <CartSummary />
      </MemoryRouter>
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("should show promo price", () => {
    const wrapper = mount(<CartSummary promoCode={money} />);

    expect(wrapper.text()).toContain("123");
  });

  it("should show shipping price", () => {
    const wrapper = mount(<CartSummary shipping={money} />);
    expect(wrapper.text()).toContain("123");
  });

  it("should show total price", () => {
    const wrapper = mount(<CartSummary total={money} />);

    expect(wrapper.text()).toContain("123");
  });

  it("should show correct number of product rows", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <CartSummary {...DEFAULT_PROPS} />
      </MemoryRouter>
    );

    expect(
      wrapper
        .find(CartSummary)
        .dive()
        .find(CartSummaryRow).length
    ).toEqual(DEFAULT_PROPS.products.length);
  });
});
