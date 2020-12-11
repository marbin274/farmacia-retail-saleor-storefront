import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CheckoutReview } from ".";

describe("<CheckoutReview />", () => {
  it("exists", () => {
    const wrapper = shallow(<CheckoutReview creditCardProvider="visa" />);

    expect(wrapper.exists()).toEqual(true);
  });
});
