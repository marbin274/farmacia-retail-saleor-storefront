import React from "react";
import { shallow } from "enzyme";
import { PageItem, IPageItemProps } from "./PageItem";
import { Container } from "./styles";

const DEFAULT_PROPS: IPageItemProps = {
  onClick: jest.fn(),
  selected: false,
};

describe("<PageItem />", () => {
  it("exists", () => {
    const wrapper = shallow(<PageItem {...DEFAULT_PROPS} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders page number", () => {
    const wrapper = shallow(<PageItem {...DEFAULT_PROPS}>1</PageItem>);
    expect(wrapper.text()).toBe("1");
  });

  it("calls click", () => {
    const onClick = jest.fn();
    const wrapper = shallow(<PageItem {...DEFAULT_PROPS} onClick={onClick} />);
    wrapper.find(Container).simulate("click");
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
