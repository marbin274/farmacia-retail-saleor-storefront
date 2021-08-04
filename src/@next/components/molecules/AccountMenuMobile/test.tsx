import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { MemoryRouter } from "react-router";

import { AccountMenuMobile } from ".";
import { DropdownSelect } from "../../atoms";
import { SortLine } from "../../atoms/DropdownSelect/styles";
import { links } from "@app/pages/AccountPage/paths";

const PROPS = {
  active: "/account/",
  links,
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
    expect(wrapper.text()).not.toContain("Mis categorías");
    expect(wrapper.text()).not.toContain("Mis direcciones");
    expect(wrapper.text()).not.toContain("Historial de pedidos");
    expect(wrapper.text()).not.toContain("Mis medios de pago");
  });

  it("should expand on click - all tabs name should be visible", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <AccountMenuMobile {...PROPS} />
      </MemoryRouter>
    );

    wrapper
      .find(AccountMenuMobile)
      .find(DropdownSelect)
      .find(SortLine)
      .at(0)
      .simulate("click");

    expect(wrapper.text()).toContain("Mi perfil");
    expect(wrapper.text()).toContain("Mis categorías");
    expect(wrapper.text()).toContain("Mis direcciones");
    expect(wrapper.text()).toContain("Historial de pedidos");
    expect(wrapper.text()).toContain("Mis medios de pago");
  });
});
