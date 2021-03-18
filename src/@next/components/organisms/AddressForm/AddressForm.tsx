import { Formik } from "formik";
import { pick } from "lodash";
import React from "react";

import { IAddressWithEmail } from "@types";
import { AddressFormContent } from "./AddressFormContent";
import { IProps } from "./types";
import {
  addressFormModalSchema,
  addressFormSchema,
} from "./adddressForm.schema";

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
  setFormValue,
  ...props
}: IProps) => {
  let addressWithPickedFields: Partial<IAddressWithEmail> = {};
  if (address) {
    addressWithPickedFields = pick(address, ADDRESS_FIELDS);
  }
  addressWithPickedFields.phone = checkoutData?.shippingAddress?.phone
    ? checkoutData?.shippingAddress?.phone.substring(
      checkoutData?.shippingAddress?.phone.length - 9
    )
    : "";
  addressWithPickedFields.documentNumber = checkoutData?.documentNumber;
  addressWithPickedFields.termsAndConditions = checkoutData?.termsAndConditions;
  addressWithPickedFields.dataTreatmentPolicy =
    checkoutData?.dataTreatmentPolicy;

  if (defaultValue) {
    addressWithPickedFields.country = defaultValue;
  }

  if (user) {
    addressWithPickedFields.city = sessionStorage.getItem("exist_checkout")
      ? ""
      : checkoutData?.shippingAddress?.city;
    addressWithPickedFields.firstName =
      user.firstName.replace(/^\w/, (c: any) => c.toUpperCase()) +
      " " +
      user.lastName.replace(/^\w/, (c: any) => c.toUpperCase());
    addressWithPickedFields.streetAddress1 = user.addresses?.[0]?.streetAddress1
      ? user.addresses[0]?.streetAddress1
      : checkoutData?.shippingAddress?.streetAddress1;
    addressWithPickedFields.streetAddress2 = user.addresses?.[0]?.streetAddress2
      ? user.addresses[0]?.streetAddress2
      : checkoutData?.shippingAddress?.streetAddress2;
    addressWithPickedFields.email = user.email;
    addressWithPickedFields.id = user.addresses?.[0]?.id;
    addressWithPickedFields.documentNumber = addressWithPickedFields.documentNumber
      ? addressWithPickedFields.documentNumber
      : (user.documentNumber ? user.documentNumber : "");
    addressWithPickedFields.termsAndConditions = user.termsAndConditions
      ? user.termsAndConditions
      : false;
    addressWithPickedFields.dataTreatmentPolicy = user.dataTreatmentPolicy;
  }
  const formSchemaValidation = comeFromModal
    ? addressFormModalSchema
    : addressFormSchema;

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
      validationSchema={formSchemaValidation}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        setFieldValue,
        setFieldTouched,
        errors: formikErrors,
        touched,
        isValid,
        validateForm,
      }) => {
        return (
          <AddressFormContent
            {...{
              citiesOptions,
              comeFromModal,
              countriesOptions,
              defaultValue,
              formId,
              formikErrors,
              handleBlur,
              handleChange,
              handleSubmit,
              isValid,
              setFieldTouched,
              setFieldValue,
              touched,
              user,
              validateForm,
              values,
            }}
            {...props}
          />
        );
      }}
    </Formik>
  );
};
