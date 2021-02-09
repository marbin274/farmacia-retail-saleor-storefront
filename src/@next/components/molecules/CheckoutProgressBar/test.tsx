import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { CheckoutProgressBar } from ".";

const steps = [
  {
    index: 0,
    link: "#",
    name: "Shipping",
  },
  {
    index: 1,
    link: "#",
    name: "Billing",
  },
  {
    index: 2,
    link: "#",
    name: "Payment",
  },
];

describe("<CheckoutProgressBar />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <CheckoutProgressBar steps={steps} activeStepIndex={0} pathName="" />
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("exists", () => {
    const wrapper = mount(
      <MemoryRouter>
        <CheckoutProgressBar steps={steps} activeStepIndex={0} pathName="" />
      </MemoryRouter>
    );

    expect(wrapper.find("a").length).toEqual(steps.length);
  });
});
