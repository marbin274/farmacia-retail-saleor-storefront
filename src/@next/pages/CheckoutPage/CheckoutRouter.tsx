import { useCheckoutStepState } from '@hooks';
import { IItems } from '@sdk/api/Cart/types';
import { ICheckout, IPayment } from '@sdk/api/Checkout/types';
import { CheckoutStep, CHECKOUT_STEPS } from '@temp/core/config';
import { useRouter } from 'next/router';
import React, { FC, useState, useEffect } from 'react';

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
  renderPayment,
  renderReview,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const { asPath, push, isReady } = useRouter();
  const step = useCheckoutStepState(items, checkout, payment);

  useEffect(() => {
    if (loaded || !isReady) {
      return;
    }

    setLoaded(true);

    if (step === CheckoutStep.Address && asPath !== CHECKOUT_STEPS[0].link) {
      push(CHECKOUT_STEPS[0].link);
      setRedirecting(true);
      return;
    }

    if (step === CheckoutStep.Payment && asPath !== CHECKOUT_STEPS[1].link) {
      push(CHECKOUT_STEPS[1].link);
      setRedirecting(true);
      return;
    }
  }, [loaded, isReady]);

  useEffect(() => {
    if (redirecting) {
      setRedirecting(false);
    }
  }, [asPath]);

  if (asPath.includes('order') || !loaded || redirecting) {
    return <></>;
  }

  switch (asPath) {
    case CHECKOUT_STEPS[0].link:
      return renderAddress();
    case CHECKOUT_STEPS[1].link:
      return renderPayment();
    default:
      return <></>;
    // TODO: Descomentar cuando se reactive la pagina de review antes de pagar
    // case CHECKOUT_STEPS[2].link:
    //   return renderReview();
  }
};

export { CheckoutRouter };
