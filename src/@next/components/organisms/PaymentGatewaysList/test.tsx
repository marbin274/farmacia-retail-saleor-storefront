import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";

import { PaymentGatewaysList } from ".";
import { paymentGateways, userDataFroNiubiz } from "./fixtures";

describe("<PaymentGatewaysList />", () => {
  it("renders payment gateways", () => {
    const processPayment = jest.fn();
    const selectPaymentGateway = jest.fn();
    const onError = jest.fn();
    const changeRequestPayload = jest.fn();
    const wrapper = mount(
      <PaymentGatewaysList
        paymentGateways={paymentGateways}
        processPayment={processPayment}
        selectPaymentGateway={selectPaymentGateway}
        onError={onError}
        userDataForNiubiz={userDataFroNiubiz}
        changeRequestPayload={changeRequestPayload}
        voucherCode={undefined}
      />
    );

    const wrapperText = wrapper.text();
    expect(wrapperText).toContain(paymentGateways[0].name);
  });

  it("simulates select payment gateway", () => {
    const processPayment = jest.fn();
    const selectPaymentGateway = jest.fn();
    const onError = jest.fn();
    const changeRequestPayload = jest.fn();
    const wrapper = mount(
      <PaymentGatewaysList
        paymentGateways={paymentGateways}
        processPayment={processPayment}
        selectPaymentGateway={selectPaymentGateway}
        onError={onError}
        userDataForNiubiz={userDataFroNiubiz}
        changeRequestPayload={changeRequestPayload}
        voucherCode={null}
      />
    );

    const input1 = wrapper.find("input").at(0);
    input1.simulate("change", {
      target: { value: paymentGateways[0].name },
    });

    expect(selectPaymentGateway).toHaveBeenCalledWith(paymentGateways[0].id);
  });
});
