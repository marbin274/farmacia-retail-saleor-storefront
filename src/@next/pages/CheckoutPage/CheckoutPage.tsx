import React, { useEffect, useRef, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";

import { Button, Loader } from "@components/atoms";
import { CheckoutProgressBar } from "@components/molecules";
import { CartSummary } from "@components/organisms";
import { Checkout } from "@components/templates";
import { IItems } from "@sdk/api/Cart/types";
import { useCart, useCheckout } from "@sdk/react";
import { CHECKOUT_STEPS } from "@temp/core/config";
import { ITaxedMoney } from "@types";

import { CheckoutRouter } from "./CheckoutRouter";
import {
  CheckoutAddressSubpage,
  CheckoutPaymentSubpage,
  CheckoutReviewSubpage,
  CheckoutShippingSubpage,
  // CheckoutShippingSubpage,
  ICheckoutAddressSubpageHandles,
  ICheckoutPaymentSubpageHandles,
  ICheckoutReviewSubpageHandles,
  ICheckoutShippingSubpageHandles,
  // ICheckoutShippingSubpageHandles,
} from "./subpages";
import { IProps } from "./types";

const prepareCartSummary = (
  totalPrice?: ITaxedMoney | null,
  shippingTaxedPrice?: ITaxedMoney | null,
  promoTaxedPrice?: ITaxedMoney | null,
  items?: IItems
) => {
  const products = items?.map(({ id, variant, totalPrice, quantity }) => ({
    id: id || "",
    name: variant.product?.name || "",
    price: {
      gross: {
        amount: totalPrice?.gross.amount || 0,
        culture: totalPrice?.gross.culture || "",
        currency: totalPrice?.gross.currency || "",
      },
      net: {
        amount: totalPrice?.net.amount || 0,
        culture: totalPrice?.net.culture || "",
        currency: totalPrice?.net.currency || "",
      },
    },
    quantity,
    sku: variant.sku || "",
    thumbnail: {
      alt: variant.product?.thumbnail?.alt || undefined,
      url: variant.product?.thumbnail?.url,
      url2x: variant.product?.thumbnail2x?.url,
    },
  }));

  return (
    <CartSummary
      shipping={shippingTaxedPrice}
      promoCode={promoTaxedPrice}
      total={totalPrice}
      products={products}
    />
  );
};

const getCheckoutProgress = (
  loaded: boolean,
  activeStepIndex: number,
  isShippingRequired: boolean
) => {
  const steps = isShippingRequired
    ? CHECKOUT_STEPS
    : CHECKOUT_STEPS.filter(
        ({ onlyIfShippingRequired }) => !onlyIfShippingRequired
      );

  return loaded ? (
    <CheckoutProgressBar steps={steps} activeStepIndex={activeStepIndex} />
  ) : null;
};

const getButton = (text: string, onClick: () => void) => {
  if (text) {
    return (
      <Button data-cy="checkoutPageBtnNextStep" onClick={onClick} type="submit">
        {text}
      </Button>
    );
  } else {
    return null;
  }
};

const CheckoutPage: React.FC<IProps> = ({}: IProps) => {
  const { pathname } = useLocation();
  const {
    loaded: cartLoaded,
    shippingPrice,
    discount,
    totalPrice,
    items,
  } = useCart();
  const { loaded: checkoutLoaded, checkout, payment } = useCheckout();

  if (cartLoaded && (!items || !items?.length)) {
    return <Redirect to="/cart/" />;
  }

  const [submitInProgress, setSubmitInProgress] = useState(false);

  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState<
    string | undefined
  >(payment?.gateway);
  const [
    selectedPaymentGatewayToken,
    setSelectedPaymentGatewayToken,
  ] = useState<string | undefined>(payment?.token);

  useEffect(() => {
    setSelectedPaymentGateway(payment?.gateway);
  }, [payment?.gateway]);

  useEffect(() => {
    // console.log('here');
    // console.log(payment);
    setSelectedPaymentGatewayToken(payment?.token);
  }, [payment?.token]);

  const [requestPayload, setRequestPayload] = useState(null);

  useEffect(() => {
    const payload: any = {
      purchase_number: new Date().getUTCMilliseconds(),
    };

    setRequestPayload(payload);
  },[]);

  const matchingStepIndex = CHECKOUT_STEPS.findIndex(
    ({ link }) => link === pathname
  );
  const activeStepIndex = matchingStepIndex !== -1 ? matchingStepIndex : 2;
  const activeStep = CHECKOUT_STEPS[activeStepIndex];

  const checkoutAddressSubpageRef = useRef<ICheckoutAddressSubpageHandles>(
    null
  );
  const checkoutShippingSubpageRef = useRef<ICheckoutShippingSubpageHandles>(
    null
  );
  const checkoutPaymentSubpageRef = useRef<ICheckoutPaymentSubpageHandles>(
    null
  );
  const checkoutReviewSubpageRef = useRef<ICheckoutReviewSubpageHandles>(null);

  const handleNextStepClick = () => {
    switch (activeStepIndex) {
      case 0:
        // if (checkoutAddressSubpageRef.current?.submitAddress) {
        //   checkoutAddressSubpageRef.current?.submitAddress();
        // }
        if (checkoutShippingSubpageRef.current?.submitShipping) {
          checkoutShippingSubpageRef.current?.submitShipping();
        }
        break;
      // case 1:
      //   if (checkoutShippingSubpageRef.current?.submitShipping) {
      //     checkoutShippingSubpageRef.current?.submitShipping();
      //   }
      //   break;
      case 1:
        if (checkoutPaymentSubpageRef.current?.submitPayment) {
          checkoutPaymentSubpageRef.current?.submitPayment();
        }
        break;
      case 2:
        if (checkoutReviewSubpageRef.current?.complete) {
          checkoutReviewSubpageRef.current?.complete();
        }
        break;
    }
  };
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

  const checkoutView =
    cartLoaded && checkoutLoaded ? (
      <CheckoutRouter
        items={items}
        checkout={checkout}
        payment={payment}
        renderAddress={props => (
          <div>
            <CheckoutAddressSubpage
              ref={checkoutAddressSubpageRef}
              changeSubmitProgress={setSubmitInProgress}
              {...props}
            />
            <CheckoutShippingSubpage
                ref={checkoutShippingSubpageRef}
                changeSubmitProgress={setSubmitInProgress}
                {...props}
              />
          </div>

        )}
        // renderShipping={props => (
        //   <CheckoutShippingSubpage
        //     ref={checkoutShippingSubpageRef}
        //     changeSubmitProgress={setSubmitInProgress}
        //     {...props}
        //   />
        // )}
        renderPayment={props => (
          <CheckoutPaymentSubpage
            ref={checkoutPaymentSubpageRef}
            selectedPaymentGateway={selectedPaymentGateway}
            selectedPaymentGatewayToken={selectedPaymentGatewayToken}
            changeSubmitProgress={setSubmitInProgress}
            selectPaymentGateway={setSelectedPaymentGateway}
            requestPayload={requestPayload}
            {...props}
          />
        )}
        renderReview={props => (
          <CheckoutReviewSubpage
            ref={checkoutReviewSubpageRef}
            selectedPaymentGatewayToken={selectedPaymentGatewayToken}
            changeSubmitProgress={setSubmitInProgress}
            requestPayload={requestPayload}
            {...props}
          />
        )}
      />
    ) : (
      <Loader />
    );

  const isShippingRequiredForProducts =
    items &&
    items.some(
      ({ variant }) => variant.product?.productType.isShippingRequired
    );

  return (
    <Checkout
      loading={submitInProgress}
      navigation={getCheckoutProgress(
        cartLoaded && checkoutLoaded,
        activeStepIndex,
        !!isShippingRequiredForProducts
      )}
      cartSummary={prepareCartSummary(
        totalPrice,
        shippingTaxedPrice,
        promoTaxedPrice,
        items
      )}
      checkout={checkoutView}
      button={getButton(
        activeStep.nextActionName,
        handleNextStepClick
      )}
    />
  );
};

export { CheckoutPage };
