import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ProductListHeaderSearch } from ".";

const clearFilterMock = jest.fn();
const onChangeMock = jest.fn();
const onCloseFilterAttributeMock = jest.fn();
const openFiltersMenuMock = jest.fn();

const DEFAULT_PROPS = {
  activeFilters: 0,
  activeFiltersAttributes: [],
  clearFilters: clearFilterMock,
  numberOfProducts: 255,
  onChange: onChangeMock,
  onCloseFilterAttribute: onCloseFilterAttributeMock,
  openFiltersMenu: openFiltersMenuMock,
  sortOptions: [
    {
      label: "Price ASC",
      value: "PRICE",
    },
    {
      label: "Price DESC",
      value: "-PRICE",
    },
  ],
};

describe("<ProductListHeaderSearch />", () => {
  it("exists", () => {
    const wrapper = shallow(<ProductListHeaderSearch {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should display number of products found", () => {
    const wrapper = shallow(<ProductListHeaderSearch {...DEFAULT_PROPS} />);

    expect(wrapper.text()).toContain(String(DEFAULT_PROPS.numberOfProducts));
  });

  it("should not display Limpiar filtros button if no active filters present", () => {
    const wrapper = shallow(<ProductListHeaderSearch {...DEFAULT_PROPS} />);

    expect(wrapper.text()).not.toContain("Limpiar filtros");
  });

  it("should display Limpiar filtros button if active filters present are present", () => {
    const wrapper = shallow(
      <ProductListHeaderSearch {...DEFAULT_PROPS} activeFilters={3} />
    );

    expect(wrapper.text()).toContain("Borrar filtros");
  });

  it("should display number of active filters if any are present", () => {
    const wrapper = shallow(
      <ProductListHeaderSearch {...DEFAULT_PROPS} activeFilters={3} />
    );

    expect(wrapper.text()).toContain("(3)");
  });

  it("should call method for clearing filters when clicking on Limpiar filtros button", () => {
    const wrapper = mount(
      <ProductListHeaderSearch {...DEFAULT_PROPS} activeFilters={3} />
    );

    wrapper
      .find("span")
      .filterWhere(item => {
        return item.prop("children") === "Borrar filtros";
      })
      .simulate("click");

    expect(clearFilterMock).toHaveBeenCalledTimes(1);
  });

  it("should call method for clearing filters when clicking on Limpiar filtros button", () => {
    const wrapper = mount(
      <ProductListHeaderSearch {...DEFAULT_PROPS} activeFilters={3} />
    );

    wrapper
      .find("button")
      .at(0)
      .simulate("click");

    expect(openFiltersMenuMock).toHaveBeenCalledTimes(1);
  });
});
