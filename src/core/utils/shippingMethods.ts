import { Checkout_availableShippingMethods } from '@temp/@sdk/fragments/gqlTypes/Checkout';
import { SHIPPING_TYPES } from '../config';

export const isPrimeShippingMethod = (
  shippingMethod: Checkout_availableShippingMethods
) => {
  if (!shippingMethod?.methodType) {
    return false;
  }

  return shippingMethod.methodType.code.includes(SHIPPING_TYPES.scheduled);
};

export const isScheduledShippingMethod = (
  shippingMethod: Checkout_availableShippingMethods
) => {
  if (!shippingMethod?.methodType) {
    return false;
  }

  return shippingMethod.methodType.code.includes(SHIPPING_TYPES.scheduled);
};

export const isExpressShippingMethod = (
  shippingMethod: Checkout_availableShippingMethods
) => {
  if (!shippingMethod?.methodType) {
    return false;
  }

  return shippingMethod.methodType.code.includes(SHIPPING_TYPES.express);
};
