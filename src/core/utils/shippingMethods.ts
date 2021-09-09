import { Checkout_availableShippingMethods } from '@temp/@sdk/fragments/gqlTypes/Checkout';
import { SHIPPING_TYPE_KEYWORDS } from '../config';

export const isPrimeShippingMethod = (
  shippingMethod: Partial<Checkout_availableShippingMethods>
) => {
  if (!shippingMethod?.methodType) {
    return false;
  }

  return shippingMethod.methodType.code.includes(SHIPPING_TYPE_KEYWORDS.prime);
};

export const isScheduledShippingMethod = (
  shippingMethod: Partial<Checkout_availableShippingMethods>
) => {
  if (!shippingMethod?.methodType) {
    return false;
  }

  return shippingMethod.methodType.code.includes(
    SHIPPING_TYPE_KEYWORDS.scheduled
  );
};

export const isExpressShippingMethod = (
  shippingMethod: Partial<Checkout_availableShippingMethods>
) => {
  if (!shippingMethod?.methodType) {
    return false;
  }

  return shippingMethod.methodType.code.includes(
    SHIPPING_TYPE_KEYWORDS.express
  );
};
