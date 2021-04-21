import { Button, Loader } from "@components/atoms";
import { CheckoutProgressBar } from "@components/molecules";
import { CartSummary } from "@components/organisms";
import { Checkout } from "@components/templates";
import { IItems } from "@sdk/api/Cart/types";
import {
  ecommerceProductsMapper,
  launchCheckoutEvent,
  steps
} from "@sdk/gaConfig";
import { useCart, useCheckout } from "@sdk/react";
import { alertService } from "@temp/@next/components/atoms/Alert";
import {
  checkAttentionSchedule,
  removePaymentItems
} from "@temp/@next/utils/checkoutValidations";
import { LocalRepository } from "@temp/@sdk/repository";
import { BASE_URL, CHECKOUT_STEPS } from "@temp/core/config";
import { IFormError, ITaxedMoney } from "@types";
import shippingMethodCalendarInfoIco from "images/auna/shipping-method-calendar-info.svg";
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
  ICheckoutShippingSubpageHandles
} from "./subpages";
import { IProps } from "./types";
import { CartDeliveryDataModal } from '../../components/organisms/CartDeliveryDataModal/CartDeliveryDataModal';
const prepareCartSummary = (
  activeStepIndex: number,
  onClickHandle: () => void,
  subtotalPrice?: ITaxedMoney | null,
  totalPrice?: ITaxedMoney | null,
  shippingTaxedPrice?: ITaxedMoney | null,
  promoTaxedPrice?: ITaxedMoney | null,
  items?: IItems
) => {
  return (
    <CartSummary
      subtotal={subtotalPrice}
      shipping={shippingTaxedPrice}
      promoCode={promoTaxedPrice}
      total={totalPrice}
      products={items}
      activeStepIndex={activeStepIndex}
      onClickHandle={onClickHandle}
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
    discount,
    shippingPrice,
    subtotalPrice,
    totalPrice,
    items,
  } = useCart();
  
  const localRepository = new LocalRepository()
  if (items!==undefined){
    localRepository.setFinallUseCart({
      discount,
      items,
      shippingPrice,
      subtotalPrice,
      totalPrice,
    })
  }
  

  const {
    availableShippingMethods,
    loaded: checkoutLoaded,
    checkout,
    payment,
    setShippingMethod,
  } = useCheckout();
  

  const { isAttentionSchedule } = checkAttentionSchedule(
    checkoutLoaded,
    checkout,
    availableShippingMethods
  );

  if (!items || !items?.length) {
    removePaymentItems();
    return <Redirect to={BASE_URL} />;
  }

  if (isAttentionSchedule === false) {
    alertService.sendAlert({
      acceptDialog: () => {
        setShippingMethod({ shippingMethodId: "" });
      },
      buttonText: "Entendido",
      icon: shippingMethodCalendarInfoIco,
      message:
        "Hemos actualizado los horarios disponibles para entregar tu pedido, por favor escoge nuevamente",
      title: "Horario de entrega",
      type: "Info",
    });
  }

  if (cartLoaded && (!items || !items?.length)) {
    return <Redirect to="/cart/" />;
  }

  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [addressSubPageErrors, setAddressSubPageErrors] = useState<
    IFormError[]
  >([]);

  const [displayModalShowDetail, setDisplayModalShowDetail] = useState(false);  


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
        if (
          checkoutAddressSubpageRef.current?.handleRequiredFields &&
          checkoutShippingSubpageRef.current?.submitShipping
        ) {
          if (checkoutAddressSubpageRef.current?.handleRequiredFields()) {
            checkoutShippingSubpageRef.current?.submitShipping();
          }
        }
        break;
      case 1:
        if (checkoutPaymentSubpageRef.current?.submitPayment) {
          checkoutPaymentSubpageRef.current?.submitPayment();
        }
        launchCheckoutEvent(steps.review, ecommerceProductsMapper(items));
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

  const [firstEventSend, setFirstEventSend] = useState(false);

  const sendEventForCheckoutAddress = () => {
    setFirstEventSend(true);
    launchCheckoutEvent(steps.address, ecommerceProductsMapper(items));
  };
  const sendEventForCheckoutPayment = () => {
    launchCheckoutEvent(steps.payment, ecommerceProductsMapper(items));
  };

  const sendEventsForCheckoutAddressAndPayment = () => {
    launchCheckoutEvent(steps.address, ecommerceProductsMapper(items));
    launchCheckoutEvent(steps.payment, ecommerceProductsMapper(items));
  };
  React.useEffect(() => {
    if (pathname === "/checkout/address") {
      sendEventForCheckoutAddress();
    }
    if (pathname === "/checkout/payment" && !firstEventSend) {
      sendEventsForCheckoutAddressAndPayment();
    }

    if (pathname === "/checkout/payment" && firstEventSend) {
      sendEventForCheckoutPayment();
    }
  }, [pathname]);

  const checkoutView =
    cartLoaded && checkoutLoaded ? (
      <CheckoutRouter
        items={items}
        checkout={checkout}
        payment={payment}
        renderAddress={props => (
          <>
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
          </>
        )}
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

  const onClickHandle = () => {
    setDisplayModalShowDetail(true);
  };
  return (
    <>
      {displayModalShowDetail  && (
         <CartDeliveryDataModal
          checkout={checkout}
          hideModal={()=>{setDisplayModalShowDetail(false);}}
          title="Datos de entrega"
       />
      )}
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
          activeStepIndex,
          onClickHandle,
          subtotalPrice,
          totalPrice,
          shippingTaxedPrice,
          promoTaxedPrice,
          items
        )}
        checkout={checkoutView}
        button={getButton(activeStep.nextActionName, handleNextStepClick)}
      />
    </>
  );
};

export { CheckoutPage };
