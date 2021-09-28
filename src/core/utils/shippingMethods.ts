import { Checkout_availableShippingMethods } from '@temp/@sdk/fragments/gqlTypes/Checkout';
import { ShippingMethodTypeCode } from '@temp/@sdk/gqlTypes/globalTypes';

export const isPrimeShippingMethod = (
  shippingMethod: Partial<Checkout_availableShippingMethods>
) => {
  if (!shippingMethod?.methodType) {
    return false;
  }

  const { code } = shippingMethod.methodType;

  return (
    code === ShippingMethodTypeCode.EXPRESS_PRIME ||
    code === ShippingMethodTypeCode.SCHEDULED_PRIME
  );
};

export const isScheduledShippingMethod = (
  shippingMethod: Partial<Checkout_availableShippingMethods>
) => {
  if (!shippingMethod?.methodType) {
    return false;
  }

  const { code } = shippingMethod.methodType;

  return (
    code === ShippingMethodTypeCode.SCHEDULED ||
    code === ShippingMethodTypeCode.SCHEDULED_PRIME
  );
};

export const isExpressShippingMethod = (
  shippingMethod: Partial<Checkout_availableShippingMethods>
) => {
  if (!shippingMethod?.methodType) {
    return false;
  }

  const { code } = shippingMethod.methodType;

  return (
    code === ShippingMethodTypeCode.EXPRESS ||
    code === ShippingMethodTypeCode.EXPRESS_30 ||
    code === ShippingMethodTypeCode.EXPRESS_NEXT_DAY ||
    code === ShippingMethodTypeCode.EXPRESS_PRIME
  );
};
