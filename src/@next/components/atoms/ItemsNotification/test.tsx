import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { ItemsNotification } from "./ItemsNotification";

describe("<ItemsNotification />", () => {
  it("exists", () => {
    const wrapper = shallow(<ItemsNotification />);
    expect(wrapper.exists()).toEqual(true);
  });
});
