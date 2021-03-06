import "./matchMedia.mock.js";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CachedImage } from "..";

import { CartSummaryRow } from ".";
import { DEFAULT_PROPS } from "./fixtures";

describe("<CartSummaryRow />", () => {
  it("exists", () => {
    const wrapper = shallow(<CartSummaryRow {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should display product name", () => {
    const wrapper = shallow(<CartSummaryRow {...DEFAULT_PROPS} />);

    expect(wrapper.text()).toContain(DEFAULT_PROPS.name);
  });

  it("should display product price", () => {
    const wrapper = mount(<CartSummaryRow {...DEFAULT_PROPS} />);

    expect(wrapper.text()).toContain(
      DEFAULT_PROPS.price?.gross ? DEFAULT_PROPS.price.gross.amount : undefined
    );
  });

  it("should display product thumbnail", () => {
    const wrapper = shallow(<CartSummaryRow {...DEFAULT_PROPS} />);

    expect(wrapper.find(CachedImage).length).toEqual(1);
  });

  it("should display product quantity", () => {
    const wrapper = shallow(<CartSummaryRow {...DEFAULT_PROPS} />);

    expect(wrapper.text()).toContain(`${DEFAULT_PROPS.quantity}`);
  });
});
