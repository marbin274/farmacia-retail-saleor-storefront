import { Button, Loader } from "@components/atoms";
import { CheckoutProgressBar } from "@components/molecules";
import { CartSummary } from "@components/organisms";
import { Checkout } from "@components/templates";
import { IItems } from "@sdk/api/Cart/types";
import { useCart, useCheckout } from "@sdk/react";
import { removePaymentItems } from "@temp/@next/utils/checkoutValidations";
import { BASE_URL, CHECKOUT_STEPS } from "@temp/core/config";
import { IFormError, ITaxedMoney } from "@types";
import React, { useEffect, useRef, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { CheckoutRouter } from "./CheckoutRouter";
import {
  CheckoutAddressSubpage,
  CheckoutPaymentSubpage,
  CheckoutReviewSubpage,
  CheckoutShippingSubpage,
  ICheckoutAddressSubpageHandles,
  ICheckoutPaymentSubpageHandles,
  ICheckoutReviewSubpageHandles,
  ICheckoutShippingSubpageHandles,
} from "./subpages";
import { IProps } from "./types";

const prepareCartSummary = (
  totalPrice?: ITaxedMoney | null,
  shippingTaxedPrice?: ITaxedMoney | null,
  promoTaxedPrice?: ITaxedMoney | null,
  items?: IItems
) => {
  return (
    <CartSummary
      shipping={shippingTaxedPrice}
      promoCode={promoTaxedPrice}
      total={totalPrice}
      products={items}
    />
  );
};

const getCheckoutProgress = (
  loaded: boolean,
  activeStepIndex: number,
  isShippingRequired: boolean,
  pathName: string
) => {
  const steps = isShippingRequired
    ? CHECKOUT_STEPS
    : CHECKOUT_STEPS.filter(
        ({ onlyIfShippingRequired }) => !onlyIfShippingRequired
      );

  return loaded ? (
    <CheckoutProgressBar
      steps={steps}
      activeStepIndex={activeStepIndex}
      pathName={pathName}
    />
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

  if (!items || !items?.length) {
    removePaymentItems();
    return <Redirect to={BASE_URL} />;
  }

  if (cartLoaded && (!items || !items?.length)) {
    return <Redirect to="/cart/" />;
  }

  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [addressSubPageErrors, setAddressSubPageErrors] = useState<
    IFormError[]
  >([]);

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
    setSelectedPaymentGatewayToken(payment?.token);
  }, [payment?.token]);

  const [requestPayload, setRequestPayload] = useState(null);

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
        if (
          checkoutAddressSubpageRef.current?.handleRequiredFields &&
          checkoutShippingSubpageRef.current?.submitShipping
        ) {
          if (checkoutAddressSubpageRef.current?.handleRequiredFields()) {
            checkoutShippingSubpageRef.current?.submitShipping();
          }
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
              setAddressSubPageErrors={setAddressSubPageErrors}
              addressSubPageErrors={addressSubPageErrors}
              {...props}
            />
            <CheckoutShippingSubpage
              ref={checkoutShippingSubpageRef}
              changeSubmitProgress={setSubmitInProgress}
              setAddressSubPageErrors={setAddressSubPageErrors}
              addressSubPageErrors={addressSubPageErrors}
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
            changeRequestPayload={setRequestPayload}
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
      selectedPaymentGateway={selectedPaymentGateway}
      loading={submitInProgress}
      navigation={getCheckoutProgress(
        cartLoaded && checkoutLoaded,
        activeStepIndex,
        !!isShippingRequiredForProducts,
        pathname
      )}
      cartSummary={prepareCartSummary(
        totalPrice,
        shippingTaxedPrice,
        promoTaxedPrice,
        items
      )}
      checkout={checkoutView}
      button={getButton(activeStep.nextActionName, handleNextStepClick)}
    />
  );
};

export { CheckoutPage };
