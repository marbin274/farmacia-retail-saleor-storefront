import "./matchMedia.mock";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { CartSummaryRow, CartResume } from "@components/molecules";
import { CartSummary } from ".";
import { DEFAULT_PROPS, product } from "./fixtures";

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
        <CartSummary {...DEFAULT_PROPS} />
      </MemoryRouter>
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("should show count one product", () => {
    const wrapper = mount(
      <CartSummary
        onClickHandle={jest.fn()}
        activeStepIndex={DEFAULT_PROPS.activeStepIndex}
        products={[{ ...product, quantity: 1 }]}
      />
    );
    expect(wrapper.text()).toContain("Tu carrito1");
  });

  it("should show total count products", () => {
    const wrapper = mount(<CartSummary {...DEFAULT_PROPS} />);
    expect(wrapper.text()).toContain("Tu carrito6");
  });

  it("should show subtotal price", () => {
    const wrapper = mount(
      <CartSummary
        onClickHandle={jest.fn()}
        activeStepIndex={DEFAULT_PROPS.activeStepIndex}
        subtotal={money}
      />
    );
    expect(wrapper.text()).toContain("Tu carrito0");
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

  it("should show cart resume", () => {
    const wrapper = mount(
      <MemoryRouter>
        <CartSummary {...DEFAULT_PROPS} />
      </MemoryRouter>
    );

    expect(wrapper.find(CartResume).length).toEqual(1);
  });
});
