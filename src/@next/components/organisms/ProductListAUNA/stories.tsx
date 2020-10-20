import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ProductListAUNA } from ".";
import { PRODUCTS } from "./fixtures";

storiesOf("@components/organisms/ProductListAUNA", module)
  .addParameters({ component: ProductListAUNA })
  .add("default", () => (
    <BrowserRouter>
      <ProductListAUNA
        products={PRODUCTS}
        canLoadMore={true}
        loading={false}
        onLoadMore={() => null}
      />
    </BrowserRouter>
  ));
