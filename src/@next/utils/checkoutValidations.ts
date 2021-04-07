import { IAvailableShippingMethods, ICheckout } from "@temp/@sdk/api/Checkout/types";
import { Checkout_availableShippingMethods, Checkout_availableShippingMethods_scheduleDates_scheduleTimes } from "@temp/@sdk/fragments/gqlTypes/Checkout";
import { SHIPPING_FORMAT_DATE } from "@temp/core/config";
import { format } from "date-fns";
import { diffHours, getStringToTime } from "./dateUtils";

interface ICheckAttentionSchedule { 
  shippingMethodInAvailables?: Checkout_availableShippingMethods; 
  scheduleTimeSelected?: Checkout_availableShippingMethods_scheduleDates_scheduleTimes | null; 
  isAttentionSchedule?: boolean 
}

// Remove specific items from local storage when cart is edited in the checkout process.
export const removePaymentItems = (): void => {
  localStorage.removeItem("purchase_number");
  localStorage.removeItem("data_payment");
};

export const checkAttentionSchedule = (
  checkoutLoaded: boolean,
  checkout?: ICheckout,
  availableShippingMethods?: IAvailableShippingMethods)
  : ICheckAttentionSchedule => {

  if (
    (checkoutLoaded && checkout) &&
    (checkout.shippingMethod && checkout.shippingMethod.id) &&
    (checkout.scheduleDate && checkout.scheduleDate.id)
  ) {

    const shippingMethodInAvailables = availableShippingMethods?.find(it => it.id === checkout.shippingMethod?.id);
    const scheduleDateSelected = shippingMethodInAvailables?.scheduleDates
    ?.find(it => it?.date === checkout.scheduleDate?.date);
    const scheduleTimeSelected = scheduleDateSelected
      ?.scheduleTimes
      ?.find(it => it?.id === checkout.scheduleDate?.scheduleTime?.id);
    
    let isAttentionSchedule = !!scheduleTimeSelected;
    const now:Date = new Date();
    const nowString = format(now, SHIPPING_FORMAT_DATE);
    const dateSelected: string = scheduleDateSelected?.date ? scheduleDateSelected.date : now;
    
    if ((dateSelected === nowString) &&scheduleTimeSelected && scheduleTimeSelected.startTime) {
      const startTime = getStringToTime(scheduleTimeSelected.startTime);
      isAttentionSchedule = diffHours(now, startTime) < -2;
    }

    return { shippingMethodInAvailables, scheduleTimeSelected, isAttentionSchedule }

  }
  return {};

}
