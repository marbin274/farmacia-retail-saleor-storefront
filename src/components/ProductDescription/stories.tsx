import { storiesOf } from "@storybook/react";
import React from "react";

import { default as ProductDescription } from ".";
import { productDescriptionProps } from "./fixtures";

storiesOf("@components/organisms/ProductDescription", module)
  .addParameters({ component: ProductDescription })
  .add("default", () => <ProductDescription {...productDescriptionProps} />);
