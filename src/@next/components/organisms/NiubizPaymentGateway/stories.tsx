import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { NiubizPaymentGateway } from ".";

const config = [{ field: "client_token", value: "token_test_1234567890" }];
const processPayment = action("processPayment");
const onError = action("onError");
const generatePurchaseNumber = () => {
  action("generatePurchaseNumber");
  return 123;
};

storiesOf("@components/organisms/NiubizPaymentGateway", module)
  .addParameters({ component: NiubizPaymentGateway })
  .add("default", () => (
    <NiubizPaymentGateway
      config={config}
      processPayment={processPayment}
      onError={onError}
      generatePurchaseNumber={generatePurchaseNumber}
    />
  ));
