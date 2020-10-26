import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CheckoutPayment } from ".";
import { LOGGED_IN_USER_PROPS } from "./fixtures";

describe("<CheckoutPayment />", () => {
  it("renders user addresses", () => {
    const setBillingAddress = jest.fn();
    const setBillingAsShippingAddress = jest.fn();
    const addPromoCode = jest.fn();
    const removeVoucherCode = jest.fn();
    const submitUnchangedDiscount = jest.fn();
    const selectPaymentGateway = jest.fn();
    const processPayment = jest.fn();
    const onGatewayError = jest.fn();
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
      />
    );

    const wrapperText = wrapper.text();
    expect(wrapperText).toContain(LOGGED_IN_USER_PROPS.paymentGateways[0].name);
  });
});
