import {
  getName,
  removeCountryCodeInPhoneNumber,
} from '@temp/@next/utils/addresForm';
import { IPrivacyPolicy } from '@temp/@sdk/api/Checkout/types';
import {
  ADDRESS_FORM_SHOW_GENERAL_ERRORS,
  ADDRESS_FORM_SORT,
  CHECKOUT_MANDATORY_COORDINATES,
  COUNTRY_DEFAULT,
} from '@temp/core/config';
import { IAddressWithEmail, IFormErrorSort } from '@types';
import { Form, Formik, FormikHelpers } from 'formik';
import { pick, sortBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { alertService } from '../../atoms/Alert';
import {
  addressFormModalSchema,
  addressFormSchema,
} from './adddressFormSchema';
import { AddressFormContent } from './AddressFormContent';
import { IProps } from './types';

const ADDRESS_FIELDS = [
  'city',
  'firstName',
  'lastName',
  'country',
  'phone',
  'streetAddress1',
  'streetAddress2',
  'email',
  'dataTreatmentPolicy',
  'termsAndConditions',
  'documentNumber',
  'latitude',
  'longitude',
];

export const AddressForm: React.FC<IProps> = ({
  address,
  formRef,
  handleSubmit: submitAddressForm,
  formId,
  defaultValue,
  countriesOptions,
  districtsOptions,
  user,
  userLoading,
  comeFromModal,
  checkoutData,
  setFormValue,
  errors: requestErrors,
  showOptionalAddressError,
  ...props
}: IProps) => {
  if (userLoading) return null;

  const [initialValues, setInitialValues] =
    useState<Partial<IAddressWithEmail>>();

  useEffect(() => {
    let addressWithPickedFields: Partial<IAddressWithEmail> = {};
    if (address) {
      addressWithPickedFields = pick(address, ADDRESS_FIELDS);
    }

    if (user) {
      const address = user.defaultShippingAddress;
      const streetAddress1 = address?.streetAddress1;
      const latitude = address?.latitude;

      addressWithPickedFields.firstName = getName(
        user.firstName,
        user.lastName
      );
      addressWithPickedFields.streetAddress1 =
        streetAddress1 && latitude ? streetAddress1 : undefined;
      addressWithPickedFields.streetAddress2 =
        address?.streetAddress2 || undefined;
      addressWithPickedFields.email = user.email;
      addressWithPickedFields.id = address?.id;
      addressWithPickedFields.documentNumber = user.documentNumber || '';
      addressWithPickedFields.phone = address?.phone
        ? removeCountryCodeInPhoneNumber(address?.phone)
        : '';
      addressWithPickedFields.termsAndConditions =
        user.termsAndConditions || false;
      addressWithPickedFields.dataTreatmentPolicy = user.dataTreatmentPolicy;
      addressWithPickedFields.latitude = latitude || '';
      addressWithPickedFields.longitude = address?.longitude || '';
    }

    if (checkoutData) {
      addressWithPickedFields.firstName =
        checkoutData.shippingAddress?.firstName ||
        addressWithPickedFields.firstName;
      addressWithPickedFields.email =
        checkoutData.email || addressWithPickedFields.email;
      addressWithPickedFields.documentNumber =
        checkoutData.documentNumber || addressWithPickedFields.documentNumber;
      addressWithPickedFields.phone = checkoutData.shippingAddress?.phone
        ? removeCountryCodeInPhoneNumber(checkoutData.shippingAddress.phone)
        : addressWithPickedFields.phone;
      addressWithPickedFields.termsAndConditions =
        checkoutData.termsAndConditions;
      addressWithPickedFields.dataTreatmentPolicy =
        checkoutData.dataTreatmentPolicy;
      addressWithPickedFields.streetAddress1 =
        checkoutData.shippingAddress?.streetAddress1 ||
        addressWithPickedFields.streetAddress1;
      addressWithPickedFields.streetAddress2 =
        checkoutData.shippingAddress?.streetAddress2 ||
        addressWithPickedFields.streetAddress2;
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

    setInitialValues(addressWithPickedFields);
  }, []);

  const handleOnSubmitAddressForm = (
    values: IAddressWithEmail,
    { setSubmitting, setFieldValue }: FormikHelpers<IAddressWithEmail>
  ) => {
    if (
      CHECKOUT_MANDATORY_COORDINATES &&
      values.streetAddress1 &&
      !values.latitude &&
      !comeFromModal
    ) {
      showOptionalAddressError?.();
      setFieldValue('city', '');
      setSubmitting(false);
      return;
    }

    if (submitAddressForm) {
      const _values: IAddressWithEmail = {
        ...values,
        country: COUNTRY_DEFAULT,
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
        initialValues.id,
        policyPrivacy,
        _values.documentNumber
      );
    }
    setSubmitting(false);
  };

  const formSchemaValidation = comeFromModal
    ? addressFormModalSchema
    : addressFormSchema;

  useEffect(() => {
    if (
      initialValues &&
      initialValues.streetAddress1 &&
      !initialValues.latitude
    ) {
      showOptionalAddressError?.();
    }
  }, [initialValues]);

  if (!initialValues) {
    return null;
  }

  return (
    <Formik
      initialValues={initialValues}
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
              document.getElementsByName(errors[0].field)[0]?.focus();
            }
          };

          const customErrors: IFormErrorSort[] =
            requestErrors?.length! > 0 ? [...requestErrors!] : [];
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
          let errorsSort = sortBy(customErrors, ['sort']);
          setErrors(errorsSort);

          if (errorsSort.length > 0 && submitCount > submitCountRef.current) {
            submitCountRef.current = submitCount;

            if (
              errorsSort.length < ADDRESS_FORM_SHOW_GENERAL_ERRORS &&
              values.streetAddress1 &&
              !values.latitude
            ) {
              if (
                CHECKOUT_MANDATORY_COORDINATES &&
                errorsSort.length === 1 &&
                errorsSort.find((err) => err.field === 'city')
              ) {
                errorsSort = [];
              } else {
                errorsSort.push({
                  message:
                    'Selecciona una dirección dentro de las opciones desplegadas.',
                });
              }
            }

            if (errorsSort.length === 0) {
              return;
            }

            alertService.sendAlert({
              acceptDialog: () => {
                scrollToErrors(errorsSort);
              },
              buttonText: 'Entendido',
              icon: '/assets/auna/form-populate-error.svg',
              message:
                errorsSort.length > ADDRESS_FORM_SHOW_GENERAL_ERRORS ? (
                  'Por favor completa los campos  obligatorios que se encuentran de color rojo.'
                ) : (
                  <>
                    Por favor completa los siguientes campos:{' '}
                    <ul>
                      {errorsSort.map((it, key) => (
                        <li key={key}>- {it.message}</li>
                      ))}
                    </ul>
                  </>
                ),
              title: 'Faltan datos',
              type: 'Text',
            });
          }
        }, [formikErrors, requestErrors, submitCount]);

        return (
          <Form ref={formRef} className="whatever">
            <AddressFormContent
              {...{
                districtsOptions,
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
                showOptionalAddressError,
              }}
              {...props}
            />
          </Form>
        );
      }}
    </Formik>
  );
};
