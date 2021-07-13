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
        reRender={true}
        selectedDistrict="Miraflores"
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });

  
});
