import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AunaPaymentGateway } from ".";

describe("<AunaPaymentGateway />", () => {
  // TODO: temporary use this config instead of real data, until we have Aun payments plugin [Denn 04/11/20]
  const config = [
    {
      field: 'client_token',
      value: 'QAZWSXEDC',
    },
  ];
  const processPayment = jest.fn();
  const onError = jest.fn();

  it("renders", () => {
    const wrapper = mount(
      <AunaPaymentGateway config={config} onError={onError} processPayment={processPayment} />
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
