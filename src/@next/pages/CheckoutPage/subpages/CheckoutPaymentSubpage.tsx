import { CheckoutPayment, StockValidationModal } from "@components/organisms";
import { useCart, useCheckout, useUserDetails } from "@sdk/react";
import { alertService } from "@temp/@next/components/atoms/Alert";
import { IUserDataForNiubiz } from "@temp/@next/components/organisms/CheckoutPayment/types";
import { removePaymentItems } from "@temp/@next/utils/checkoutValidations";
import { useShopContext } from "@temp/components/ShopProvider/context";
import {
  AVAILABLE_PAYMENTS,
  billingAddressAlwaysSameAsShipping,
  CHECKOUT_STEPS,
} from "@temp/core/config";
import { IAddress, ICardData, IFormError } from "@types";
import { filterNotEmptyArrayItems } from "@utils/misc";
import VoucherSVG from "@temp/images/auna/checkout-cupon-small.svg";
import PromoCodeCorrect from "images/auna/promo-code-correct.svg";
import ClockIcon from "images/auna/clock.svg";

import React, {
  forwardRef,
  RefForwardingComponent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { CheckoutErrorCode } from "@temp/@sdk/gqlTypes/globalTypes";
import { useUpdateCartLines } from "@temp/@next/hooks/useUpdateCartLines";
import { useDistrictSelected } from "@temp/@next/hooks/useDistrictSelected";
import { baseUrl } from "@temp/app/routes/paths";

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
    setShippingMethod,
    selectedBillingAddressId,
    selectedSlotId,
    availablePaymentGateways,
    promoCodeDiscount,
    addPromoCode,
    removePromoCode,
    createPayment,
    completeCheckout,
  } = useCheckout();

  const { items, totalPrice } = useCart();
  const { availableDistricts, countries } = useShopContext();
  const [showStockValidation, setShowStockValidation] = useState(false);
  const [stockValidationProducts, setStockValidationProducts] = useState<
    any[]
  >();

  const [, setDistrict] = useDistrictSelected();
  const {
    update: updateCartLines,
    loading: updatingCartLines,
  } = useUpdateCartLines();

  const [cartLinesUpdated, setCartLinesUpdated] = useState(false);

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
  const paymentGateways = availablePaymentGateways?.length
    ? availablePaymentGateways
    : AVAILABLE_PAYMENTS;
  // TODO
  // reload data from backend and  put in cache

  const checkoutBillingFormId = "billing-form";
  const checkoutBillingFormRef = useRef<HTMLFormElement>(null);
  const checkoutGatewayFormId = "gateway-form";
  const checkoutGatewayFormRef = useRef<HTMLFormElement>(null);
  const checkoutNewAddressFormId = "new-address-form";
  const promoCodeDiscountFormId = "discount-form";
  const promoCodeDiscountFormRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    submitPayment: () => {
      const shippingMethodId = checkout?.shippingMethod?.id || "";
      setShippingMethod({shippingMethodId, slotId: selectedSlotId});
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

    if (errors) {
      changeSubmitProgress(false);
      alertService.sendAlert({
        buttonText: "Entendido",
        message: errors[0].message,
        type: "Error",
      });
      setGatewayErrors(errors);
    } else {
      setGatewayErrors([]);

      const { data, dataError } = await completeCheckout(requestPayload);
      const confirmErrors = dataError?.error;
      changeSubmitProgress(false);
      if (confirmErrors) {
        removePaymentItems();
        const confirmError = confirmErrors[0];

        switch (confirmError.code) {
          case CheckoutErrorCode.INSUFFICIENT_STOCK:
            setStockValidationProducts(confirmError.products!);
            setShowStockValidation(true);
            return;
          case CheckoutErrorCode.SCHEDULE_NOT_AVAILABLE:
          case CheckoutErrorCode.EXCEEDS_SCHEDULE_DURATION:
          case CheckoutErrorCode.DELIVERY_DATE_EXPIRED:
            alertService.sendAlert({
              buttonText: "Entendido",
              message: confirmError.message,
              redirectionLink: CHECKOUT_STEPS[0].link,
              title: "Horario de entrega",
              type: "Text",
            });
            break;
          case CheckoutErrorCode.NIUBIZ:
            alertService.sendAlert({
              buttonText: "Entendido",
              message: confirmError.message,
              redirectionLink: CHECKOUT_STEPS[1].link,
              title: "No pudimos procesar el pago",
              type: "Text",
            });
            break;
          case CheckoutErrorCode.INVALID_SLOT:
            alertService.sendAlert({
              buttonText: "Entendido",
              icon: ClockIcon,
              message: "Por favor, selecciona nuevamente cuándo deseas recibir tu pedido",
              redirectionLink: CHECKOUT_STEPS[0].link,
              title: "El tiempo de espera caducó",
              type: "Info",
            });
            break;
          default:
            alertService.sendAlert({
              buttonText: "Entendido",
              message:
                "Por favor valida que todos tus datos de pago sean correctos e inténtalo de nuevo",
              redirectionLink: CHECKOUT_STEPS[1].link,
              title: "No pudimos procesar el pago",
              type: "Text",
            });
        }

        setGatewayErrors(confirmErrors);
        if (confirmErrors?.message?.includes("GraphQL error: ")) {
          setGatewayErrors([
            { field: undefined, message: "Error al procesar pago" },
          ]);
        }
      } else {
        setGatewayErrors([]);
        history.push({
          pathname: CHECKOUT_STEPS[2].nextStepLink,
          state: {
            id: data?.id,
            orderNumber: data?.number,
            sequentialCode: data?.sequentialCode,
            token: data?.token,
          },
        });
      }
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
          latitude: address!.latitude as number,
          longitude: address!.longitude as number,
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
      if (promoCodeDiscountFormRef.current) {
        promoCodeDiscountFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else if (checkoutGatewayFormRef.current) {
        submitCheckoutGatewayForm();
      }
    }
  };

  const handleAddPromoCode = async (promoCode: string) => {
    const { dataError, data } = await addPromoCode(promoCode);
    changeSubmitProgress(false);

    if (dataError?.error) {
      alertService.sendAlert({
        buttonText: "Entendido",
        icon: VoucherSVG,
        message: dataError?.error[0].message,
        title: "Código promocional incorrecto",
        type: "Text",
      });
      setPromoCodeErrors(dataError?.error);
    } else {
      const messageDiscount = data?.promoCodeDiscount?.message;
      if (messageDiscount) {
        showMessageDiscount(messageDiscount);
      }
      clearPromoCodeErrors();
    }
  };

  const showMessageDiscount = (messageDiscount: string) => {
    alertService.sendAlert({
      buttonText: "Entendido",
      icon: PromoCodeCorrect,
      message: messageDiscount,
      title: "Código promocional correcto",
      type: "Info",
    });
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

  const onStockValidationContinue = async () => {
    if (updatingCartLines) {
      return;
    }

    setCartLinesUpdated(false);
    setShowStockValidation(false);

    const district = availableDistricts?.find(
      x =>
        x?.name?.toLocaleLowerCase() ===
        checkout?.shippingAddress?.city?.toLocaleLowerCase()
    );

    setDistrict(district);

    await updateCartLines();

    setCartLinesUpdated(true);
    setStockValidationProducts(undefined);
  };

  const userDataForNiubiz: IUserDataForNiubiz = {
    dataTreatmentPolicy: checkout?.dataTreatmentPolicy,
    documentNumber: checkout?.documentNumber,
    email: checkout?.email,
    termsAndConditions: checkout?.termsAndConditions,
  };

  return (
    <>
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
              latitude: address.latitude || undefined,
              longitude: address.longitude || undefined,
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
        cartLinesUpdated={cartLinesUpdated}
      />
      <StockValidationModal
        show={showStockValidation}
        onClose={() => {
          setShowStockValidation(false);
          setStockValidationProducts(undefined);
        }}
        products={stockValidationProducts}
        onClickKeepSearching={() => {
          history.push(baseUrl);
        }}
        onClickContinue={onStockValidationContinue}
        district={checkout?.shippingAddress?.city!}
      />
    </>
  );
};

const CheckoutPaymentSubpage = forwardRef(CheckoutPaymentSubpageWithRef);

export { CheckoutPaymentSubpage };
