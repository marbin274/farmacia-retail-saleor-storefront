import { filterNotEmptyArrayItems } from "@utils/misc";
import React from "react";
import { AddressForm } from "../AddressForm";
import { citiesOptions } from "./cities";
import { IProps } from "./types";



/**
 * Address form used in checkout.
 */
const CheckoutAddress: React.FC<IProps> = ({
  checkoutAddress,
  email,
  countries,
  user,
  formRef,
  formId,
  setShippingAddress,
  setFormValue,
  errors,
  checkoutData,
}: IProps) => {
  return (
    <section>
      <AddressForm
        formId={formId}
        formRef={formRef}
        citiesOptions={citiesOptions}
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
        setFormValue={setFormValue}
      />
    </section>
  );
};

export { CheckoutAddress };

