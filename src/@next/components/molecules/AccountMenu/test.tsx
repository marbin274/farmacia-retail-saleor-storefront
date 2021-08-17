import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { MemoryRouter } from "react-router";
import { AccountMenu } from ".";
import { links } from "@app/pages/AccountPage/paths";

const PROPS = {
  active: "/account/",
  links,
};

describe("<AccountMenu />", () => {
  it("exists", () => {
    const wrapper = shallow(<AccountMenu {...PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain proper link names converted from urls", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <AccountMenu {...PROPS} />
      </MemoryRouter>
    );

    expect(wrapper.text()).toContain("Mi cuenta");
    
    expect(wrapper.text()).toContain("Mis direcciones");
  });
});
