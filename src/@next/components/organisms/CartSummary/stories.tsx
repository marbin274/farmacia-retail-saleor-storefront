import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { CartSummary } from ".";
import { DEFAULT_PROPS } from "./fixtures";

storiesOf("@components/organisms/CartSummary", module)
  .addParameters({ component: CartSummary })
  .addDecorator(getStory => <MemoryRouter>{getStory()}</MemoryRouter>)
  .add("default", () => <CartSummary {...DEFAULT_PROPS} />);
