import { defaultTheme } from "@styles";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { BulletXFilledIcon } from "@farmacia-retail/farmauna-components";

import { IconButton } from "@components/atoms";

import { CardHeader } from ".";
import * as S from "./styles";
import { IProps } from "./types";

const children = "Some Title";
const DEFAULT_PROPS = {
  children,
  divider: false,
};

describe("<CardHeader />", () => {
  const renderHeader = (props: IProps) =>
    shallow(<CardHeader {...props}>{children}</CardHeader>);
  it("exists", () => {
    const header = renderHeader(DEFAULT_PROPS);

    expect(header.exists()).toEqual(true);
  });

  it("should render children wrapped in <S.Title> by default", () => {
    const title = renderHeader(DEFAULT_PROPS).find(S.Title);

    expect(title.exists()).toEqual(true);
    expect(title.contains(children)).toBe(true);
  });

  it("should pass `titleSize` as `size` to  <S.Title>", () => {
    const title = mount(<CardHeader {...DEFAULT_PROPS} titleSize="lg" />).find(
      S.Title
    );

    expect(title).toHaveStyleRule(
      "font-size",
      defaultTheme.typography.h4FontSize
    );
  });

  it("should render children wrapped in <S.Paragraph> when `textStyle` is set to `paragraph`", () => {
    const paragraph = renderHeader({
      ...DEFAULT_PROPS,
      textStyle: "paragraph",
    }).find(S.Paragraph);

    expect(paragraph.exists()).toEqual(true);
    expect(paragraph.contains(children)).toBe(true);
  });

  it("should render close icon when `onHide` prop is defined and `customIcon` is not defined", () => {
    const onHide = jest.fn();
    const closeIcon = renderHeader({
      ...DEFAULT_PROPS,
      onHide,
    }).find(BulletXFilledIcon);

    closeIcon.simulate("click");
    expect(closeIcon.exists()).toEqual(true);
    expect(onHide).toHaveBeenCalled();
  });

  it("should render custom icon when `customIcon` prop is defined", () => {
    const customIcon = <IconButton name="edit" />;
    const icon = renderHeader({ ...DEFAULT_PROPS, customIcon }).find(
      IconButton
    );

    expect(icon.exists()).toEqual(true);
    expect(icon.prop("name")).toEqual("edit");
  });
});
