import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { UnderConstruction } from ".";
import { OverlayContextInterface, OverlayTheme, OverlayType } from "@temp/components/Overlay";

// tslint:disable-next-line:no-object-literal-type-assertion
const overlayContextMock = {
  context: {
    content: '',
    data: {},
    status: undefined,
    title: '',
  },
  hide: action("hide"),
  show: true,
  showCatalog: action("hide"),
  theme: OverlayTheme.modal,
  type: OverlayType.underConstruction,
} as unknown as OverlayContextInterface;


storiesOf("@components/organisms/UnderConstruction", module)
  .addParameters({ component: UnderConstruction })
  .add("UnderConstruction", () => {
    return (
      <UnderConstruction overlay={overlayContextMock}/>
    );
  });
