import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { CategoryNavigation } from ".";
import { DEFAULT_PROPS } from "./fixtures";

storiesOf("@components/organisms/CategoryNavigation", module)
  .addParameters({ component: CategoryNavigation })
  .addDecorator(getStory => <MemoryRouter>{getStory()}</MemoryRouter>)
  .add("default", () => <CategoryNavigation {...DEFAULT_PROPS} />);
