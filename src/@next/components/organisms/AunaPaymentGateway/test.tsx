import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AunaPaymentGateway } from ".";

// TODO: Use mocks to emulate the internal behavior, remove the config variable, remove the skip statement
describe("<AunaPaymentGateway />", () => {
  const config = [
    {
      field: 'client_token',
      value: 'QAZWSXEDC',
    },
  ];
  const processPayment = jest.fn();
  const onError = jest.fn();

  test.skip("renders", () => {
    const wrapper = mount(
      <AunaPaymentGateway config={config} onError={onError} processPayment={processPayment} />
    );

    expect(wrapper.exists()).toEqual(true);
    // expect(true).toEqual(true);
  });
});

// describe("<AunaPaymentGateway />", () => {
//   expect(true).toEqueal(true);
// })