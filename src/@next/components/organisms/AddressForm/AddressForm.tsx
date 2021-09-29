import { IFormErrorSort } from '@app/types';
import { IAddressForm } from '@app/types/IAddressForm';
import { ErrorForm } from '@components/atoms';
import { alertService } from '@app/services';
import { removeCountryCodeInPhoneNumber } from '@app/utils/addresForm';
import { ICheckout } from '@sdk/api/Checkout/types';
import { UserDetails_me } from '@sdk/queries/gqlTypes/UserDetails';
import {
  ADDRESS_FORM_SHOW_GENERAL_ERRORS,
  ADDRESS_FORM_SORT,
} from '@temp/core/config';
import { useFormik } from 'formik';
import ErrorFormPopulateIcon from './form-populate-error.svg';
import { sortBy } from 'lodash';
import React from 'react';
import { AddressSection, ShippingSection } from './components';
import { addressFormSchema } from './schema';
import { convertShippingMethodDateToDate } from '@temp/@next/utils/dateUtils';

const getCheckoutShippingAddress = (
  checkout: ICheckout,
  user: UserDetails_me,
  isLastMileActive: boolean
): IAddressForm | undefined => {
  if (checkout?.id) {
    return {
      dataTreatmentPolicy: checkout.dataTreatmentPolicy,
      deliveryDate: checkout.scheduleDate?.date
        ? convertShippingMethodDateToDate(checkout.scheduleDate?.date)
        : null,
      district: checkout.shippingAddress.district.id,
      documentNumber: checkout.documentNumber,
      email: checkout.email,
      phone: removeCountryCodeInPhoneNumber(checkout.shippingAddress.phone),
      firstName: checkout.shippingAddress.firstName,
      isScheduled: !!checkout.scheduleDate,
      isLastMileActive,
      latitude: checkout.shippingAddress.latitude,
      longitude: checkout.shippingAddress.longitude,
      slotId: checkout.slotId,
      streetAddress1: checkout.shippingAddress.streetAddress1,
      streetAddress2: checkout.shippingAddress.streetAddress2,
      scheduleDate: checkout.scheduleDate?.scheduleTime?.id,
      shippingMethod: checkout.shippingMethod?.id,
      termsAndConditions: checkout.termsAndConditions,
    };
  } else if (user) {
    return {
      dataTreatmentPolicy: user.dataTreatmentPolicy,
      district: user.defaultShippingAddress?.district.id,
      documentNumber: user.documentNumber,
      email: user.email,
      phone: user.defaultShippingAddress?.phone
        ? removeCountryCodeInPhoneNumber(user.defaultShippingAddress.phone)
        : '',
      firstName: `${user.firstName} ${user.lastName}`,
      isLastMileActive,
      isScheduled: false,
      latitude: user.defaultShippingAddress?.latitude,
      longitude: user.defaultShippingAddress?.longitude,
      streetAddress1: user.defaultShippingAddress?.streetAddress1,
      streetAddress2: user.defaultShippingAddress?.streetAddress2,
      termsAndConditions: user.termsAndConditions,
    };
  } else if (!checkout?.shippingAddress || !user) {
    return {
      dataTreatmentPolicy: false,
      district: '',
      documentNumber: '',
      email: '',
      phone: '',
      firstName: '',
      isLastMileActive,
      isScheduled: false,
      latitude: null,
      longitude: null,
      streetAddress1: '',
      streetAddress2: '',
      termsAndConditions: false,
    };
  } else {
    return undefined;
  }
};
export interface IAddressFormProps {
  checkout: ICheckout;
  formRef: React.MutableRefObject<HTMLFormElement>;
  isLastMileActive: boolean;
  user: UserDetails_me;
  handleSubmit(data: IAddressForm): void;
}

export const AddressForm: React.FC<IAddressFormProps> = ({
  checkout,
  formRef,
  isLastMileActive,
  user,
  handleSubmit: checkoutAddressSubmit,
}) => {
  const {
    errors: fieldErrors,
    isSubmitting,
    submitCount,
    touched,
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    setValues,
  } = useFormik<IAddressForm>({
    initialValues: getCheckoutShippingAddress(checkout, user, isLastMileActive),
    validationSchema: addressFormSchema,
    onSubmit: checkoutAddressSubmit,
  });

  React.useEffect(() => {
    if (!isSubmitting || Object.keys(fieldErrors).length === 0) return;
    const scrollToErrors = (errors: IFormErrorSort[]) => {
      if (errors[0]?.field) {
        document.getElementsByName(errors[0].field)[0]?.focus();
      }
    };

    const customErrors: IFormErrorSort[] = [];
    for (const property of Object.keys(fieldErrors)) {
      const _err: IFormErrorSort = {
        field: property,
        message: (fieldErrors as any)[property],
        sort: (ADDRESS_FORM_SORT as any)[property],
      };
      customErrors.push(_err);
    }
    const errorsSort = sortBy(customErrors, ['sort']);

    alertService.sendAlert({
      acceptDialog: () => {
        scrollToErrors(errorsSort);
      },
      buttonText: 'Entendido',
      icon: ErrorFormPopulateIcon,
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
  }, [submitCount]);

  const sectionsProps = {
    fieldErrors,
    handleChange,
    setValues,
    setFieldValue,
    touched,
    values,
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} role="form">
      <AddressSection {...sectionsProps} />
      {!!values.district && !!values.latitude ? (
        <ShippingSection {...sectionsProps} />
      ) : touched.district ? (
        <ErrorForm>{fieldErrors.shippingMethod}</ErrorForm>
      ) : (
        <></>
      )}
    </form>
  );
};
