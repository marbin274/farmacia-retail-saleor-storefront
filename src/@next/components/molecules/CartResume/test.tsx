import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { CartResume } from ".";
import { DEFAULT_PROPS } from "./fixtures";

describe("<CartResume />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <CartResume
        onClickHandle={jest.fn()}
        activeStepIndex={DEFAULT_PROPS.activeStepIndex.step1}
        totalProducts={DEFAULT_PROPS.totalProducts}
      />
    );
    expect(wrapper.exists()).toEqual(true);
  });

  it("should show shipping price", () => {
    const wrapper = mount(
      <CartResume
        onClickHandle={jest.fn()}
        activeStepIndex={DEFAULT_PROPS.activeStepIndex.step1}
        shippingPrice={DEFAULT_PROPS.shipping}
        totalProducts={DEFAULT_PROPS.totalProducts}
      />
    );
    expect(wrapper.text()).toContain(DEFAULT_PROPS.shipping.gross.amount);
  });

  it("should show promo price", () => {
    const wrapper = mount(
      <CartResume
        onClickHandle={jest.fn()}
        activeStepIndex={DEFAULT_PROPS.activeStepIndex.step2}
        promoPrice={DEFAULT_PROPS.promoCode}
        totalProducts={DEFAULT_PROPS.totalProducts}
      />
    );
    expect(wrapper.text()).toContain(DEFAULT_PROPS.promoCode.gross.amount);
  });

  it("should show total price", () => {
    const wrapper = mount(
      <CartResume
        onClickHandle={jest.fn()}
        activeStepIndex={DEFAULT_PROPS.activeStepIndex.step1}
        totalPrice={DEFAULT_PROPS.total}
        totalProducts={DEFAULT_PROPS.totalProducts}
      />
    );
    expect(wrapper.text()).toContain(DEFAULT_PROPS.total.gross.amount);
  });

  it("should show count one product", () => {
    const wrapper = mount(
      <CartResume
        onClickHandle={jest.fn()}
        activeStepIndex={DEFAULT_PROPS.activeStepIndex.step1}
        totalProducts={1}
      />
    );
    expect(wrapper.text()).toContain("1 Producto");
  });

  it("should show total count products", () => {
    const wrapper = mount(
      <CartResume
        onClickHandle={jest.fn()}
        activeStepIndex={DEFAULT_PROPS.activeStepIndex.step1}
        totalProducts={2}
      />
    );
    expect(wrapper.text()).toContain("2 Productos");
  });

  it("should display text Ver Detalle when active step is step 2", () => {
    const wrapper = mount(
      <CartResume
        onClickHandle={jest.fn()}
        activeStepIndex={DEFAULT_PROPS.activeStepIndex.step2}
        totalProducts={2}
      />
    );
    expect(wrapper.text()).toContain("Ver Detalle");
  });

  it("should not display text Ver Detalle when active step is diferent to 2", () => {
    const wrapper = mount(
      <CartResume
        onClickHandle={jest.fn()}
        activeStepIndex={DEFAULT_PROPS.activeStepIndex.step1}
        totalProducts={2}
      />
    );
    expect(wrapper.text()).not.toContain("Ver Detalle");
  });
});
