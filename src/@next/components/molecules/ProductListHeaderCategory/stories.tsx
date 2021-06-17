import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductListHeaderCategory } from ".";

const DEFAULT_PROPS = {
  activeFilters: 0,
  activeFiltersAttributes: [],
  clearFilters: action("clearFilters"),
  numberOfProducts: 255,
  onChange: action("onChange"),
  onCloseFilterAttribute: action("onAttributeFiltersChange"),
  openFiltersMenu: action("openFiltersMenu"),
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

storiesOf("@components/molecules/ProductListHeaderCategory", module)
  .addParameters({ component: ProductListHeaderCategory })
  .add("default", () => <ProductListHeaderCategory {...DEFAULT_PROPS} />)
  .add("with active filters", () => (
    <ProductListHeaderCategory {...DEFAULT_PROPS} activeFilters={3} />
  ));
