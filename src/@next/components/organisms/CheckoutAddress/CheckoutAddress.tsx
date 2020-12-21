import React from "react";

import { filterNotEmptyArrayItems } from "@utils/misc";

import { AddressForm } from "../AddressForm";
// import { AddressGridSelector } from "../AddressGridSelector";

import * as S from "./styles";
import { IProps } from "./types";
import { citiesOptions } from "./cities";

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
      <S.Title data-cy="checkoutPageSubtitle"></S.Title>
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
        // handleSubmit={address => setShippingAddress(address, address?.email)}
        includeEmail={true}
        errors={errors}
        user={user}
        setFormValue={setFormValue}
      />
    </section>
  );
};

export { CheckoutAddress };
