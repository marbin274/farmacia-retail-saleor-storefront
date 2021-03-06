import { useEffect, useState } from 'react';

import { IItems } from '@sdk/api/Cart/types';
import { ICheckout, IPayment } from '@sdk/api/Checkout/types';
import { CheckoutStep } from '@temp/core/config';
import { LocalRepository } from '@temp/@sdk/repository';

export const useCheckoutStepState = (
  items?: IItems,
  checkout?: ICheckout,
  payment?: IPayment
): CheckoutStep => {
  const localRepository = new LocalRepository();
  const isShippingRequiredForProducts =
    items &&
    items.some(
      ({ variant }) => variant.product?.productType.isShippingRequired
    );

  const getStep = () => {
    if (
      !checkout?.shippingMethod?.id ||
      (!checkout?.id && items && isShippingRequiredForProducts)
    ) {
      return CheckoutStep.Address;
    } else if ((!checkout?.id && items) || !localRepository.getPurchase()) {
      return CheckoutStep.Payment;
    }

    const isShippingStep =
      !!checkout?.shippingAddress || !isShippingRequiredForProducts;
    const isPaymentStep =
      (isShippingStep && !!checkout?.shippingMethod) ||
      !isShippingRequiredForProducts;
    // TODO: Descomentar cuando se reactive la pagina de review antes de pagar
    // const isReviewStep =
    //   isPaymentStep && !!checkout?.billingAddress && !!payment?.id;

    // if (isReviewStep) {
    //   return CheckoutStep.Review;
    // } else
    // } else if (isShippingStep) {
    //   return CheckoutStep.Shipping;
    return isPaymentStep ? CheckoutStep.Payment : CheckoutStep.Address;
  };

  const [step, setStep] = useState(getStep());

  useEffect(() => {
    const newStep = getStep();
    if (step !== newStep) {
      setStep(newStep);
    }
  }, [checkout, items, payment]);

  return step;
};
