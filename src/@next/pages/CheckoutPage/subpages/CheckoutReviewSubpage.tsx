import React, {
  forwardRef,
  RefForwardingComponent,
  useImperativeHandle,
  useState,
} from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { CheckoutReview } from "@components/organisms";
import { statuses as dummyStatuses } from "@components/organisms/DummyPaymentGateway";
import { useCheckout } from "@sdk/react";
import { CHECKOUT_STEPS } from "@temp/core/config";
import { IFormError } from "@types";
// import { StringValueNode } from "graphql";

const creditCardType = require("credit-card-type");

export interface ICheckoutReviewSubpageHandles {
  complete: () => void;
}
interface IProps extends RouteComponentProps<any> {
  selectedPaymentGatewayToken?: string;
  changeSubmitProgress: (submitInProgress: boolean) => void;
  requestPayload?: string | undefined | null;
}

const CheckoutReviewSubpageWithRef: RefForwardingComponent<
  ICheckoutReviewSubpageHandles,
  IProps
> = (
  {
    selectedPaymentGatewayToken,
    changeSubmitProgress,
    requestPayload,
    ...props
  }: IProps,
  ref
) => {
  const history = useHistory();
  const { checkout, payment, completeCheckout } = useCheckout();

  const [errors, setErrors] = useState<IFormError[]>([]);

  const checkoutShippingAddress = checkout?.shippingAddress
    ? {
        ...checkout?.shippingAddress,
        phone: checkout?.shippingAddress?.phone || undefined,
      }
    : undefined;

  const checkoutBillingAddress = checkout?.billingAddress
    ? {
        ...checkout?.billingAddress,
        phone: checkout?.billingAddress?.phone || undefined,
      }
    : undefined;

  const getPaymentMethodDescription = () => {
    if (payment?.gateway === "mirumee.payments.dummy") {
      return `Dummy: ${
        dummyStatuses.find(
          status => status.token === selectedPaymentGatewayToken
        )?.label
      }`;
    }
    return ``;
  };

  const getCreditCardProvider = () => {
    if (payment?.creditCard) {
      const visaCards = creditCardType(payment?.creditCard.firstDigits);
      return visaCards[0].type;
    }
    return `visa`;
  };

  useImperativeHandle(ref, () => ({
    complete: async () => {
      changeSubmitProgress(true);
      const { data, dataError } = await completeCheckout(requestPayload);
      changeSubmitProgress(false);
      const errors = dataError?.error;
      if (errors) {
        setErrors(errors);
      } else {
        setErrors([]);
        history.push({
          pathname: CHECKOUT_STEPS[2].nextStepLink,
          state: {
            id: data?.id,
            orderNumber: data?.number,
            token: data?.token,
          },
        });
      }
    },
  }));

  return (
    <CheckoutReview
      {...props}
      shippingAddress={checkoutShippingAddress}
      billingAddress={checkoutBillingAddress}
      shippingMethodName={checkout?.shippingMethod?.name}
      paymentMethodName={getPaymentMethodDescription()}
      email={checkout?.email}
      creditCardProvider={getCreditCardProvider()}
      errors={errors}
    />
  );
};

const CheckoutReviewSubpage = forwardRef(CheckoutReviewSubpageWithRef);

export { CheckoutReviewSubpage };
