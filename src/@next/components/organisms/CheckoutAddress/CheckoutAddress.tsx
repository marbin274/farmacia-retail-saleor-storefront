import { filterNotEmptyArrayItems } from "@utils/misc";
import React from "react";
import { AddressForm } from "../AddressForm";
import { IProps } from "./types";

/**
 * Address form used in checkout.
 */
const CheckoutAddress: React.FC<IProps> = ({
  availableDistricts,
  checkoutAddress,
  email,
  countries,
  user,
  userLoading,
  formRef,
  formId,
  setShippingAddress,
  setFormValue,
  errors,
  checkoutData,
  temporaryStreeAddress1Error,
  clearTemporaryAddressError,
}: IProps) => {
  return (
    <section>
      <AddressForm
        formId={formId}
        formRef={formRef}
        districtsOptions={availableDistricts?.map(x => x!.name)}
        countriesOptions={countries?.filter(filterNotEmptyArrayItems)}
        checkoutData={checkoutData}
        address={{
          ...checkoutAddress,
          email,
        }}
        onSelect={(address, email, id, privacyPolicy, documentNumber) =>
          setShippingAddress(address, email, id, privacyPolicy, documentNumber)
        }
        handleSubmit={(address, email, id, privacyPolicy, documentNumber) => {
          setShippingAddress(address, address?.email, id, privacyPolicy, documentNumber)

        }}
        includeEmail={true}
        errors={errors}
        user={user}
        userLoading={userLoading}
        setFormValue={setFormValue}
        temporaryStreeAddress1Error={temporaryStreeAddress1Error}
        clearTemporaryAddressError={clearTemporaryAddressError}
      />
    </section>
  );
};

export { CheckoutAddress };

