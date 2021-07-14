import "./matchMedia.mock";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ProductListAUNA } from ".";
import { products, productsOnCart } from "./fixtures";

jest.mock("@temp/optimizely/hooks", () => ({
  useAddToCartButtonVariable: () => "Agregar",
  useShowPersonalizedCollection: () => ({enable:false, variationKey: ""}),

}));

jest.mock("@temp/optimizely/tracks", () => ({
  trackAddToCart: jest.fn(),
}));

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
