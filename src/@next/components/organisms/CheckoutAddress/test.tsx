import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import { InputField } from "@farmacia-retail/farmauna-components";
import { Select } from "@components/atoms";

import { CheckoutAddress } from ".";
import { ANONYMOUS_USER_PROPS, mockCity } from "./fixtures";
import { removeCountryCodeInPhoneNumber } from "@temp/@next/utils/addresForm";

describe("<CheckoutAddress />", () => {
  it("renders address form", () => {
    const setShippingAddress = jest.fn();
    const wrapper = mount(
      <CheckoutAddress
        {...ANONYMOUS_USER_PROPS}
        checkoutData={{
          email: ANONYMOUS_USER_PROPS.checkoutAddress.email,
          shippingAddress: {
            ...ANONYMOUS_USER_PROPS.checkoutAddress,
            latitude: ANONYMOUS_USER_PROPS.checkoutAddress.latitude as number,
            longitude: ANONYMOUS_USER_PROPS.checkoutAddress.longitude as number,
          },
          token: "",
        }}
        setShippingAddress={setShippingAddress}
      />
    );

    const address = ANONYMOUS_USER_PROPS.checkoutAddress;
    const getValue = (n: number) =>
      wrapper
        .find(InputField)
        .at(n)
        .prop("value");

    expect(getValue(0)).toEqual(address.firstName);
    expect(getValue(1)).toEqual("");
    expect(getValue(2)).toEqual(address.email);
    expect(getValue(3)).toEqual(removeCountryCodeInPhoneNumber(address.phone || ''));
    expect(getValue(4)).toEqual(address.streetAddress1);
    expect(getValue(5)).toEqual(address.streetAddress2);

    expect(
      wrapper
        .find(Select)
        .at(0)
        .prop("value")
    ).toEqual(mockCity);
  });
});
