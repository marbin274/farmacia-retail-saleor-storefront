import { useCheckoutStepState } from '@hooks';
import { IItems } from '@sdk/api/Cart/types';
import { ICheckout, IPayment } from '@sdk/api/Checkout/types';
import { CHECKOUT_STEPS } from '@temp/core/config';
import router, { useRouter } from 'next/router';
import React, { FC } from 'react';

type IRouterProps = {
  items?: IItems;
  checkout?: ICheckout;
  payment?: IPayment;
  renderAddress: () => React.ReactElement<any, any>;
  // renderShipping: (props: RouteComponentProps<any>) => React.ReactNode;
  renderPayment: () => React.ReactElement<any, any>;
  renderReview: () => React.ReactElement<any, any>;
};

const CheckoutRouter: FC<IRouterProps> = ({
  items,
  checkout,
  payment,
  renderAddress,
  // renderShipping,
  renderPayment,
  renderReview,
}) => {
  const { asPath } = useRouter();
  const step = useCheckoutStepState(items, checkout, payment);

  const getStepLink = () =>
    CHECKOUT_STEPS.find((stepObj) => stepObj.step === step)?.link ||
    CHECKOUT_STEPS[0].link;

  if (asPath.includes('order')) return null;

  switch (asPath) {
    case CHECKOUT_STEPS[0].link:
      return renderAddress();
    case CHECKOUT_STEPS[1].link:
      return renderPayment();
    case CHECKOUT_STEPS[2].link:
      return renderReview();
    default:
      router.push(getStepLink());
      return <></>;
  }
};

export { CheckoutRouter };
