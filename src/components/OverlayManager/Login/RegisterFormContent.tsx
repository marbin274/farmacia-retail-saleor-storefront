import {
  Checkbox,
  DataTreatmentPolicyLink,
  ErrorMessage,
  TermsAndConditionsLink,
} from "@app/components/atoms";
import { joinFormikErrorsToIFormErrorsAndConvertToObjectErrors } from "@app/utils/errorsManagement";
import { DOCUMENT_NUMBER_MAX_LENGTH } from "@app/utils/schemasConfig";
import { accountConfirmUrl } from "@temp/app/routes";
import { useFormik } from "formik";
import React, { useState } from "react";
import { RegisterAccountVariables } from "./gqlTypes/RegisterAccount";
import { registerFormSchema } from "./registerForm.schema";
import { ILoginForm, IProps } from "./types";
import { Button, InputField } from "@farmacia-retail/farmauna-components";

const initialValues: ILoginForm = {
  confirmPassword: "",
  dataTreatmentPolicy: false,
  documentNumber: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  redirectUrl: `${window.location.origin}${accountConfirmUrl}`,
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
    onSubmit: values => {
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
    setFieldValue("termsAndConditions", !termsAndConditions);
  };

  const handleDataTreatmentPolicy = () => {
    setDataTreatmentPolicy(!dataTreatmentPolicy);
    setFieldValue("dataTreatmentPolicy", !dataTreatmentPolicy);
  };

  const errors = joinFormikErrorsToIFormErrorsAndConvertToObjectErrors(
    formikErrors,
    requestErrors,
    touched,
    true
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="InputField">
        <InputField
          data-cy="registerFormFirstName"
          name="firstName"
          placeholder="Ingresa tus nombres"
          label="Nombres"
          type="text"
          value={!values?.firstName ? "" : values?.firstName}
          error={!!errors?.firstName ? errors!.firstName[0].message : ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="InputField">
        <InputField
          name="lastName"
          placeholder="Ingresa tus apellidos"
          label="Apellidos"
          type="text"
          value={!values?.lastName ? "" : values?.lastName}
          error={!!errors?.lastName ? errors!.lastName[0].message : ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="InputField">
        <InputField
          name="documentNumber"
          placeholder="Ingresa tu documento de identidad (DNI)"
          label="Documento"
          type="text"
          value={!values?.documentNumber ? "" : values?.documentNumber}
          error={
            !!errors?.documentNumber ? errors!.documentNumber[0].message : ""
          }
          maxLength={DOCUMENT_NUMBER_MAX_LENGTH}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="InputField">
        <InputField
          name="email"
          placeholder="Ingresa tu correo electrónico"
          label="Correo electrónico"
          type="text"
          value={!values?.email ? "" : values?.email}
          error={!!errors?.email ? errors!.email[0].message : ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="InputField">
        <InputField
          name="password"
          placeholder="Crea una contraseña"
          label="Contraseña"
          type="password"
          value={!values?.password ? "" : values?.password}
          error={!!errors?.password ? errors!.password[0].message : ""}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="off"
        />
      </div>
      <div className="InputField">
        <InputField
          name="confirmPassword"
          placeholder="Ingresa nuevamente la contraseña"
          label="Confirmar contraseña"
          type="password"
          value={!values?.confirmPassword ? "" : values?.confirmPassword}
          error={
            !!errors?.confirmPassword ? errors!.confirmPassword[0].message : ""
          }
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="off"
        />
      </div>
      <div className="login__privacy__policies">
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
      <div className="login__additionals">
        <Checkbox
          data-cy="checkoutPaymentPromoCodeCheckbox"
          name="dataTreatmentPolicy"
          checked={dataTreatmentPolicy}
          onChange={handleDataTreatmentPolicy}
        >
          <DataTreatmentPolicyLink />
        </Checkbox>
      </div>
      <div className="login__content__button">
        <Button type="submit" size="large" {...(loading && { disabled: true })}>
          {loading ? "Cargando" : "Crear cuenta"}
        </Button>
      </div>
    </form>
  );
};
