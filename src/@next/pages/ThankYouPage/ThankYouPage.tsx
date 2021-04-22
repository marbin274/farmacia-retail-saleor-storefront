import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { ThankYou } from "@components/organisms";
import { BASE_URL, CHECKOUT_STEPS } from "@temp/core/config";
import { generateGuestOrderDetailsUrl } from "@utils/core";

import { IProps } from "./types";
import { OverlayContext } from "@temp/components/Overlay"
import {  useCheckout, useShopDetails } from '@sdk/react';
import { LocalRepository } from "@temp/@sdk/repository";
import { isEmpty } from "lodash";



const ThankYouPage: React.FC<IProps> = ({}: IProps) => {

  const location = useLocation();
  const history = useHistory();
  const { token, orderNumber, sequentialCode } = location.state;
  const overlay = useContext(OverlayContext);
  
  const {
    payment,
  } = useCheckout();

  const localRepository = new LocalRepository();
  const checkout = localRepository.getFinallCheckout();
  const finalUseCart = localRepository.getFinallUseCart();
  const discount = finalUseCart?.discount;
  const shippingPrice = finalUseCart?.shippingPrice;
  const subtotalPrice = finalUseCart?.subtotalPrice;
  const totalPrice = finalUseCart?.totalPrice;
  const items = finalUseCart?.items;

  React.useEffect(()=>{    
    const repository = new LocalRepository();
    if(isEmpty(repository.getFinallCheckout())){
      history.push(BASE_URL)
    }
   
    return ()=> {
      repository.setFinallCheckout({});
      repository.setFinallUseCart(null);
    }

  },[])

  

  const [
    selectedPaymentGatewayToken,
  ] = useState<string | undefined>(payment?.token);

  const totalProducts: number = React.useMemo(()=>
  items?.reduce(
    (prevVal, currVal) => prevVal + currVal.quantity,
    0
  ) || 0, [items]);

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

  const checkoutData = {...checkout, token: checkout?.token}
  
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
      continueShopping={() => history.push(BASE_URL)}
      orderNumber={orderNumber}
      orderDetails={() => history.push(generateGuestOrderDetailsUrl(token))}
      overlay={overlay}
      sequentialCode={sequentialCode}
    />
  );
};

export { ThankYouPage };
