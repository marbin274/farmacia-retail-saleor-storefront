import { useFeaturePlugins } from '@app/hooks';
import { CheckoutShipping, CheckoutShippingSlot } from '@components/organisms';
import { useCart, useCheckout } from '@sdk/react';
import { alertService } from '@temp/@next/components/atoms/Alert';
import {
  SHIPPING_METHOD_NOT_FOUND,
  SHIPPING_METHOD_NOT_FOUND_TITLE,
} from '@temp/@next/utils/schemasMessages';
import { IAvailableShippingMethods } from '@temp/@sdk/api/Checkout/types';
import { CheckoutErrorCode } from '@temp/@sdk/gqlTypes/globalTypes';
import { UpdateCheckoutShippingMethod_checkoutShippingMethodUpdate_errors as ICheckoutShippingMethodError } from '@temp/@sdk/mutations/gqlTypes/UpdateCheckoutShippingMethod';
import { IShippingMethodUpdate } from '@temp/@sdk/repository';
import { CHECKOUT_STEPS } from '@temp/core/config';
import {
  isPrimeShippingMethod,
  isScheduledShippingMethod,
} from '@temp/core/utils';
import { IFormError } from '@types';
import { useRouter } from 'next/router';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useRef,
} from 'react';

export interface ICheckoutShippingSubpageHandles {
  submitShipping: () => void;
}

interface IProps {
  addressSubPageErrors: IFormError[];
  changeSubmitProgress: (submitInProgress: boolean) => void;
  setAddressSubPageErrors: (errors: IFormError[]) => void;
}

const CheckoutShippingSubpageWithRef: ForwardRefRenderFunction<
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
  const checkoutShippingFormId = 'shipping-form';
  const checkoutShippingFormRef = useRef<HTMLFormElement>(null);

  const router = useRouter();
  const {
    checkout,
    availableShippingMethods,
    setShippingMethod,
    isPrime,
    slots,
    selectedSlotId,
    userSelectedSlotId,
  } = useCheckout();
  const { items } = useCart();

  const { lastMileActive } = useFeaturePlugins();

  const shippingMethods: IAvailableShippingMethods = [];
  const primeShippingMethodExists = !!availableShippingMethods?.find((x) =>
    isPrimeShippingMethod(x)
  );

  availableShippingMethods?.forEach((it) => {
    const shippingMethod = { ...it };
    if (isScheduledShippingMethod(it) && !shippingMethod.scheduleDates) {
      return;
    } else if (
      (isPrime && primeShippingMethodExists && !isPrimeShippingMethod(it)) ||
      (!isPrime && isPrimeShippingMethod(it))
    ) {
      return;
    } else if (isScheduledShippingMethod(it) && shippingMethod.scheduleDates) {
      shippingMethod.scheduleDates = shippingMethod.scheduleDates.filter(
        (it) => it?.scheduleTimes?.length
      );
    }
    shippingMethods.push(shippingMethod);
  });

  useImperativeHandle(ref, () => ({
    submitShipping: () => {
      checkoutShippingFormRef.current?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    },
  }));

  const handleSetShippingMethod = async (
    shippingMethodUpdate: IShippingMethodUpdate,
    clicked = false
  ) => {
    changeSubmitProgress(true);

    if (shippingMethodUpdate.slotId === userSelectedSlotId) {
      shippingMethodUpdate.slotId = selectedSlotId;
    }

    const { dataError } = await setShippingMethod(shippingMethodUpdate);
    const errors: ICheckoutShippingMethodError[] | undefined = dataError?.error;
    changeSubmitProgress(false);
    if (errors) {
      const scheduleTimeNotFound = errors.find(
        (it) =>
          (it.code === CheckoutErrorCode.NOT_FOUND &&
            it.field === 'scheduleTimeId') ||
          it.code === CheckoutErrorCode.SCHEDULE_NOT_AVAILABLE
      );
      setShippingMethod({ shippingMethodId: '', slotId: undefined });

      alertService.sendAlert({
        buttonText: 'Entendido',
        icon:
          scheduleTimeNotFound &&
          '/assets/auna/shipping-method-calendar-info.svg',
        message: !scheduleTimeNotFound
          ? errors[0].message
          : SHIPPING_METHOD_NOT_FOUND,
        title: scheduleTimeNotFound && SHIPPING_METHOD_NOT_FOUND_TITLE,
        type: 'Error',
      });
      setAddressSubPageErrors(errors as IFormError[]);
    } else {
      setAddressSubPageErrors([]);
      if (!clicked) {
        router.push(CHECKOUT_STEPS[0].nextStepLink);
      }
    }
  };

  if (lastMileActive) {
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
        selectedSlotId={userSelectedSlotId}
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
