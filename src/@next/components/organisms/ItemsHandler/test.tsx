import { MAX_ORDER_PER_PRODUCT } from "@temp/core/config";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { Button } from "@farmacia-retail/farmauna-components";
import { product } from "./test.data";

import ItemsHandler from "./ItemsHandler";

jest.mock("@temp/optimizely/hooks", () => ({
  useAddToCartButtonVariable: () => "Agregar",
}));

jest.mock("@temp/optimizely/tracks", () => ({
  trackAddToCart: jest.fn(),
}));

const addToCart = jest.fn();
const removeItemToCart = jest.fn();

describe("<ItemHandler />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <ItemsHandler
        addToCart={addToCart}
        removeItemToCart={removeItemToCart}
        product={product}
      />
    );
    expect(wrapper.exists()).toEqual(true);
  });

  it("should be display Agregar button disabled", () => {
    product.quantity = 0;
    const wrapper = mount(
      <ItemsHandler
        addToCart={addToCart}
        removeItemToCart={removeItemToCart}
        product={product}
      />
    );

    const buttonAdd = wrapper
      .find("div")
      .find(Button)
      .at(0);
    expect(buttonAdd.text()).toContain("Agregar");
    expect(buttonAdd.prop("disabled")).toEqual(true);
  });

  it("should be display Agregar button enabled", () => {
    product.quantity = 0;
    const wrapper = mount(
      <ItemsHandler
        addToCart={addToCart}
        removeItemToCart={removeItemToCart}
        product={product}
        canAddToCart={true}
      />
    );

    const buttonAdd = wrapper
      .find("div")
      .find(Button)
      .at(0);
    expect(buttonAdd.text()).toContain("Agregar");
    expect(buttonAdd.prop("disabled")).toEqual(false);
  });
});

describe("Add and remove Buttons", () => {
  it("should be display buttons to add and remove items", () => {
    product.quantity = 1;
    const wrapper = mount(
      <ItemsHandler
        addToCart={addToCart}
        removeItemToCart={removeItemToCart}
        product={product}
        canAddToCart={true}
      />
    );

    const buttons = wrapper.find("div").find(Button);
    expect(buttons.length).toEqual(2);
    expect(wrapper.render().text()).toContain(product.quantity);
  });

  it("should be enable add item button", () => {
    product.quantity = 1;
    const wrapper = shallow(
      <ItemsHandler
        addToCart={addToCart}
        removeItemToCart={removeItemToCart}
        product={product}
        canAddToCart={true}
      />
    );

    const buttons = wrapper.find("div").find(Button);
    expect(buttons.at(1).prop("disabled")).toEqual(false);
  });

  it("should be disabled add item button when there are more than max elements for product", () => {
    product.quantity = MAX_ORDER_PER_PRODUCT;

    const wrapper = shallow(
      <ItemsHandler
        addToCart={addToCart}
        removeItemToCart={removeItemToCart}
        product={product}
      />
    );

    const buttonAddDisabled = wrapper
      .find("div")
      .find(Button)
      .at(1)
      .prop("disabled");
    expect(buttonAddDisabled).toEqual(true);
  });
});
