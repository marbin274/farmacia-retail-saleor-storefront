import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Attribute } from "@components/atoms";
import { AccountTile } from "./AccountTile";
import { PasswordTile } from "./PasswordTile";

jest.mock("@sdk/react", () => ({
  useAccountUpdate: () => [jest.fn(), { data: null, error: null }],
  usePasswordChange: () => [jest.fn(), { data: null, error: null }],
  useUserDetails: () => ({ data: { firstName: "John", lastName: "Doe" } }),
}));

describe("<PasswordTile />", () => {
  it("exists", () => {
    const wrapper = shallow(<PasswordTile />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should show basic view on load", () => {
    const wrapper = mount(<PasswordTile />);

    expect(wrapper.find(Attribute)).toHaveLength(1);
  });


});

describe("<AccountTile />", () => {
  it("exists", () => {
    const wrapper = shallow(<AccountTile />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should show basic view on load", () => {
    const wrapper = mount(<AccountTile />);

    expect(wrapper.find(Attribute)).toHaveLength(4);
  });


});
