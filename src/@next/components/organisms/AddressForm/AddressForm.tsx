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
  documentNumber,
  termsAndConditions,
  dataTreatmentPolicy,
  ...props
}: IProps) => {
  let addressWithPickedFields: Partial<IAddressWithEmail> = {};
  if (address) {
    addressWithPickedFields = pick(address, ADDRESS_FIELDS);
  }

  addressWithPickedFields.documentNumber = documentNumber;
  addressWithPickedFields.termsAndConditions = termsAndConditions;
  addressWithPickedFields.dataTreatmentPolicy = dataTreatmentPolicy;

  if (defaultValue) {
    addressWithPickedFields.country = defaultValue;
  }

  if (user) {
    const defaultAddress = user.addresses[0]
    addressWithPickedFields.city = defaultAddress?.city;
    addressWithPickedFields.firstName =
      user.firstName.replace(/^\w/, (c: any) => c.toUpperCase()) +
      " " +
      user.lastName.replace(/^\w/, (c: any) => c.toUpperCase());
    addressWithPickedFields.streetAddress1 = defaultAddress?.streetAddress1;
    addressWithPickedFields.streetAddress2 = defaultAddress?.streetAddress2;
    addressWithPickedFields.email = user.email;
    addressWithPickedFields.phone = user.phone;
    addressWithPickedFields.id = defaultAddress?.id;
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
