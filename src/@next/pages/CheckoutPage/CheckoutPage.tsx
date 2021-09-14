import { useFeaturePlugins } from '@app/hooks';
import { Loader } from '@components/atoms';
import { alertService } from '@components/atoms/Alert';
import { CartResume, CheckoutProgressBar } from '@components/molecules';
import { CartSummary } from '@components/organisms';
import { CartDeliveryDataModal } from '@components/organisms/CartDeliveryDataModal/CartDeliveryDataModal';
import { Checkout } from '@components/templates';
import { Button } from '@farmacia-retail/farmauna-components';
import { IItems } from '@sdk/api/Cart/types';
import {
  ecommerceProductsMapper,
  launchCheckoutEvent,
  steps,
} from '@sdk/gaConfig';
import { useCart, useCheckout } from '@sdk/react';
import { checkAttentionSchedule } from '@sdk/utils/checkoutValidations';
import { smallScreen } from '@temp/@next/globalStyles/constants';
import { removePaymentItems } from '@temp/@next/utils/checkoutValidations';
import {
  SHIPPING_METHOD_NOT_FOUND,
  SHIPPING_METHOD_NOT_FOUND_TITLE,
} from '@temp/@next/utils/schemasMessages';
import { LocalRepository } from '@temp/@sdk/repository';
import { BASE_URL, CHECKOUT_STEPS } from '@temp/core/config';
import { IFormError, ITaxedMoney } from '@types';
import shippingMethodCalendarInfoIco from 'images/auna/shipping-method-calendar-info.svg';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Media from 'react-media';
import { Redirect, useLocation } from 'react-router-dom';
import { CheckoutRouter } from './CheckoutRouter';
import {
  CheckoutAddressSubpage,
  CheckoutPaymentSubpage,
  CheckoutReviewSubpage,
  CheckoutShippingSubpage,
  ICheckoutAddressSubpageHandles,
  ICheckoutPaymentSubpageHandles,
  ICheckoutReviewSubpageHandles,
  ICheckoutShippingSubpageHandles,
} from './subpages';
import { IProps } from './types';
import { CheckoutContextProvider } from './contexts';

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

const prepareCartResume = (
  activeStepIndex: number,
  onClickHandle: () => void,
  totalProducts: number,
  subtotalPrice?: ITaxedMoney | null,
  totalPrice?: ITaxedMoney | null,
  shippingTaxedPrice?: ITaxedMoney | null,
  promoTaxedPrice?: ITaxedMoney | null
) => {
  return (
    <Media
      query={{ maxWidth: smallScreen }}
      render={() => (
        <CartResume
          activeStepIndex={activeStepIndex}
          onClickHandle={onClickHandle}
          promoPrice={promoTaxedPrice}
          subTotalPrice={subtotalPrice}
          shippingPrice={shippingTaxedPrice}
          totalPrice={totalPrice}
          totalProducts={totalProducts}
        />
      )}
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

const getButton = (
  text: string,
  checkoutId: string | undefined,
  onClick: () => void
) => {
  return text ? (
    <Button
      data-cy="checkoutPageBtnNextStep"
      onClick={onClick}
      disabled={!checkoutId}
      type="submit"
    >
      {text}
    </Button>
  ) : null;
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

  const localRepository = new LocalRepository();
  if (items !== undefined) {
    localRepository.setFinallUseCart({
      discount,
      items,
      shippingPrice,
      subtotalPrice,
      totalPrice,
    });
  }

  const {
    availableShippingMethods,
    loaded: checkoutLoaded,
    checkout,
    payment,
    setShippingMethod,
  } = useCheckout();

  const { lastMileActive } = useFeaturePlugins();

  const { isAttentionSchedule } = checkAttentionSchedule(
    checkoutLoaded,
    checkout,
    availableShippingMethods
  );

  if (!items || !items?.length) {
    removePaymentItems();
    return <Redirect to={BASE_URL} />;
  }

  useEffect(() => {
    if (isAttentionSchedule === false && !lastMileActive) {
      alertService.sendAlert({
        acceptDialog: () => {
          setShippingMethod({ shippingMethodId: '', slotId: undefined });
        },
        buttonText: 'Entendido',
        icon: shippingMethodCalendarInfoIco,
        message: SHIPPING_METHOD_NOT_FOUND,
        title: SHIPPING_METHOD_NOT_FOUND_TITLE,
        type: 'Info',
      });
    }
  }, [isAttentionSchedule]);

  if (cartLoaded && (!items || !items?.length)) {
    return <Redirect to="/cart/" />;
  }

  const totalProducts: number = useMemo(() => {
    return items
      ? items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)
      : 0;
  }, [items]);

  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [addressSubPageErrors, setAddressSubPageErrors] = useState<
    IFormError[]
  >([]);

  const [displayModalShowDetail, setDisplayModalShowDetail] = useState(false);

  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState<
    string | undefined
  >(payment?.gateway);
  const [selectedPaymentGatewayToken, setSelectedPaymentGatewayToken] =
    useState<string | undefined>(payment?.token);

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

  const checkoutAddressSubpageRef =
    useRef<ICheckoutAddressSubpageHandles>(null);
  const checkoutShippingSubpageRef =
    useRef<ICheckoutShippingSubpageHandles>(null);
  const checkoutPaymentSubpageRef =
    useRef<ICheckoutPaymentSubpageHandles>(null);
  const checkoutReviewSubpageRef = useRef<ICheckoutReviewSubpageHandles>(null);

  const handleNextStepClick = () => {
    switch (activeStepIndex) {
      case 0:
        if (!checkout?.id && checkoutAddressSubpageRef.current?.submitAddress) {
          checkoutAddressSubpageRef.current?.submitAddress();
        }
        if (
          checkout?.id &&
          checkoutShippingSubpageRef.current?.submitShipping
        ) {
          checkoutShippingSubpageRef.current?.submitShipping();
        }
        break;
      case 1:
        if (checkoutPaymentSubpageRef.current?.submitPayment) {
          checkoutPaymentSubpageRef.current?.submitPayment();
        }
        launchCheckoutEvent(
          steps.reviewCheckoutRoute,
          ecommerceProductsMapper(items)
        );
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

  const [addressGaEventSended, setAddressGaEventSended] = useState(false);

  const sendEventForCheckoutAddress = () => {
    setAddressGaEventSended(true);
    launchCheckoutEvent(
      steps.addressCheckoutRoute,
      ecommerceProductsMapper(items)
    );
  };

  const sendEventForCheckoutPayment = () => {
    launchCheckoutEvent(
      steps.paymentCheckoutRoute,
      ecommerceProductsMapper(items)
    );
  };

  const sendEventsWhenSkippingFirstStep = () => {
    launchCheckoutEvent(
      steps.addressCheckoutRoute,
      ecommerceProductsMapper(items)
    );
    launchCheckoutEvent(
      steps.filledContactUserData,
      ecommerceProductsMapper(items)
    );
    launchCheckoutEvent(
      steps.privacyPolicyAcepted,
      ecommerceProductsMapper(items)
    );
    launchCheckoutEvent(
      steps.filledInputForAddress,
      ecommerceProductsMapper(items)
    );
    launchCheckoutEvent(
      steps.shippingMethodSelected,
      ecommerceProductsMapper(items)
    );
    launchCheckoutEvent(
      steps.paymentCheckoutRoute,
      ecommerceProductsMapper(items)
    );
  };

  React.useEffect(() => {
    if (pathname === '/checkout/address') {
      sendEventForCheckoutAddress();
    }
    if (pathname === '/checkout/payment' && !addressGaEventSended) {
      sendEventsWhenSkippingFirstStep();
    }

    if (pathname === '/checkout/payment' && addressGaEventSended) {
      sendEventForCheckoutPayment();
    }
  }, [pathname]);

  const checkoutView =
    cartLoaded && checkoutLoaded ? (
      <CheckoutRouter
        items={items}
        checkout={checkout}
        payment={payment}
        renderAddress={(props) => (
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
        renderPayment={(props) => (
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
        renderReview={(props) => (
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
    <CheckoutContextProvider>
      <div style={{ backgroundColor: '#F7F6F8' }}>
        {displayModalShowDetail && (
          <CartDeliveryDataModal
            checkout={checkout}
            hideModal={() => {
              setDisplayModalShowDetail(false);
            }}
            title="Datos de entrega"
          />
        )}
        <Checkout
          checkoutId={checkout?.id}
          selectedPaymentGateway={selectedPaymentGateway}
          loading={submitInProgress}
          navigation={getCheckoutProgress(
            cartLoaded && checkoutLoaded,
            activeStepIndex,
            !!isShippingRequiredForProducts,
            pathname
          )}
          cartResume={prepareCartResume(
            activeStepIndex,
            onClickHandle,
            totalProducts,
            subtotalPrice,
            totalPrice,
            shippingTaxedPrice,
            promoTaxedPrice
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
          button={getButton(
            activeStep.nextActionName,
            checkout?.id,
            handleNextStepClick
          )}
        />
      </div>
    </CheckoutContextProvider>
  );
};

export { CheckoutPage };
