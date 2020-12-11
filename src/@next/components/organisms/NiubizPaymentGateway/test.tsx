import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { NiubizPaymentGateway } from ".";
import { userDataFroNiubiz } from "../PaymentGatewaysList/fixtures";

const config = [{ field: "client_token", value: "token_test_1234567890" }];

describe("<NiubizPaymentGateway />", () => {
  it("exists", () => {
    const processPayment = jest.fn();
    const onError = jest.fn();
    const wrapper = shallow(
      <NiubizPaymentGateway
        config={config}
        processPayment={processPayment}
        onError={onError}
        userDataForNiubiz={userDataFroNiubiz}
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
