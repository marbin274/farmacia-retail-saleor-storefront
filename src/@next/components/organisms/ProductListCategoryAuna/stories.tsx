import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ProductListCategoryAuna } from ".";
import { products, productsOnCart } from "./fixtures";

storiesOf("@components/organisms/ProductListCategoryAuna", module)
  .addParameters({ component: ProductListCategoryAuna })
  .add("default", () => (
    <BrowserRouter>
      <ProductListCategoryAuna
        products={products}
        productsOnCart={productsOnCart}
        canLoadMore={true}
        loading={false}
        onLoadMore={() => null}
        user={null}
      />
    </BrowserRouter>
  ));
