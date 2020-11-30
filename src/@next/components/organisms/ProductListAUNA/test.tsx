import { ISimpleProduct } from "@app/types/IProduct";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ProductListAUNA } from ".";
import { PRODUCTS } from "./fixtures";

const simpleProductsList = PRODUCTS as ISimpleProduct[];

describe("<ProductList />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <ProductListAUNA
          products={simpleProductsList}
          canLoadMore={true}
          loading={false}
          onLoadMore={jest.fn()}
          items={null}
        />
      </BrowserRouter>
    );

    expect(wrapper.exists()).toEqual(true);
  });
  it("show loading", () => {
    const wrapper = mount(
      <BrowserRouter>
        <ProductListAUNA
          products={simpleProductsList}
          canLoadMore={true}
          loading={true}
          onLoadMore={jest.fn()}
          items={null}
        />
      </BrowserRouter>
    );

    expect(wrapper.text()).not.toContain("More +");
  });
});
