import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { ModalBackground } from ".";
import { IProps } from "./types";
import { OverlayStyled } from "./styles";

const Children = () => <div>Content</div>;
const DEFAULT_PROPS = {
  children: Children,
  disabled: false,
  formId: "form-id",
  hide: jest.fn(),
  imageDesktop: "image",
  imageMobile: "imageMobile",
  show: true,
};

describe("<ModalBackground />", () => {
  const renderModal = (props: IProps) =>
    shallow(
      <ModalBackground {...props}>
        <Children />
      </ModalBackground>
    );

  it("exists", () => {
    const modal = renderModal(DEFAULT_PROPS);
    expect(modal.exists()).toEqual(true);
  });

  it("should render <Overlay /> component with [position, show, hide, target] props", () => {
    const overlay = renderModal({ ...DEFAULT_PROPS, target: null }).find(
      OverlayStyled
    );
    const overlayProps = overlay.props();

    expect(overlay.exists()).toEqual(true);
    expect(overlayProps.hide).toEqual(DEFAULT_PROPS.hide);
    expect(overlayProps.target).toBeDefined();
  });
});
