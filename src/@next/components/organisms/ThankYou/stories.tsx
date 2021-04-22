import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { ThankYou } from ".";
import { steps } from './fixtures';

storiesOf("@components/organisms/ThankYou", module)
  .addParameters({ component: ThankYou })
  .add("default", () => {
    const continueShopping = action("Continue shopping has been clicked");
    const orderDetails = action("Order details has been clicked");

    return (
      <ThankYou
        steps={steps}
        totalProducts={3}
        orderNumber={"#341414"}
        continueShopping={continueShopping}
        orderDetails={orderDetails}
        sequentialCode={"F53E053E"}
      />
    );
  });
