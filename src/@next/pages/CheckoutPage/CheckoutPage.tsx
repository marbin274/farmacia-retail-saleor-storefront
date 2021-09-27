import { useCheckPluginsStatus } from '@app/hooks';
import { Loader } from '@components/atoms';
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
import { alertService } from '@temp/@next/services';
import { removePaymentItems } from '@temp/@next/utils/checkoutValidations';
import {
  SHIPPING_METHOD_NOT_FOUND,
  SHIPPING_METHOD_NOT_FOUND_TITLE,
} from '@temp/@next/utils/schemasMessages';
import { LocalRepository } from '@temp/@sdk/repository';
import { ITaxedMoney } from '@types';
import { useRouter } from 'next/router';
import { BASE_URL, CheckoutStep, CHECKOUT_STEPS } from '@temp/core/config';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Media from 'react-media';
import { CheckoutRouter } from './CheckoutRouter';
import {
  CheckoutAddressSubpage,
  CheckoutPaymentSubpage,
  CheckoutReviewSubpage,
  ICheckoutAddressSubpageHandles,
  ICheckoutPaymentSubpageHandles,
  ICheckoutReviewSubpageHandles,
} from './subpages';
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
  step: CheckoutStep,
  text: string,
  checkoutId: string | undefined,
  onClick: () => void
) => {
  return text ? (
    <Button
      data-cy="checkoutPageBtnNextStep"
      onClick={onClick}
      disabled={step === CheckoutStep.Address ? false : !checkoutId}
      type="submit"
    >
      {text}
    </Button>
  ) : null;
};

const CheckoutPage: React.FC = () => {
  const router = useRouter();

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

  const { isLastMileActive } = useCheckPluginsStatus();

  const { isAttentionSchedule } = checkAttentionSchedule(
    checkoutLoaded,
    checkout,
    availableShippingMethods
  );

  const totalProducts: number = useMemo(() => {
    return items
      ? items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)
      : 0;
  }, [items]);

  const [submitInProgress, setSubmitInProgress] = useState(false);

  const [displayModalShowDetail, setDisplayModalShowDetail] = useState(false);

  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState<
    string | undefined
  >(payment?.gateway);
  const [selectedPaymentGatewayToken, setSelectedPaymentGatewayToken] =
    useState<string | undefined>(payment?.token);

  const [requestPayload, setRequestPayload] = useState(null);

  useEffect(() => {
    if (!items || !items?.length) {
      removePaymentItems();
      router.push(BASE_URL);
    }
  }, []);

  useEffect(() => {
    if (isAttentionSchedule === false && !isLastMileActive) {
      alertService.sendAlert({
        acceptDialog: () => {
          setShippingMethod({ shippingMethodId: '', slotId: undefined });
        },
        buttonText: 'Entendido',
        icon: '/assets/auna/shipping-method-calendar-info.svg',
        message: SHIPPING_METHOD_NOT_FOUND,
        title: SHIPPING_METHOD_NOT_FOUND_TITLE,
        type: 'Info',
      });
    }
  }, [isAttentionSchedule]);

  useEffect(() => {
    setSelectedPaymentGateway(payment?.gateway);
  }, [payment?.gateway]);

  useEffect(() => {
    setSelectedPaymentGatewayToken(payment?.token);
  }, [payment?.token]);

  const matchingStepIndex = CHECKOUT_STEPS.findIndex(
    ({ link }) => link === router.asPath
  );
  const activeStepIndex = matchingStepIndex !== -1 ? matchingStepIndex : 2;
  const activeStep = CHECKOUT_STEPS[activeStepIndex];

  const checkoutAddressSubpageRef =
    useRef<ICheckoutAddressSubpageHandles>(null);
  const checkoutPaymentSubpageRef =
    useRef<ICheckoutPaymentSubpageHandles>(null);
  const checkoutReviewSubpageRef = useRef<ICheckoutReviewSubpageHandles>(null);

  const handleNextStepClick = () => {
    switch (activeStepIndex) {
      case 0:
        if (checkoutAddressSubpageRef.current?.submitAddress) {
          checkoutAddressSubpageRef.current?.submitAddress();
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
      // TODO: Descomentar cuando se reactive la pagina de review antes de pagar
      // case 2:
      //   if (checkoutReviewSubpageRef.current?.complete) {
      //     checkoutReviewSubpageRef.current?.complete();
      //   }
      //   break;
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
    if (router.asPath === '/checkout/address') {
      sendEventForCheckoutAddress();
    }
    if (router.asPath === '/checkout/payment' && !addressGaEventSended) {
      sendEventsWhenSkippingFirstStep();
    }

    if (router.asPath === '/checkout/payment' && addressGaEventSended) {
      sendEventForCheckoutPayment();
    }
  }, [router.asPath]);

  const checkoutView =
    cartLoaded && checkoutLoaded ? (
      <CheckoutRouter
        items={items}
        checkout={checkout}
        payment={payment}
        renderAddress={() => (
          <>
            <CheckoutAddressSubpage
              checkoutAddressSubpageRef={checkoutAddressSubpageRef}
              changeSubmitProgress={setSubmitInProgress}
            />
          </>
        )}
        renderPayment={() => (
          <CheckoutPaymentSubpage
            ref={checkoutPaymentSubpageRef}
            selectedPaymentGateway={selectedPaymentGateway}
            selectedPaymentGatewayToken={selectedPaymentGatewayToken}
            changeSubmitProgress={setSubmitInProgress}
            selectPaymentGateway={setSelectedPaymentGateway}
            changeRequestPayload={setRequestPayload}
            requestPayload={requestPayload}
          />
        )}
        renderReview={() => (
          <CheckoutReviewSubpage
            ref={checkoutReviewSubpageRef}
            selectedPaymentGatewayToken={selectedPaymentGatewayToken}
            changeSubmitProgress={setSubmitInProgress}
            requestPayload={requestPayload}
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
            router.asPath
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
            activeStep.step,
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
