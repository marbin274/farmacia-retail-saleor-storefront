import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductListHeaderSearch } from ".";

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

storiesOf("@components/molecules/ProductListHeaderSearch", module)
  .addParameters({ component: ProductListHeaderSearch })
  .add("default", () => <ProductListHeaderSearch {...DEFAULT_PROPS} />)
  .add("with active filters", () => (
    <ProductListHeaderSearch {...DEFAULT_PROPS} activeFilters={3} />
  ));
