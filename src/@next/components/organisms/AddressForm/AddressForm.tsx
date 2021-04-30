import { getName, removeCountryCodeInPhoneNumber } from "@temp/@next/utils/addresForm";
import { IPrivacyPolicy } from "@temp/@sdk/api/Checkout/types";
import { ADDRESS_FORM_SHOW_GENERAL_ERRORS, ADDRESS_FORM_SORT } from "@temp/core/config";
import { IAddressWithEmail, IFormErrorSort } from "@types";
import { Form, Formik, FormikHelpers } from "formik";
import ErrorFormPopulateIcon from "images/auna/form-populate-error.svg";
import { pick, sortBy } from "lodash";
import React from "react";
import { alertService } from "../../atoms/Alert";
import {
  addressFormModalSchema,
  addressFormSchema
} from "./adddressFormSchema";
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
  "latitude",
  "longitude",
];

export const AddressForm: React.FC<IProps> = ({
  address,
  formRef,
  handleSubmit: submitAddressForm,
  formId,
  defaultValue,
  countriesOptions,
  citiesOptions,
  user,
  comeFromModal,
  checkoutData,
  setFormValue,
  errors: requestErrors,
  ...props
}: IProps) => {
  let addressWithPickedFields: Partial<IAddressWithEmail> = {};
  if (address) {
    addressWithPickedFields = pick(address, ADDRESS_FIELDS);
  }

  if (user) {
    const address = user.defaultShippingAddress;
    const streetAddress1 = address?.streetAddress1;
    const latitude = address?.latitude;

    addressWithPickedFields.firstName = getName(user.firstName, user.lastName);
    addressWithPickedFields.streetAddress1 =
      streetAddress1 && latitude ? streetAddress1 : undefined;
    addressWithPickedFields.streetAddress2 = address?.streetAddress2 || undefined;
    addressWithPickedFields.email = user.email;
    addressWithPickedFields.id = address?.id;
    addressWithPickedFields.documentNumber = user.documentNumber || '';
    addressWithPickedFields.phone = address?.phone ? removeCountryCodeInPhoneNumber(address?.phone) : '';
    addressWithPickedFields.termsAndConditions = user.termsAndConditions || false;
    addressWithPickedFields.dataTreatmentPolicy = user.dataTreatmentPolicy;
    addressWithPickedFields.latitude = latitude || "";
    addressWithPickedFields.longitude = address?.longitude || "";
    addressWithPickedFields.city = address?.city || "";
  }

  if (checkoutData) {
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
    addressWithPickedFields.city = checkoutData.shippingAddress?.city || addressWithPickedFields.city;
  }

  if (defaultValue) {
    addressWithPickedFields.country = defaultValue;
  }

  const handleOnSubmitAddressForm = (values: IAddressWithEmail, { setSubmitting }: FormikHelpers<IAddressWithEmail>) => {
    if (submitAddressForm) {
      const _values: IAddressWithEmail = {
        ...values,
        country: {
          code: "PE",
          country: "Peru",
        },
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
      };
      const policyPrivacy: IPrivacyPolicy = {
        dataTreatmentPolicy: values.dataTreatmentPolicy || false,
        termsAndConditions: values.termsAndConditions,
      };
      submitAddressForm(
        _values,
        _values.email,
        addressWithPickedFields.id,
        policyPrivacy,
        _values.documentNumber
      );
    }
    setSubmitting(false);
  }

  const formSchemaValidation = comeFromModal
    ? addressFormModalSchema
    : addressFormSchema;

  return (
    <Formik
      initialValues={addressWithPickedFields}
      enableReinitialize={true}
      onSubmit={handleOnSubmitAddressForm}
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
        submitCount,
      }) => {

        const submitCountRef = React.useRef<number>(submitCount);
        const [errors, setErrors] = React.useState<IFormErrorSort[]>([]);        
        
        
        React.useEffect(() => {

          const scrollToErrors = (errors: IFormErrorSort[]) => {
            if (errors[0]?.field) {
              document.getElementsByName(errors[0].field)[0].focus();
            }
          }

          const customErrors: IFormErrorSort[] = requestErrors ? [...requestErrors] : [];
          for (const property of Object.keys(formikErrors)) {
            const _err: IFormErrorSort = {
              field: property,
              message: (formikErrors as any)[property],
              sort: (ADDRESS_FORM_SORT as any)[property],
            };
            if (touched.hasOwnProperty(property)) {
              customErrors.push(_err);
            }
          }
          const errorsSort = sortBy(customErrors, ["sort"]);
          setErrors(errorsSort);

          if (errorsSort.length > 0 && submitCount > submitCountRef.current) {
            submitCountRef.current = submitCount;
            alertService.sendAlert({
              acceptDialog: () => {
                scrollToErrors(errorsSort);
              },
              buttonText: "Entendido",
              icon: ErrorFormPopulateIcon,
              message:
                errorsSort.length > ADDRESS_FORM_SHOW_GENERAL_ERRORS ?
                  "Por favor completa los campos  obligatorios que se encuentran de color rojo." :
                  <>Por favor completa los siguientes campos: <ul>{errorsSort.map((it, key) => <li key={key}>- {it.message}</li>)}</ul></>,
              title: "Faltan datos",
              type: "Info",
            });
          }

        }, [formikErrors, requestErrors, submitCount]);

        return (
          <Form
            ref={formRef}
            className="whatever"
          >
            <AddressFormContent
              {...{
                citiesOptions,
                comeFromModal,
                countriesOptions,
                defaultValue,
                errors,
                formId,
                formRef,
                formikErrors,
                handleBlur,
                handleChange,
                handleSubmit,
                isValid,
                setFieldTouched,
                setFieldValue,
                touched,
                user,
                values,
              }}
              {...props}
            />
          </Form>
        );
      }}
    </Formik>
  );
};
