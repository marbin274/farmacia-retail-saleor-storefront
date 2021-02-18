import { MAX_ORDER_PER_PRODUCT } from "@temp/core/config";
import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { Button } from "../../atoms";

import ItemsHandler from "./ItemsHandler";

const onAdd = jest.fn();
const onRemove = jest.fn();

describe("<ItemHandler />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <ItemsHandler onAdd={onAdd} onRemove={onRemove} value={1} />
    );
    expect(wrapper.exists()).toEqual(true);
  });
});

describe("Buttons Disabled", () => {
  it("more than 49 elements", () => {
    const items = MAX_ORDER_PER_PRODUCT;

    const wrapper = shallow(
      <ItemsHandler onAdd={onAdd} onRemove={onRemove} value={items} />
    );
    const buttonAddDisabled = wrapper
      .find("div")
      .find(Button)
      .at(1)
      .prop("disabled");
    expect(buttonAddDisabled).toEqual(true);
  });

  it("between 2 and 49 elements", () => {
    const wrapper = shallow(
      <ItemsHandler onAdd={onAdd} onRemove={onRemove} value={30} />
    );

    const buttonAdd = wrapper
      .find("div")
      .find(Button)
      .at(1)
      .prop("disabled");

    expect(buttonAdd).toEqual(false);
  });
});
