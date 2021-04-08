import { CheckoutShipping } from "@components/organisms";
import { useCheckout } from "@sdk/react";
import { alertService } from "@temp/@next/components/atoms/Alert";
import { IShippingMethodUpdate } from "@temp/@sdk/repository";
import { CHECKOUT_STEPS } from "@temp/core/config";
import { IFormError } from "@types";
import React, {
  forwardRef,
  RefForwardingComponent,
  useImperativeHandle,
  useRef,
} from "react";
import { RouteComponentProps, useHistory } from "react-router";

export interface ICheckoutShippingSubpageHandles {
  submitShipping: () => void;
}

interface IProps extends RouteComponentProps<any> {
  addressSubPageErrors: IFormError[];
  changeSubmitProgress: (submitInProgress: boolean) => void;
  setAddressSubPageErrors: (errors: IFormError[]) => void;
}

const CheckoutShippingSubpageWithRef: RefForwardingComponent<
  ICheckoutShippingSubpageHandles,
  IProps
> = (
  {
    addressSubPageErrors,
    changeSubmitProgress,
    setAddressSubPageErrors,
    ...props
  }: IProps,
  ref
) => {
  const checkoutShippingFormId = "shipping-form";
  const checkoutShippingFormRef = useRef<HTMLFormElement>(null);

  const history = useHistory();
  const {
    checkout,
    availableShippingMethods,
    setShippingMethod,
  } = useCheckout();

  const shippingMethods = availableShippingMethods
    ? availableShippingMethods
    : [];

  useImperativeHandle(ref, () => ({
    submitShipping: () => {
      checkoutShippingFormRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
    },
  }));

  const handleSetShippingMethod = async (
    shippingMethodUpdate: IShippingMethodUpdate,
    clicked = false
  ) => {
    changeSubmitProgress(true);
    const { dataError } = await setShippingMethod(shippingMethodUpdate);
    const errors = dataError?.error;
    changeSubmitProgress(false);
    if (errors) {
      alertService.sendAlert({
        buttonText: "Entendido",
        message: errors?.[0]?.message,
        type: "Error",
      });
      setAddressSubPageErrors(errors);
    } else {
      setAddressSubPageErrors([]);
      if (!clicked) {
        history.push(CHECKOUT_STEPS[1].nextStepLink);
      }
    }
  };

  return (
    <CheckoutShipping
      {...props}
      shippingMethods={shippingMethods}
      selectedShippingMethodId={checkout?.shippingMethod?.id}
      scheduleDate={checkout?.scheduleDate}
      errors={addressSubPageErrors}
      selectShippingMethod={handleSetShippingMethod}
      formId={checkoutShippingFormId}
      formRef={checkoutShippingFormRef}
    />
  );
};

const CheckoutShippingSubpage = forwardRef(CheckoutShippingSubpageWithRef);

export { CheckoutShippingSubpage };
