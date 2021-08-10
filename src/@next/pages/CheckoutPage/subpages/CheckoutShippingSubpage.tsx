import { CheckoutShipping, CheckoutShippingSlot } from "@components/organisms";
import { useCart, useCheckout } from "@sdk/react";
import { alertService } from "@temp/@next/components/atoms/Alert";
import {
  SHIPPING_METHOD_NOT_FOUND,
  SHIPPING_METHOD_NOT_FOUND_TITLE,
} from "@temp/@next/utils/schemasMessages";
import { IAvailableShippingMethods } from "@temp/@sdk/api/Checkout/types";
import { CheckoutErrorCode } from "@temp/@sdk/gqlTypes/globalTypes";
import { UpdateCheckoutShippingMethod_checkoutShippingMethodUpdate_errors as ICheckoutShippingMethodError } from "@temp/@sdk/mutations/gqlTypes/UpdateCheckoutShippingMethod";
import { IShippingMethodUpdate } from "@temp/@sdk/repository";
import { CHECKOUT_STEPS, INSTALEAP_IS_ACTIVE } from "@temp/core/config";
import { IFormError } from "@types";
import React, {
  forwardRef,
  RefForwardingComponent,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { RouteComponentProps, useHistory } from "react-router";
import shippingMethodCalendarInfoIco from "images/auna/shipping-method-calendar-info.svg";
import { Checkout_availableShippingMethods } from "@temp/@sdk/fragments/gqlTypes/Checkout";

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
    isPrime,
    selectedSlotId,
    slots,
  } = useCheckout();
  const { items } = useCart();

  const isInstaleapActive = INSTALEAP_IS_ACTIVE;

  useEffect(() => {
    checkIfSlotExists();
  }, []);

  const checkIfSlotExists = async () => {
    if (selectedSlotId && isInstaleapActive) {
      changeSubmitProgress(true);
      await setShippingMethod({ shippingMethodId: "", slotId: undefined });
    }

    changeSubmitProgress(false);
  };

  const isPrimeShippingMethod = (sm: Checkout_availableShippingMethods) => {
    return sm.name.toLocaleLowerCase().includes("prime");
  };

  const shippingMethods: IAvailableShippingMethods = [];
  const primeShippingMethodExists = !!availableShippingMethods?.find(x =>
    isPrimeShippingMethod(x)
  );

  availableShippingMethods?.forEach(it => {
    const shippingMethod = { ...it };
    if (it.isScheduled && !shippingMethod.scheduleDates) {
      return;
    } else if (
      (isPrime && primeShippingMethodExists && !isPrimeShippingMethod(it)) ||
      (!isPrime && isPrimeShippingMethod(it))
    ) {
      return;
    } else if (it.isScheduled && shippingMethod.scheduleDates) {
      shippingMethod.scheduleDates = shippingMethod.scheduleDates.filter(
        it => it?.scheduleTimes?.length
      );
    }
    shippingMethods.push(shippingMethod);
  });

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
    const errors: ICheckoutShippingMethodError[] | undefined = dataError?.error;
    changeSubmitProgress(false);
    if (errors) {
      const scheduleTimeNotFound = errors.find(
        it =>
          (it.code === CheckoutErrorCode.NOT_FOUND &&
            it.field === "scheduleTimeId") ||
          it.code === CheckoutErrorCode.SCHEDULE_NOT_AVAILABLE
      );
      setShippingMethod({ shippingMethodId: "", slotId: undefined });
      alertService.sendAlert({
        buttonText: "Entendido",
        icon: scheduleTimeNotFound && shippingMethodCalendarInfoIco,
        message: !scheduleTimeNotFound
          ? errors[0].message
          : SHIPPING_METHOD_NOT_FOUND,
        title: scheduleTimeNotFound && SHIPPING_METHOD_NOT_FOUND_TITLE,
        type: "Error",
      });
      setAddressSubPageErrors(errors as IFormError[]);
    } else {
      setAddressSubPageErrors([]);
      if (!clicked) {
        history.push(CHECKOUT_STEPS[1].nextStepLink);
      }
    }
  };

  if (isInstaleapActive) {
    return (
      <CheckoutShippingSlot
        {...props}
        shippingMethods={shippingMethods}
        selectedShippingMethodId={checkout?.shippingMethod?.id}
        scheduleDate={checkout?.scheduleDate}
        errors={addressSubPageErrors}
        selectShippingMethod={handleSetShippingMethod}
        items={items}
        formId={checkoutShippingFormId}
        formRef={checkoutShippingFormRef}
        slots={slots}
        selectedSlotId={selectedSlotId}
      />
    );
  }

  return (
    <CheckoutShipping
      {...props}
      shippingMethods={shippingMethods}
      selectedShippingMethodId={checkout?.shippingMethod?.id}
      scheduleDate={checkout?.scheduleDate}
      errors={addressSubPageErrors}
      selectShippingMethod={handleSetShippingMethod}
      items={items}
      formId={checkoutShippingFormId}
      formRef={checkoutShippingFormRef}
    />
  );
};

const CheckoutShippingSubpage = forwardRef(CheckoutShippingSubpageWithRef);

export { CheckoutShippingSubpage };
