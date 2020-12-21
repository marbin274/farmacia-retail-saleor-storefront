import React, {
  forwardRef,
  RefForwardingComponent,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { RouteComponentProps } from "react-router";

import { CheckoutAddress } from "@components/organisms";
import { useCheckout, useUserDetails } from "@sdk/react";
import { ShopContext } from "@temp/components/ShopProvider/context";
// import { CHECKOUT_STEPS } from "@temp/core/config";
import { IAddress, IAddressWithEmail, IFormError } from "@types";
import { filterNotEmptyArrayItems } from "@utils/misc";
import { IPrivacyPolicy } from "@temp/@sdk/api/Checkout/types";
import { addressFormSchema } from "@temp/@next/components/organisms/AddressForm/adddressForm.schema";

export interface ICheckoutAddressSubpageHandles {
  submitAddress: () => void;
  handleRequiredFields: () => boolean;
}

interface IProps extends RouteComponentProps<any> {
  changeSubmitProgress: (submitInProgress: boolean) => void;
}

const CheckoutAddressSubpageWithRef: RefForwardingComponent<
  ICheckoutAddressSubpageHandles,
  IProps
> = ({ changeSubmitProgress, ...props }: IProps, ref) => {
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

  const [errors, setErrors] = useState<IFormError[]>([]);
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
      setErrors([{ message: "Please provide shipping address." }]);
      return;
    }
    const shippingEmail = user?.email || email || "";

    if (!shippingEmail) {
      setErrors([{ field: "email", message: "Please provide email address." }]);
      return;
    }

    changeSubmitProgress(true);
    const { dataError } = await setShippingAddress(
      {
        ...address,
        id: userAddressId,
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
      setErrors(errors);
    } else {
      setErrors([]);
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
        phone: address.phone || undefined,
      },
      id: address?.id || "",
      onSelect: () => null,
    }));

  return (
    <CheckoutAddress
      {...props}
      errors={errors}
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
