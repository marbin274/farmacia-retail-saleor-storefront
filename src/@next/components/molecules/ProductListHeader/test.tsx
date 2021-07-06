import { fireEvent, render, screen } from "@testing-library/react";
import "jest-styled-components";
import React from "react";

import { ProductListHeader } from ".";

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

describe("<ProductListHeader />", () => {
  it("exists", () => {
    render(<ProductListHeader {...DEFAULT_PROPS} />);

    const productListHeader = screen.getByRole("product-list-header");
    expect(productListHeader).toBeTruthy();
  });

  it("should display number of products found", () => {
    render(<ProductListHeader {...DEFAULT_PROPS} />);

    const valueNumbOfProductsFound = screen.getByRole(
      "no-of-products-found_value"
    );
    expect(valueNumbOfProductsFound.textContent).toContain(
      DEFAULT_PROPS.numberOfProducts
    );
  });

  it("should not display Borrar filtros chip if no active filters present", () => {
    render(<ProductListHeader {...DEFAULT_PROPS} />);

    const clearFiltersChip = screen.queryByRole("clear-filters");

    expect(clearFiltersChip).toBeNull();
  });

  it("should display Borrar filtros chip if active filters present are present", () => {
    render(
      <ProductListHeader
        {...DEFAULT_PROPS}
        activeFilters={3}
        activeFiltersAttributes={[
          { attributeSlug: "", valueName: "", valueSlug: "" },
        ]}
      />
    );

    const clearFiltersChip = screen.queryByRole("clear-filters");

    expect(clearFiltersChip).toBeTruthy();
  });

  it("should display number of active filters if any are present", () => {
    render(<ProductListHeader {...DEFAULT_PROPS} activeFilters={3} />);

    const productListHeader = screen.getByRole("product-list-header");

    expect(productListHeader.textContent).toContain("(3)");
  });

  it("should call method for clearing filters when clicking on Borrar filtros button", () => {
    render(
      <ProductListHeader
        {...DEFAULT_PROPS}
        activeFilters={3}
        activeFiltersAttributes={[
          { attributeSlug: "", valueName: "", valueSlug: "" },
        ]}
      />
    );
    const clearFiltersIcon = screen.getByTestId("clear-filters_icon");

    fireEvent.click(clearFiltersIcon);
    expect(clearFilterMock).toHaveBeenCalledTimes(1);
  });

  it("should call method for open filters when clicking on Filtrar button", () => {
    render(<ProductListHeader {...DEFAULT_PROPS} />);

    const openFiltersIcon = screen.getByRole("filters__button");

    fireEvent.click(openFiltersIcon);
    expect(openFiltersMenuMock).toHaveBeenCalledTimes(1);
  });
});
