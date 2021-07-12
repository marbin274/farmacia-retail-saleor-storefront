import "./matchMedia.mock";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ProductListCategoryAuna } from ".";
import { products, productsOnCart } from "./fixtures";

jest.mock("@temp/@next/optimizely/hooks", () => ({
  useAddToCartButtonVariable: () => "Agregar",
}));

jest.mock("@temp/@next/optimizely/tracks", () => ({
  trackAddToCart: jest.fn(),
}));

describe("<ProductList />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <ProductListCategoryAuna
          products={products}
          productsOnCart={productsOnCart}
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
        <ProductListCategoryAuna
          products={products}
          productsOnCart={productsOnCart}
          loading={true}
          onLoadMore={jest.fn()}
        />
      </BrowserRouter>
    );

    expect(wrapper.text()).not.toContain("More +");
  });
});
