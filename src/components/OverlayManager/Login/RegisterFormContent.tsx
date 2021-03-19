import {
  Button,
  Checkbox,
  DataTreatmentPolicyLink,
  ErrorMessage,
  TermsAndConditionsLink,
} from "@app/components/atoms";
import { IFormError } from "@app/types";
import { joinFormikErrorsToIFormErrorsAndConvertToObjectErrors } from "@app/utils/errorsManagement";
import { TextField } from "@components/molecules";
import { DOCUMENT_NUMBER_MAX_LENGTH } from "@app/utils/schemas.config";
import { accountConfirmUrl } from "@temp/app/routes";
import { useFormik } from "formik";
import React, { useState } from "react";
import { MutationFn } from "react-apollo";
import {
  RegisterAccount,
  RegisterAccountVariables,
} from "./gqlTypes/RegisterAccount";
import { registerFormSchema } from "./registerForm.schema";

interface RegisterFormContentProps {
  loading: boolean;
  errors?: IFormError[];
  registerCustomer: MutationFn<RegisterAccount, RegisterAccountVariables>;
  setEmail?: (email: string) => void;
}
const initialValues: RegisterAccountVariables = {
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
export const RegisterFormContent: React.FC<RegisterFormContentProps> = ({
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
  } = useFormik<RegisterAccountVariables>({
    initialValues,
    onSubmit: values => {
      setEmail(values.email);
      registerCustomer({ variables: values });
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
      <TextField
        data-cy="registerFormFirstName"
        name="firstName"
        placeholder="Nombre"
        label="*Nombre"
        type="text"
        value={!values?.firstName ? "" : values?.firstName}
        errors={errors!.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextField
        name="lastName"
        placeholder="Apellido"
        label="*Apellido"
        type="text"
        value={!values?.lastName ? "" : values?.lastName}
        errors={errors!.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextField
        name="documentNumber"
        placeholder="Documento"
        label="*Documento"
        type="text"
        value={!values?.documentNumber ? "" : values?.documentNumber}
        errors={errors!.documentNumber}
        maxLength={DOCUMENT_NUMBER_MAX_LENGTH}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextField
        name="email"
        placeholder="Correo"
        label="*Correo"
        type="text"
        value={!values?.email ? "" : values?.email}
        errors={errors.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextField
        name="password"
        placeholder="Contraseña"
        label="*Contraseña"
        type="password"
        value={!values?.password ? "" : values?.password}
        errors={errors!.password}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="off"
      />
      <TextField
        name="confirmPassword"
        placeholder="Ingresa nuevamente la contraseña"
        label="*Confirmar contraseña"
        type="password"
        value={!values?.confirmPassword ? "" : values?.confirmPassword}
        errors={errors!.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="off"
      />
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
        <Button type="submit" {...(loading && { disabled: true })}>
          {loading ? "Cargando" : "Crear cuenta"}
        </Button>
      </div>
    </form>
  );
};
