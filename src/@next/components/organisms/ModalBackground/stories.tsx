import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { ModalBackground } from ".";
import { IProps } from "./types";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}

const Children = () => <div>Content</div>;

const DEFAULT_PROPS = {
  children: Children,
  hide: action("hide"),
  imageDesktop: "imagedesktop",
  imageMobile: "imageMobile",
  show: true,
  target: portalRoot,
};

const renderModal = (props: IProps) => (
  <ModalBackground {...props}>
    <Children />
  </ModalBackground>
);
storiesOf("@components/organisms/ModalBackground", module)
  .addParameters({ component: ModalBackground })
  .add("Modal", () =>
    renderModal({
      ...DEFAULT_PROPS,
    })
  )
  .add("Modal Info", () =>
    renderModal({
      ...DEFAULT_PROPS,
      hide: action("hide"),
    })
  );
