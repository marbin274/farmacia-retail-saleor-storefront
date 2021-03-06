import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { PaymentGatewaysList } from ".";
import { paymentGateways, userDataFroNiubiz } from "./fixtures";

const processPayment = action("processPayment");
const selectPaymentGateway = action("selectPaymentGateway");
const onError = action("onError");
const changeRequestPayload = action("changeRequestPayload");

storiesOf("@components/organisms/PaymentGatewaysList", module)
  .addParameters({ component: PaymentGatewaysList })
  .add("default", () => (
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
  ));
