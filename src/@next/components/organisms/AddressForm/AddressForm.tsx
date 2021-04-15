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
import { getName, removeCountryCodeInPhoneNumber } from "@temp/@next/utils/addresForm";

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
  "latitude",
  "longitude",
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

  if (user) {
    // addressWithPickedFields.city = checkoutData?.shippingAddress?.city;
    addressWithPickedFields.firstName = getName(user.firstName, user.lastName);
    addressWithPickedFields.streetAddress1 = user.addresses?.[0]?.streetAddress1 || undefined;
    addressWithPickedFields.streetAddress2 = user.addresses?.[0]?.streetAddress2 || undefined;
    addressWithPickedFields.email = user.email;
    addressWithPickedFields.id = user.addresses?.[0]?.id;
    addressWithPickedFields.documentNumber = user.documentNumber || '';
    addressWithPickedFields.phone = user.addresses?.[0]?.phone ? removeCountryCodeInPhoneNumber(user.addresses?.[0]?.phone): '';
    addressWithPickedFields.termsAndConditions = user.termsAndConditions || false;
    addressWithPickedFields.dataTreatmentPolicy = user.dataTreatmentPolicy;
    addressWithPickedFields.latitude = user.addresses?.[0]?.latitude || "";
    addressWithPickedFields.longitude = user.addresses?.[0]?.longitude || "";
  }

  if(checkoutData){
    addressWithPickedFields.firstName = checkoutData.shippingAddress?.firstName || addressWithPickedFields.firstName;
    addressWithPickedFields.email = checkoutData.email || addressWithPickedFields.email;
    addressWithPickedFields.documentNumber = checkoutData.documentNumber || addressWithPickedFields.documentNumber;
    addressWithPickedFields.phone = checkoutData.shippingAddress?.phone
      ? removeCountryCodeInPhoneNumber(checkoutData.shippingAddress.phone)
      : addressWithPickedFields.phone;
    addressWithPickedFields.termsAndConditions = checkoutData.termsAndConditions;
    addressWithPickedFields.dataTreatmentPolicy = checkoutData.dataTreatmentPolicy;
    addressWithPickedFields.streetAddress1 = checkoutData.shippingAddress?.streetAddress1 || addressWithPickedFields.streetAddress1;
    addressWithPickedFields.streetAddress2 = checkoutData.shippingAddress?.streetAddress2 || addressWithPickedFields.streetAddress2;
    addressWithPickedFields.latitude =
      checkoutData.shippingAddress?.latitude ||
      addressWithPickedFields.latitude;
    addressWithPickedFields.longitude =
      checkoutData.shippingAddress?.longitude ||
      addressWithPickedFields.longitude;
  }
  
  if (defaultValue) {
    addressWithPickedFields.country = defaultValue;
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
        initialValues,
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
              initialValues,
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
