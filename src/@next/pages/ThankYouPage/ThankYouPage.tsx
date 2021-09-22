import React, { useContext, useState } from 'react';

import { ThankYou } from '@components/organisms';
import { BASE_URL, CHECKOUT_STEPS } from '@temp/core/config';
import { generateGuestOrderDetailsUrl } from '@utils/core';

import { IProps } from './types';
import { OverlayContext } from '@temp/@next/components/organisms/OverlayComponent';
import { useCheckout, useShopDetails } from '@sdk/react';
import { LocalRepository } from '@temp/@sdk/repository';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';

const ThankYouPage: React.FC<IProps> = ({}: IProps) => {
  const router = useRouter();
  const { token, orderNumber, sequentialCode } = router.query;
  const overlay = useContext(OverlayContext);

  const { payment } = useCheckout();

  const localRepository = new LocalRepository();
  const checkout = localRepository.getFinallCheckout();
  const finalUseCart = localRepository.getFinallUseCart();
  const discount = finalUseCart?.discount;
  const shippingPrice = finalUseCart?.shippingPrice;
  const subtotalPrice = finalUseCart?.subtotalPrice;
  const totalPrice = finalUseCart?.totalPrice;
  const items = finalUseCart?.items;

  React.useEffect(() => {
    const repository = new LocalRepository();

    if (isEmpty(repository.getFinallCheckout())) {
      router.push(BASE_URL);
    }

    return () => {
      repository.setFinallCheckout({});
      repository.setFinallUseCart(null);
    };
  }, []);

  const [selectedPaymentGatewayToken] = useState<string | undefined>(
    payment?.token
  );

  const totalProducts: number = React.useMemo(
    () =>
      items?.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0) || 0,
    [items]
  );

  const shippingTaxedPrice =
    checkout?.shippingMethod?.id && shippingPrice
      ? {
          gross: shippingPrice,
          net: shippingPrice,
        }
      : null;

  const promoTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };

  const { data } = useShopDetails();
  const steps = CHECKOUT_STEPS;

  const checkoutData = { ...checkout, token: checkout?.token };

  return (
    <ThankYou
      data={data}
      steps={steps}
      checkout={checkoutData}
      payment={payment}
      promoTaxedPrice={promoTaxedPrice}
      subtotalPrice={subtotalPrice}
      shippingTaxedPrice={shippingTaxedPrice}
      totalPrice={totalPrice}
      totalProducts={totalProducts}
      selectedPaymentGatewayToken={selectedPaymentGatewayToken}
      continueShopping={() => router.push(BASE_URL)}
      orderNumber={orderNumber as string}
      orderDetails={() =>
        router.push(generateGuestOrderDetailsUrl(token as string))
      }
      overlay={overlay}
      sequentialCode={sequentialCode as string}
    />
  );
};

export { ThankYouPage };
