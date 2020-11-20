import {ICardPaymentInput} from "@temp/core/payments/braintree";
import React, {
  forwardRef,
  RefForwardingComponent,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { RouteComponentProps, useHistory } from "react-router";

import { CheckoutPayment } from "@components/organisms";
import { useCart, useCheckout, useUserDetails } from "@sdk/react";
import { ShopContext } from "@temp/components/ShopProvider/context";
import {billingAddressAlwaysSameAsShipping, CHECKOUT_STEPS} from "@temp/core/config";
import { IAddress, ICardData, IFormError } from "@types";
import { filterNotEmptyArrayItems } from "@utils/misc";

export interface ICheckoutPaymentSubpageHandles {
  submitPayment: () => void;
}
interface IProps extends RouteComponentProps<any> {
  selectedPaymentGateway?: string;
  selectedPaymentGatewayToken?: string;
  selectPaymentGateway: (paymentGateway: string) => void;
  changeSubmitProgress: (submitInProgress: boolean) => void;
}

const CheckoutPaymentSubpageWithRef: RefForwardingComponent<
  ICheckoutPaymentSubpageHandles,
  IProps
> = (
  {
    selectedPaymentGateway,
    selectedPaymentGatewayToken,
    changeSubmitProgress,
    selectPaymentGateway,
    ...props
  }: IProps,
  ref
) => {
  const history = useHistory();
  const { data: user } = useUserDetails();
  const {
    checkout,
    billingAsShipping,
    setBillingAddress,
    setBillingAsShippingAddress,
    selectedBillingAddressId,
    availablePaymentGateways,
    promoCodeDiscount,
    addPromoCode,
    removePromoCode,
    createPayment,
  } = useCheckout();

  const { items } = useCart();
  const { countries } = useContext(ShopContext);

  const isShippingRequiredForProducts =
    items &&
    items.some(
      ({ variant }) => variant.product?.productType.isShippingRequired
    );

  const [billingErrors, setBillingErrors] = useState<IFormError[]>([]);
  const [gatewayErrors, setGatewayErrors] = useState<IFormError[]>([]);
  const [promoCodeErrors, setPromoCodeErrors] = useState<IFormError[]>([]);

  // this variable overrides billingAsShipping if config option billingAddressAlwaysSameAsShipping is set
  const billingAsShippingOverride = billingAddressAlwaysSameAsShipping ? true : billingAsShipping;

  const [billingAsShippingState, setBillingAsShippingState] = useState(
    billingAsShippingOverride
  );

  useEffect(() => {
    setBillingAsShippingState(billingAsShippingOverride);
  }, [billingAsShippingOverride]);

  const checkoutBillingAddress = checkout?.billingAddress
    ? {
        ...checkout?.billingAddress,
        phone: checkout?.billingAddress?.phone || undefined,
      }
    : undefined;
  const paymentGateways = availablePaymentGateways
    ? availablePaymentGateways
    : [];

  const checkoutBillingFormId = "billing-form";
  const checkoutBillingFormRef = useRef<HTMLFormElement>(null);
  const checkoutGatewayFormId = "gateway-form";
  const checkoutGatewayFormRef = useRef<HTMLFormElement>(null);
  const checkoutNewAddressFormId = "new-address-form";
  const promoCodeDiscountFormId = "discount-form";
  const promoCodeDiscountFormRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    submitPayment: () => {
      if (billingAsShippingState) {
        handleSetBillingAddress();
      } else if (user && selectedBillingAddressId) {
        checkoutBillingFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else {
        // TODO validate form
        checkoutGatewayFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      }
    },
  }));

  const handleProcessPayment = async (
    gateway: string,
    token: string,
    _cardData?: ICardData | ICardPaymentInput
  ) => {
    // TODO: remove dummyCardData and use cardData when plugin is ready
    const dummyCardData: ICardData = {
      brand: 'visa',
      expMonth: 11,
      expYear: 22,
      firstDigits: '4242',
      lastDigits: '4242',
    };

    const { dataError } = await createPayment(gateway, token, dummyCardData);
    const errors = dataError?.error;
    changeSubmitProgress(false);
    if (errors) {
      setGatewayErrors(errors);
    } else {
      setGatewayErrors([]);
      history.push(CHECKOUT_STEPS[2].nextStepLink);
    }
  };
  const handlePaymentGatewayError = () => {
    changeSubmitProgress(false);
  };
  const handleSetBillingAddress = async (
    address?: IAddress,
    email?: string,
    userAddressId?: string
  ) => {
    if (!address && !billingAsShippingState) {
      setBillingErrors([{ message: "Please provide billing address." }]);
      return;
    }

    const billingEmail = user?.email || email;

    if (
      !billingEmail &&
      !billingAsShippingState &&
      !isShippingRequiredForProducts
    ) {
      setBillingErrors([
        { field: "email", message: "Please provide email address." },
      ]);
      return;
    }

    let errors;
    changeSubmitProgress(true);
    if (billingAsShippingState && isShippingRequiredForProducts) {
      const { dataError } = await setBillingAsShippingAddress();
      errors = dataError?.error;
    } else {
      const { dataError } = await setBillingAddress(
        {
          ...address,
          id: userAddressId,
        },
        billingEmail
      );
      errors = dataError?.error;
    }
    if (errors) {
      changeSubmitProgress(false);
      setBillingErrors(errors);
    } else {
      setBillingErrors([]);
      if (promoCodeDiscountFormRef.current) {
        promoCodeDiscountFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else if (checkoutGatewayFormRef.current) {
        checkoutGatewayFormRef.current.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else {
        changeSubmitProgress(false);
        setGatewayErrors([{ message: "Please choose payment method." }]);
      }
    }
  };
  const handleAddPromoCode = async (promoCode: string) => {
    const { dataError } = await addPromoCode(promoCode);
    const errors = dataError?.error;
    if (errors) {
      changeSubmitProgress(false);
      setPromoCodeErrors(errors);
    } else {
      setPromoCodeErrors([]);
      if (checkoutGatewayFormRef.current) {
        // Avoid to go ahead to next step
        // checkoutGatewayFormRef.current.dispatchEvent(
        //   new Event("submit", { cancelable: true })
        // );
      } else {
        changeSubmitProgress(false);
        setGatewayErrors([{ message: "Please choose payment method." }]);
      }
    }
  };
  
  const handleRemovePromoCode = async (promoCode: string) => {
    const { dataError } = await removePromoCode(promoCode);
    const errors = dataError?.error;

    if (errors) {
      changeSubmitProgress(false);
      setPromoCodeErrors(errors);
    } else {
      setPromoCodeErrors([]);
      if (checkoutGatewayFormRef.current) {
        // Avoid to go ahead to next step
        // checkoutGatewayFormRef.current.dispatchEvent(
        //   new Event("submit", { cancelable: true })
        // );
      } else {
        changeSubmitProgress(false);
        setGatewayErrors([{ message: "Please choose payment method." }]);
      }
    }
  };
  const handleSubmitUnchangedDiscount = () => {
    setPromoCodeErrors([]);
    if (checkoutGatewayFormRef.current) {
      checkoutGatewayFormRef.current.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
    } else {
      changeSubmitProgress(false);
      setGatewayErrors([{ message: "Please choose payment method." }]);
    }
  };

  return (
    <CheckoutPayment
      {...props}
      billingErrors={billingErrors}
      gatewayErrors={gatewayErrors}
      billingFormId={checkoutBillingFormId}
      billingFormRef={checkoutBillingFormRef}
      userAddresses={user?.addresses
        ?.filter(filterNotEmptyArrayItems)
        .map(
          ({
            isDefaultBillingAddress,
            isDefaultShippingAddress,
            phone,
            ...address
          }) => ({
            ...address,
            isDefaultBillingAddress: !!isDefaultBillingAddress,
            isDefaultShippingAddress: !!isDefaultShippingAddress,
            phone: phone ? phone : undefined,
          })
        )}
      selectedUserAddressId={selectedBillingAddressId}
      checkoutBillingAddress={checkoutBillingAddress}
      countries={countries}
      paymentGateways={paymentGateways}
      selectedPaymentGateway={selectedPaymentGateway}
      selectedPaymentGatewayToken={selectedPaymentGatewayToken}
      selectPaymentGateway={selectPaymentGateway}
      setBillingAddress={handleSetBillingAddress}
      billingAsShippingPossible={!!isShippingRequiredForProducts}
      billingAsShippingAddress={billingAsShippingState}
      setBillingAsShippingAddress={setBillingAsShippingState}
      promoCodeDiscountFormId={promoCodeDiscountFormId}
      promoCodeDiscountFormRef={promoCodeDiscountFormRef}
      promoCodeDiscount={{
        voucherCode: promoCodeDiscount?.voucherCode,
        voucherDiscountType: promoCodeDiscount?.voucherDiscountType,
        voucherDiscountValue: promoCodeDiscount?.voucherDiscountValue,
        voucherType: promoCodeDiscount?.voucherType,
      }}
      addPromoCode={handleAddPromoCode}
      removeVoucherCode={handleRemovePromoCode}
      submitUnchangedDiscount={handleSubmitUnchangedDiscount}
      promoCodeErrors={promoCodeErrors}
      gatewayFormId={checkoutGatewayFormId}
      gatewayFormRef={checkoutGatewayFormRef}
      userId={user?.id}
      newAddressFormId={checkoutNewAddressFormId}
      processPayment={handleProcessPayment}
      onGatewayError={handlePaymentGatewayError}
    />
  );
};

const CheckoutPaymentSubpage = forwardRef(CheckoutPaymentSubpageWithRef);

export { CheckoutPaymentSubpage };