import {
  Checkbox,
  DataTreatmentPolicyLink,
  ErrorMessage,
  TermsAndConditionsLink,
} from '@app/components/atoms';
import { joinFormikErrorsToIFormErrorsAndConvertToObjectErrors } from '@app/utils/errorsManagement';
import { DOCUMENT_NUMBER_MAX_LENGTH } from '@app/utils/schemasConfig';
import { accountConfirmUrl } from '@temp/app/routes';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { registerFormSchema } from './RegisterForm.schema';
import { ILoginForm, IProps } from '../../types';
import { Button, InputField } from '@farmacia-retail/farmauna-components';
import { RegisterAccountVariables } from '@temp/@sdk/mutations/gqlTypes/RegisterAccount';
import { WINDOW_EXISTS } from '@temp/@sdk/consts';

const initialValues: ILoginForm = {
  confirmPassword: '',
  dataTreatmentPolicy: false,
  documentNumber: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  redirectUrl: WINDOW_EXISTS
    ? `${window.location.origin}${accountConfirmUrl}`
    : accountConfirmUrl,
  termsAndConditions: false,
};
export const RegisterFormContent: React.FC<IProps> = ({
  loading,
  errors: requestErrors,
  registerCustomer,
  setEmail,
}) => {
  const [termsAndConditions, setTermsAndConditions] = useState(
    initialValues.termsAndConditions
  );
  const [dataTreatmentPolicy, setDataTreatmentPolicy] = useState(
    initialValues.dataTreatmentPolicy
  );

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    touched,
    errors: formikErrors,
    values,
  } = useFormik<ILoginForm>({
    initialValues,
    onSubmit: (values) => {
      setEmail(values.email);
      const variables: RegisterAccountVariables = {
        dataTreatmentPolicy: values.dataTreatmentPolicy,
        documentNumber: values.documentNumber,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        redirectUrl: values.redirectUrl,
        termsAndConditions: values.termsAndConditions,
      };
      registerCustomer({ variables });
    },
    validationSchema: registerFormSchema,
  });

  const handleTermsAndConditions = () => {
    setTermsAndConditions(!termsAndConditions);
    setFieldValue('termsAndConditions', !termsAndConditions);
  };

  const handleDataTreatmentPolicy = () => {
    setDataTreatmentPolicy(!dataTreatmentPolicy);
    setFieldValue('dataTreatmentPolicy', !dataTreatmentPolicy);
  };

  const errors = joinFormikErrorsToIFormErrorsAndConvertToObjectErrors(
    formikErrors,
    requestErrors,
    touched,
    true
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="fa-mb-2.5 sm:fa-mb-4">
        <InputField
          data-cy="registerFormFirstName"
          name="firstName"
          placeholder="Ingresa tus nombres"
          label="Nombres"
          type="text"
          value={!values?.firstName ? '' : values?.firstName}
          error={!!errors?.firstName ? errors!.firstName[0].message : ''}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="fa-mb-2.5 sm:fa-mb-4">
        <InputField
          name="lastName"
          placeholder="Ingresa tus apellidos"
          label="Apellidos"
          type="text"
          value={!values?.lastName ? '' : values?.lastName}
          error={!!errors?.lastName ? errors!.lastName[0].message : ''}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="fa-mb-2.5 sm:fa-mb-4">
        <InputField
          name="documentNumber"
          placeholder="Ingresa tu documento de identidad (DNI)"
          label="Documento"
          type="text"
          value={!values?.documentNumber ? '' : values?.documentNumber}
          error={
            !!errors?.documentNumber ? errors!.documentNumber[0].message : ''
          }
          maxLength={DOCUMENT_NUMBER_MAX_LENGTH}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="fa-mb-2.5 sm:fa-mb-4">
        <InputField
          name="email"
          placeholder="Ingresa tu correo electr??nico"
          label="Correo electr??nico"
          type="text"
          value={!values?.email ? '' : values?.email}
          error={!!errors?.email ? errors!.email[0].message : ''}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="fa-mb-2.5 sm:fa-mb-4">
        <InputField
          name="password"
          placeholder="Crea una contrase??a"
          label="Contrase??a"
          type="password"
          value={!values?.password ? '' : values?.password}
          error={!!errors?.password ? errors!.password[0].message : ''}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="off"
        />
      </div>
      <div className="fa-mb-2.5 sm:fa-mb-4">
        <InputField
          name="confirmPassword"
          placeholder="Ingresa nuevamente la contrase??a"
          label="Confirmar contrase??a"
          type="password"
          value={!values?.confirmPassword ? '' : values?.confirmPassword}
          error={
            !!errors?.confirmPassword ? errors!.confirmPassword[0].message : ''
          }
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="off"
        />
      </div>
      <div className="fa-pl-0.5 fa-mt-0 sm:fa-mt-8">
        <Checkbox
          data-cy="checkoutPaymentPromoCodeCheckbox"
          name="termsAndConditions"
          checked={termsAndConditions}
          onChange={handleTermsAndConditions}
        >
          <TermsAndConditionsLink />
        </Checkbox>
        <ErrorMessage errors={errors} />
      </div>
      <div className="fa-pl-0.5 fa-mt-4 sm:fa-mt-8">
        <Checkbox
          data-cy="checkoutPaymentPromoCodeCheckbox"
          name="dataTreatmentPolicy"
          checked={dataTreatmentPolicy}
          onChange={handleDataTreatmentPolicy}
        >
          <DataTreatmentPolicyLink />
        </Checkbox>
      </div>
      <div className="fa-mt-8">
        <Button
          type="submit"
          size="large"
          className="fa-font-semibold"
          fullWidth
          {...(loading && { disabled: true })}
        >
          {loading ? 'Cargando' : 'Crear cuenta'}
        </Button>
      </div>
    </form>
  );
};
