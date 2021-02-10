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
import {
  billingAddressAlwaysSameAsShipping,
  CHECKOUT_STEPS,
} from "@temp/core/config";
import { IAddress, ICardData, IFormError } from "@types";
import { filterNotEmptyArrayItems } from "@utils/misc";
import { IUserDataForNiubiz } from "@temp/@next/components/organisms/CheckoutPayment/types";
import { alertService } from "@temp/@next/components/atoms/Alert";

export interface ICheckoutPaymentSubpageHandles {
  submitPayment: () => void;
}
interface IProps extends RouteComponentProps<any> {
  selectedPaymentGateway?: string;
  selectedPaymentGatewayToken?: string;
  selectPaymentGateway: (paymentGateway: string) => void;
  changeSubmitProgress: (submitInProgress: boolean) => void;
  changeRequestPayload: (requestPayload: any) => void;
  requestPayload?: string | null | undefined;
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
    changeRequestPayload,
    requestPayload,
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

  // console.log(availablePaymentGateways);

  const { items, totalPrice } = useCart();
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
  const billingAsShippingOverride = billingAddressAlwaysSameAsShipping
    ? true
    : billingAsShipping;

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

  const clearPromoCodeErrors = () => {
    setPromoCodeErrors([]);
  };

  const handleProcessPayment = async (
    gateway: string,
    token: string,
    cardData?: ICardData
  ) => {
    const { dataError } = await createPayment(gateway, token, cardData);
    const errors = dataError?.error;
    changeSubmitProgress(false);
    if (errors) {
      alertService.sendAlert({
        buttonText: "Entendido",
        message: errors[0].message,
        type: "Error",
      });
      setGatewayErrors(errors);
    } else {
      setGatewayErrors([]);
      history.push(CHECKOUT_STEPS[1].nextStepLink);
    }
  };

  const handlePaymentGatewayError = () => {
    changeSubmitProgress(false);
  };

  const submitCheckoutGatewayForm = () => {
    checkoutGatewayFormRef?.current?.dispatchEvent(
      new Event("submit", { cancelable: true })
    );
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
      alertService.sendAlert({
        buttonText: "Entendido",
        message: errors[0].message,
        type: "Error",
      });
      changeSubmitProgress(false);
      setBillingErrors(errors);
    } else {
      setBillingErrors([]);
      if(!selectedPaymentGateway){
        changeSubmitProgress(false);
        alertService.sendAlert({
          buttonText: "Entendido",
          message: "Selecciona un método de pago para continuar",
          type: "Info",
        });
        setGatewayErrors([
          { message: "Selecciona un método de pago para continuar" },
        ]);
      }
      else if (promoCodeDiscountFormRef.current) {
        promoCodeDiscountFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else if (checkoutGatewayFormRef.current) {
        submitCheckoutGatewayForm();
      }
    }
  };

  const handleAddPromoCode = async (promoCode: string) => {
    const { dataError } = await addPromoCode(promoCode);
    changeSubmitProgress(false);

    if (dataError?.error) {
      alertService.sendAlert({
        buttonText: "Entendido",
        message: dataError?.error[0].message,
        type: "Error",
      });
      setPromoCodeErrors(dataError?.error);
    } else {
      clearPromoCodeErrors();
    }
  };

  const handleRemovePromoCode = async (promoCode: string) => {
    const { dataError } = await removePromoCode(promoCode);
    changeSubmitProgress(false);

    if (dataError?.error) {
      alertService.sendAlert({
        buttonText: "Entendido",
        message: dataError?.error[0].message,
        type: "Error",
      });
      setPromoCodeErrors(dataError?.error);
    } else {
      clearPromoCodeErrors();
    }
  };

  const handleSubmitUnchangedDiscount = () => {
    clearPromoCodeErrors();
    if (checkoutGatewayFormRef.current) {
      submitCheckoutGatewayForm();
    }
  };

  const userDataForNiubiz: IUserDataForNiubiz = {
    dataTreatmentPolicy: checkout?.dataTreatmentPolicy,
    documentNumber: checkout?.documentNumber,
    email: checkout?.email,
    termsAndConditions: checkout?.termsAndConditions,
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
      clearPromoCodeErrors={clearPromoCodeErrors}
      gatewayFormId={checkoutGatewayFormId}
      gatewayFormRef={checkoutGatewayFormRef}
      userId={user?.id}
      newAddressFormId={checkoutNewAddressFormId}
      processPayment={handleProcessPayment}
      onGatewayError={handlePaymentGatewayError}
      changeRequestPayload={changeRequestPayload}
      requestPayload={requestPayload}
      totalPrice={totalPrice}
      userDataForNiubiz={userDataForNiubiz}
    />
  );
};

const CheckoutPaymentSubpage = forwardRef(CheckoutPaymentSubpageWithRef);

export { CheckoutPaymentSubpage };
