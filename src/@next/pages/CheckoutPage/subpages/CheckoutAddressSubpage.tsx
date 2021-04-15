import { CheckoutAddress } from "@components/organisms";
import { useCheckout, useUserDetails } from "@sdk/react";
import { alertService } from "@temp/@next/components/atoms/Alert/AlertService";
import { addressFormSchema } from "@temp/@next/components/organisms/AddressForm/adddressForm.schema";
import { IPrivacyPolicy } from "@temp/@sdk/api/Checkout/types";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { IAddress, IAddressWithEmail, IFormError } from "@types";
import { filterNotEmptyArrayItems } from "@utils/misc";
import NoStockIcon from "images/auna/no-stock.svg";
import React, {
  forwardRef,
  RefForwardingComponent,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { RouteComponentProps } from "react-router";

export interface ICheckoutAddressSubpageHandles {
  submitAddress: () => void;
  handleRequiredFields: () => boolean;
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
  const checkoutAddressFormId = "address-form";
  const checkoutAddressFormRef = useRef<HTMLFormElement>(null);
  const checkoutNewAddressFormId = "new-address-form";

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
              country: {
                code: "PE",
                country: "Peru",
              },
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
    handleRequiredFields: () => {
      return true;
    },
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
  // const history = useHistory();
  const { data: user } = useUserDetails();

  const {
    checkout,
    setShippingAddress,
    selectedShippingAddressId,
  } = useCheckout();
  const { countries } = useContext(ShopContext);

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
    const { dataError } = await setShippingAddress(
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

    const errors = dataError?.error;
    changeSubmitProgress(false);
    if (errors) {
      setAddressSubPageErrors(errors);
      switch (errors[0].field) {
        case "quantity":
          alertService.sendAlert({
            buttonText: "Entendido",
            icon: NoStockIcon,
            message: errors[0].message,
            title: "Producto sin stock",
            type: "Info",
          });
          break;
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

  return (
    <CheckoutAddress
      {...props}
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
      newAddressFormId={checkoutNewAddressFormId}
      setShippingAddress={handleSetShippingAddress}
      setFormValue={handleFormValues}
    />
  );
};

const CheckoutAddressSubpage = forwardRef(CheckoutAddressSubpageWithRef);

export { CheckoutAddressSubpage };
