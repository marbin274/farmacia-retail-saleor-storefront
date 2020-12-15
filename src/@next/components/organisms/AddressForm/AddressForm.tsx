import { Formik } from "formik";
import { pick } from "lodash";
import React from "react";

import { IAddressWithEmail } from "@types";
import { AddressFormContent } from "./AddressFormContent";
import { IProps } from "./types";

const ADDRESS_FIELDS = [
  "city",
  // "companyName", // currently unused
  // "countryArea", // currently unused
  "firstName",
  "lastName",
  "country",
  "phone",
  // "postalCode", // currently unused
  "streetAddress1",
  "streetAddress2",
  "email",
  "dataTreatmentPolicy",
  "termsAndConditions",
  "documentNumber",
];

export const AddressForm: React.FC<IProps> = ({
  address,
  handleSubmit,
  formId,
  defaultValue,
  countriesOptions,
  citiesOptions,
  user,
  comeFromModal,
  checkoutData,
  ...props
}: IProps) => {
  let addressWithPickedFields: Partial<IAddressWithEmail> = {};
  if (address) {
    addressWithPickedFields = pick(address, ADDRESS_FIELDS);
  }

  addressWithPickedFields.documentNumber = checkoutData?.documentNumber;
  addressWithPickedFields.termsAndConditions = checkoutData?.termsAndConditions;
  addressWithPickedFields.dataTreatmentPolicy =
    checkoutData?.dataTreatmentPolicy;

  if (defaultValue) {
    addressWithPickedFields.country = defaultValue;
  }

  if (user) {
    addressWithPickedFields.city = user.addresses[0]?.city
      ? user.addresses[0]?.city
      : checkoutData?.shippingAddress?.city;
    addressWithPickedFields.firstName =
      user.firstName.replace(/^\w/, (c: any) => c.toUpperCase()) +
      " " +
      user.lastName.replace(/^\w/, (c: any) => c.toUpperCase());
    addressWithPickedFields.streetAddress1 = user.addresses[0]?.streetAddress1
      ? user.addresses[0]?.streetAddress1
      : checkoutData?.shippingAddress?.streetAddress1;
    addressWithPickedFields.streetAddress2 = user.addresses[0]?.streetAddress2
      ? user.addresses[0]?.streetAddress2
      : checkoutData?.shippingAddress?.streetAddress2;
    addressWithPickedFields.email = user.email;
    addressWithPickedFields.phone = user.phone;
    addressWithPickedFields.id = user.addresses[0]?.id;
    addressWithPickedFields.documentNumber = user.documentNumber;
    addressWithPickedFields.termsAndConditions = user.termsAndConditions;
    addressWithPickedFields.dataTreatmentPolicy = user.dataTreatmentPolicy;
  }

  return (
    <Formik
      initialValues={addressWithPickedFields}
      enableReinitialize={true}
      onSubmit={(values, { setSubmitting }) => {
        if (handleSubmit) {
          handleSubmit(values);
        }
        setSubmitting(false);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        setFieldValue,
        setFieldTouched,
      }) => {
        return (
          <AddressFormContent
            {...{
              citiesOptions,
              comeFromModal,
              countriesOptions,
              defaultValue,
              formId,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldTouched,
              setFieldValue,
              user,
              values,
            }}
            {...props}
          />
        );
      }}
    </Formik>
  );
};
