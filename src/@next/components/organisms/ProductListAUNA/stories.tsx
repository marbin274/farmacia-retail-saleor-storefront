import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ProductListAUNA } from ".";
import { products, productsOnCart } from "./fixtures";

storiesOf("@components/organisms/ProductListAUNA", module)
  .addParameters({ component: ProductListAUNA })
  .add("default", () => (
    <BrowserRouter>
      <ProductListAUNA
        products={products}
        productsOnCart={productsOnCart}
        canLoadMore={true}
        loading={false}
        onLoadMore={() => null}
        user={null}
      />
    </BrowserRouter>
  ));
