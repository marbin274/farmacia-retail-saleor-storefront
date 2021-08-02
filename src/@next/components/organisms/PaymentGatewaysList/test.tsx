import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";

import { PaymentGatewaysList } from ".";
import { paymentGateways, userDataFroNiubiz } from "./fixtures";

jest.mock("@temp/@sdk/react", () => ({
  useUserDetails: () => ({
    data: undefined,
    loading: false,
  }),
  useCreateUserCardToken: () => [
    jest.fn(),
    {
      data: undefined,
      error: undefined,
      loading: false,
    },
  ],
}));

describe("<PaymentGatewaysList />", () => {
  it("renders payment gateways", () => {
    // @ts-ignore
    Object.defineProperty(global.document, "getElementById", {
      value: () => true,
    });

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
