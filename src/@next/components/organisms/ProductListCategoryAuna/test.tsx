import "./matchMedia.mock";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ProductListCategoryAuna } from ".";
import { products, productsOnCart } from "./fixtures";

jest.mock("@temp/@next/optimizely/hooks", () => ({
  useAddToCartButtonVariable: () => "Agregar",
  useShowPersonalizedCollection: () => ({enable:false, variationKey: ""}),
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
          canLoadMore={true}
          loading={false}
          onLoadMore={jest.fn()}
          user={null}
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
          canLoadMore={true}
          loading={true}
          onLoadMore={jest.fn()}
          user={null}
        />
      </BrowserRouter>
    );

    expect(wrapper.text()).not.toContain("More +");
  });
});
