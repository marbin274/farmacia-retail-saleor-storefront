import React from "react";
import { mount, shallow } from "enzyme";
import { PageItem } from "@components/atoms";
import { Pagination } from "./Pagination";
import { Container, PageInfo, PageInfoMobile } from "./styles";
import { IPaginationProps } from "./types";

const DEFAULT_PROPS: IPaginationProps = {
  page: 1,
  pageSize: 10,
  total: 100,
};

const prevButton = '[data-testid="prev"]';
const nextButton = '[data-testid="next"]';

describe("<Pagination />", () => {
  it("exists", () => {
    const wrapper = shallow(<Pagination {...DEFAULT_PROPS} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders page items", () => {
    const wrapper = shallow(<Pagination {...DEFAULT_PROPS} />);
    expect(wrapper.find(PageItem).length).toBe(3);

    wrapper.setProps({ pageItemsLimit: 8 });
    expect(wrapper.find(PageItem).length).toBe(8);

    wrapper.setProps({ pageItemsLimit: 12 });
    expect(wrapper.find(PageItem).length).toBe(10);
  });

  it("renders content if pages > 1", () => {
    const wrapper = shallow(<Pagination {...DEFAULT_PROPS} />);
    expect(wrapper.find(Container).exists()).toBeTruthy();

    wrapper.setProps({ total: 2 });
    expect(wrapper.find(Container).exists()).toBeFalsy();
  });

  it("renders page buttons", () => {
    const wrapper = shallow(<Pagination {...DEFAULT_PROPS} />);
    expect(wrapper.find(prevButton).exists()).toBeFalsy();
    expect(wrapper.find(nextButton).exists()).toBeTruthy();

    wrapper.setProps({ page: 5 });
    expect(wrapper.find(prevButton).exists()).toBeTruthy();
    expect(wrapper.find(nextButton).exists()).toBeTruthy();

    wrapper.setProps({ page: 10 });
    expect(wrapper.find(prevButton).exists()).toBeTruthy();
    expect(wrapper.find(nextButton).exists()).toBeFalsy();
  });

  it("renders page info", () => {
    const wrapper = shallow(<Pagination {...DEFAULT_PROPS} />);
    expect(wrapper.find(PageInfo).text()).toBe("Página 1 de 10");
    expect(wrapper.find(PageInfoMobile).text()).toBe("1/10");
  });

  it("calls page change", () => {
    const onPageChange = jest.fn();

    const wrapper = mount(
      <Pagination {...DEFAULT_PROPS} onPageChange={onPageChange} page={2} />
    );

    wrapper
      .find(PageItem)
      .at(2)
      .simulate("click");
    expect(onPageChange).toHaveBeenLastCalledWith(3);

    wrapper
      .find(prevButton)
      .at(0)
      .simulate("click");
    expect(onPageChange).toHaveBeenLastCalledWith(1);

    wrapper
      .find(nextButton)
      .at(0)
      .simulate("click");
    expect(onPageChange).toHaveBeenLastCalledWith(3);
  });
});
