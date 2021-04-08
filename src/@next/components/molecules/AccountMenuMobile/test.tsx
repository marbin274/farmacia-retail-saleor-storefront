import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { MemoryRouter } from "react-router";

import { AccountMenuMobile } from ".";

const PROPS = {
  active: "/account/",
  links: [
    {
      label: "Mi perfil",
      url: "/account/",
    },
    {
      label: "Mis direcciones",
      url: "/address-book/",
    },
    {
      label: "Historial de pedidos",
      url: "/order-history/",
    },
  ],
};

describe("<AccountMenuMobile />", () => {
  it("exists", () => {
    const wrapper = shallow(<AccountMenuMobile {...PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should show only active tab if menu has not been clicked", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <AccountMenuMobile {...PROPS} />
      </MemoryRouter>
    );

    expect(wrapper.text()).toContain("Mi perfil");
    expect(wrapper.text()).not.toContain("Mis direcciones");
    expect(wrapper.text()).not.toContain("Historial de pedidos");
  });

  it("should expand on click - all tabs name should be visible", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <AccountMenuMobile {...PROPS} />
      </MemoryRouter>
    );

    wrapper.find(AccountMenuMobile).simulate("click");

    expect(wrapper.text()).toContain("Mi Cuenta");
    expect(wrapper.text()).toContain("Mi perfil");
    expect(wrapper.text()).toContain("Mis direcciones");
    expect(wrapper.text()).toContain("Historial de pedidos");
  });
});
