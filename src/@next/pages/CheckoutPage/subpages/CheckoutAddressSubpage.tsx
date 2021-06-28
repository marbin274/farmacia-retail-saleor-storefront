import { CheckoutAddress, StockValidationModal } from "@components/organisms";
import { useCheckout, useUserDetails } from "@sdk/react";
import { alertService } from "@temp/@next/components/atoms/Alert/AlertService";
import { addressFormSchema } from "@temp/@next/components/organisms/AddressForm/adddressFormSchema";
import { useDistrictSelected } from "@temp/@next/hooks/useDistrictSelected";
import { useUpdateCartLines } from "@temp/@next/hooks/useUpdateCartLines";
import { IPrivacyPolicy } from "@temp/@sdk/api/Checkout/types";
import { CheckoutErrorCode } from "@temp/@sdk/gqlTypes/globalTypes";
import { CreateCheckout_checkoutCreate_checkoutErrors_products } from "@temp/@sdk/mutations/gqlTypes/CreateCheckout";
import { baseUrl } from "@temp/app/routes/paths";
import { useShopContext } from "@temp/components/ShopProvider/context";
import { COUNTRY_DEFAULT } from "@temp/core/config";
import { IAddress, IAddressWithEmail, IFormError } from "@types";
import { filterNotEmptyArrayItems } from "@utils/misc";
import React, {
  forwardRef,
  RefForwardingComponent,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { RouteComponentProps } from "react-router";

export interface ICheckoutAddressSubpageHandles {
  submitAddress: () => void;
}

interface IProps extends RouteComponentProps<any> {
  addressSubPageErrors: IFormError[];
  changeSubmitProgress: (submitInProgress: boolean) => void;
  setAddressSubPageErrors: (errors: IFormError[]) => void;
}

const CheckoutAddressSubpageWithRef: RefForwardingComponent<
  ICheckoutAddressSubpageHandles,
  IProps
> = (
  {
    addressSubPageErrors,
    changeSubmitProgress,
    setAddressSubPageErrors,
    ...props
  }: IProps,
  ref
) => {
  const [showStockValidation, setShowStockValidation] = useState(false);
  const [stockValidationProducts, setStockValidationProducts] = useState<
    CreateCheckout_checkoutCreate_checkoutErrors_products[]
  >();
  const checkoutAddressFormId = "address-form";
  const checkoutAddressFormRef = useRef<HTMLFormElement>(null);
  const checkoutNewAddressFormId = "new-address-form";
  const { data: user, loading: userLoading } = useUserDetails();
  const {
    checkout,
    setShippingAddress,
    setShippingMethod,
    selectedShippingAddressId,
    selectedSlotId,
  } = useCheckout();
  const { availableDistricts, countries } = useShopContext();
  const [selectedDistrict, setDistrict] = useDistrictSelected();
  const {
    update: updateCartLines,
    loading: updatingCartLines,
  } = useUpdateCartLines();

  const _addressFormSchema = addressFormSchema;

  const handleFormValues = (data: IAddressWithEmail | undefined) => {
    _addressFormSchema
      .isValid({
        city: data?.city,
        dataTreatmentPolicy: data?.dataTreatmentPolicy,
        documentNumber: data?.documentNumber,
        email: data?.email,
        firstName: data?.firstName,
        phone: data?.phone,
        streetAddress1: data?.streetAddress1,
        streetAddress2: data?.streetAddress2,
        termsAndConditions: data?.termsAndConditions,
      })
      .then((valid: boolean) => {
        if (valid) {
          setShippingAddress(
            {
              city: data?.city,
              country: COUNTRY_DEFAULT,
              firstName: data?.firstName,
              id: data?.id,
              phone: data?.phone,
              streetAddress1: data?.streetAddress1,
              streetAddress2: data?.streetAddress2,
            },
            data?.email ? data?.email : "",
            {
              dataTreatmentPolicy: data?.dataTreatmentPolicy,
              termsAndConditions: data?.termsAndConditions,
            },
            data?.documentNumber ? data.documentNumber : ""
          );
        }
      });
  };

  useImperativeHandle(ref, () => ({
    submitAddress: () => {
      if (user && selectedShippingAddressId) {
        checkoutAddressFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else {
        // TODO validate form
        checkoutAddressFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      }
    },
  }));

  const checkoutShippingAddress = checkout?.shippingAddress
    ? {
        ...checkout?.shippingAddress,
        phone: checkout?.shippingAddress?.phone || undefined,
      }
    : undefined;

  const handleSetShippingAddress = async (
    address?: IAddress,
    email?: string,
    userAddressId?: string,
    privacyPolicy?: IPrivacyPolicy,
    documentNumber?: string
  ) => {
    if (!address) {
      setAddressSubPageErrors([
        { message: "Please provide shipping address." },
      ]);
      return;
    }
    const shippingEmail = user?.email || email || "";

    if (!shippingEmail) {
      setAddressSubPageErrors([
        { field: "email", message: "Please provide email address." },
      ]);
      return;
    }

    changeSubmitProgress(true);
    const { checkoutErrors, dataError } = await setShippingAddress(
      {
        ...address,
        id: userAddressId,
        latitude: address.latitude as number,
        longitude: address.longitude as number,
      },
      shippingEmail,
      privacyPolicy
        ? {
            dataTreatmentPolicy: privacyPolicy?.dataTreatmentPolicy,
            termsAndConditions: privacyPolicy.termsAndConditions,
          }
        : { dataTreatmentPolicy: false, termsAndConditions: false },
      documentNumber ? documentNumber : ""
    );

    if (selectedSlotId) {
      await setShippingMethod({ shippingMethodId: "", slotId: undefined });
    }
    
    const district = availableDistricts?.find(
      x => x?.name.toLowerCase() === address.city?.toLocaleLowerCase()
    );

    if (selectedDistrict?.id !== district?.id) {
      setDistrict(district);
    }

    if (checkoutErrors?.length! > 0) {
      const checkoutError = checkoutErrors![0];
      if (checkoutError.code === CheckoutErrorCode.INSUFFICIENT_STOCK) {
        setStockValidationProducts(
          checkoutError.products! as CreateCheckout_checkoutCreate_checkoutErrors_products[]
        );
        setShowStockValidation(true);
        changeSubmitProgress(false);
        return;
      }
    }

    const errors = dataError?.error;
    changeSubmitProgress(false);
    if (errors) {
      setAddressSubPageErrors(errors);
      switch (errors[0].field) {
        default:
          alertService.sendAlert({
            buttonText: "Entendido",
            message: errors[0].message,
            title: "Ha ocurrido un error",
            type: "Error",
          });
          break;
      }
    } else {
      setAddressSubPageErrors([]);
      if (checkout?.shippingMethod?.id) {
        // history.push(CHECKOUT_STEPS[0].nextStepLink);
      }
    }
  };

  const userAdresses = user?.addresses
    ?.filter(filterNotEmptyArrayItems)
    .map(address => ({
      address: {
        ...address,
        isDefaultBillingAddress: address.isDefaultBillingAddress || false,
        isDefaultShippingAddress: address.isDefaultShippingAddress || false,
        latitude: address.latitude || undefined,
        longitude: address.longitude || undefined,
        phone: address.phone || undefined,
      },
      id: address?.id || "",
      onSelect: () => null,
    }));

  const onStockValidationContinue = async () => {
    if (updatingCartLines) {
      return;
    }

    setShowStockValidation(false);
    setStockValidationProducts(undefined);

    await updateCartLines();
    checkoutAddressFormRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true })
    );
  };

  return (
    <>
      <CheckoutAddress
        {...props}
        availableDistricts={availableDistricts!}
        errors={addressSubPageErrors}
        formId={checkoutAddressFormId}
        formRef={checkoutAddressFormRef}
        checkoutAddress={checkoutShippingAddress}
        email={checkout?.email}
        checkoutData={checkout}
        userAddresses={userAdresses}
        selectedUserAddressId={selectedShippingAddressId}
        countries={countries}
        user={user}
        userLoading={userLoading}
        newAddressFormId={checkoutNewAddressFormId}
        setShippingAddress={handleSetShippingAddress}
        setFormValue={handleFormValues}
      />
      <StockValidationModal
        show={showStockValidation}
        onClose={() => {
          setShowStockValidation(false);
          setStockValidationProducts(undefined);
        }}
        products={stockValidationProducts}
        onClickKeepSearching={() => {
          props.history.push(baseUrl);
        }}
        onClickContinue={onStockValidationContinue}
        district={selectedDistrict.name}
      />
    </>
  );
};

const CheckoutAddressSubpage = forwardRef(CheckoutAddressSubpageWithRef);

export { CheckoutAddressSubpage };
