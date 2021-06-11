import { storiesOf } from "@storybook/react";
import React from "react";

import { Tooltip } from ".";
storiesOf("@components/atoms/Label", module)
  .addParameters({ component: Tooltip })
  .add("default", () => <Tooltip text="hover">Hover me</Tooltip>);
