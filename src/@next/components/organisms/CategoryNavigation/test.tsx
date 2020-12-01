import "jest-styled-components";
import { shallow } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { CategoryNavigation } from ".";
import { DEFAULT_PROPS } from "./fixtures";

describe("<CategoryNavigation />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <CategoryNavigation {...DEFAULT_PROPS} />
      </MemoryRouter>
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
