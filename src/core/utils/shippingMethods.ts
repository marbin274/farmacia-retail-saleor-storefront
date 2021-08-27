import { Checkout_availableShippingMethods } from '@temp/@sdk/fragments/gqlTypes/Checkout';
import { SHIPPING_TYPES, SHIPPING_SUBTYPES } from '../config';

export const isPrimeShippingMethod = (
  shippingMethod: Partial<Checkout_availableShippingMethods>
) => {
  if (!shippingMethod?.methodType) {
    return false;
  }

  return shippingMethod.methodType.code.includes(SHIPPING_SUBTYPES.prime);
};

export const isScheduledShippingMethod = (
  shippingMethod: Partial<Checkout_availableShippingMethods>
) => {
  if (!shippingMethod?.methodType) {
    return false;
  }

  return shippingMethod.methodType.code.includes(SHIPPING_TYPES.scheduled);
};

export const isExpressShippingMethod = (
  shippingMethod: Partial<Checkout_availableShippingMethods>
) => {
  if (!shippingMethod?.methodType) {
    return false;
  }

  return shippingMethod.methodType.code.includes(SHIPPING_TYPES.express);
};
