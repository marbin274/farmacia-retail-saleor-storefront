import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CheckoutPayment } from ".";
import { LOGGED_IN_USER_PROPS } from "./fixtures";

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

describe("<CheckoutPayment />", () => {
  it("renders user addresses", () => {
    // @ts-ignore
    Object.defineProperty(global.document, "getElementById", {
      value: () => true,
    });

    const setBillingAddress = jest.fn();
    const setBillingAsShippingAddress = jest.fn();
    const addPromoCode = jest.fn();
    const removeVoucherCode = jest.fn();
    const submitUnchangedDiscount = jest.fn();
    const selectPaymentGateway = jest.fn();
    const processPayment = jest.fn();
    const onGatewayError = jest.fn();
    const clearPromoCodeErrors = jest.fn();
    const changeRequestPayload = jest.fn();
    const wrapper = mount(
      <CheckoutPayment
        {...LOGGED_IN_USER_PROPS}
        setBillingAddress={setBillingAddress}
        setBillingAsShippingAddress={setBillingAsShippingAddress}
        addPromoCode={addPromoCode}
        removeVoucherCode={removeVoucherCode}
        submitUnchangedDiscount={submitUnchangedDiscount}
        selectPaymentGateway={selectPaymentGateway}
        processPayment={processPayment}
        onGatewayError={onGatewayError}
        clearPromoCodeErrors={clearPromoCodeErrors}
        changeRequestPayload={changeRequestPayload}
        selectedDistrict="Miraflores"
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
