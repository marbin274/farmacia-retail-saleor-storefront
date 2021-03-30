import { storiesOf } from "@storybook/react";
import React from "react";

import { DiscountForm } from ".";
const DEFAULT_PROPS = {
  setShowLabelCupon: ()=>{jest.fn()},
}
storiesOf("@components/organisms/DiscountForm", module)
  .addParameters({ component: DiscountForm })
  .add("default", () => <DiscountForm {...DEFAULT_PROPS } />);
