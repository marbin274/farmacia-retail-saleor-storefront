import React from "react";
import { shallow } from "enzyme";
import { ProductBottomDetail } from ".";
import { ProductContent } from "./styles";

const props: any = {
  addToCart: jest.fn(),
  hideProductDetails: false,
  product: {
    name: "Test Product",
    thumbnail: {
      url: "http://my-image.test",
    },
  },
  removeItemToCart: jest.fn(),
  renderPrice: jest.fn(),
  substractItemToCart: jest.fn(),
};

describe("<ProductBottomDetail />", () => {
  it("exists", () => {
    const wrapper = shallow(<ProductBottomDetail {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("shows product content", () => {
    const wrapper = shallow(<ProductBottomDetail {...props} />);
    expect(wrapper.find(ProductContent).exists()).toBeTruthy();

    wrapper.setProps({ hideProductDetails: true });
    expect(wrapper.find(ProductContent).exists()).toBeFalsy();
  });
});
