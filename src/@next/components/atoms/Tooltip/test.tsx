import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Tooltip } from ".";

describe("<Tooltip />", () => {
  it("exists", () => {
    const wrapper = shallow(<Tooltip text="message">Hover me</Tooltip>);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain children", () => {
    const message = "This is test message";
    const wrapper = shallow(
      <Tooltip text="message">
        <p>{message}</p>
      </Tooltip>
    );

    expect(wrapper.find("p").length).toEqual(1);
    expect(wrapper.text()).toContain(message);
  });
});
