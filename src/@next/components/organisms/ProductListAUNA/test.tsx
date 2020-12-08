import "jest-styled-components";
import { mount, shallow } from "enzyme";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ProductListAUNA } from ".";
import { products, productsOnCart } from "./fixtures";

describe("<ProductList />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <ProductListAUNA
          products={products}
          productsOnCart={productsOnCart}
          canLoadMore={true}
          loading={false}
          onLoadMore={jest.fn()}
        />
      </BrowserRouter>
    );

    expect(wrapper.exists()).toEqual(true);
  });
  it("show loading", () => {
    const wrapper = mount(
      <BrowserRouter>
        <ProductListAUNA
          products={products}
          productsOnCart={productsOnCart}
          canLoadMore={true}
          loading={true}
          onLoadMore={jest.fn()}
        />
      </BrowserRouter>
    );

    expect(wrapper.text()).not.toContain("More +");
  });
});
