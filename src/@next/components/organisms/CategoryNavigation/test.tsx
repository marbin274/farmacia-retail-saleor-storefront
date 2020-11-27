import "jest-styled-components";
import { shallow } from "enzyme";
import React from "react";
import { CategoryNavigation } from ".";
import { DEFAULT_PROPS } from "./fixtures";

describe("<CategoryNavigation />", () => {
  it("exists", () => {
    const wrapper = shallow(<CategoryNavigation {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });
});
