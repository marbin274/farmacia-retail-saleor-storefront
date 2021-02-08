import { Button, Checkbox, DataTreatmentPolicyLink, ErrorMessage, TermsAndConditionsLink } from "@app/components/atoms";
import { IFormError } from "@app/types";
import { joinFormikErrorsToIFormErrorsAndConvertToObjectErrors } from "@app/utils/errorsManagement";
import { TextField } from "@components/molecules";
import { accountConfirmUrl } from "@temp/app/routes";
import { useFormik } from "formik";
import React, { useState } from "react";
import { MutationFn } from "react-apollo";
import { RegisterAccount, RegisterAccountVariables } from "./gqlTypes/RegisterAccount";
import { registerFormSchema } from './registerForm.schema';

interface RegisterFormContentProps {
    loading: boolean;
    errors?: IFormError[];
    registerCustomer: MutationFn<RegisterAccount, RegisterAccountVariables>;
}
const initialValues: RegisterAccountVariables = {
    dataTreatmentPolicy: false,
    documentNumber: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    redirectUrl: `${window.location.origin}${accountConfirmUrl}`,
    termsAndConditions: false,
};
export const RegisterFormContent: React.FC<RegisterFormContentProps> = ({ loading, errors: requestErrors, registerCustomer }) => {

    const [termsAndConditions, setTermsAndConditions] = useState(initialValues.termsAndConditions);
    const [dataTreatmentPolicy, setDataTreatmentPolicy] = useState(initialValues.dataTreatmentPolicy);

    const { handleSubmit, handleChange, handleBlur, setFieldValue, touched, errors: formikErrors, values } = useFormik<RegisterAccountVariables>({
        initialValues,
        onSubmit: values => {
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

    const errors = joinFormikErrorsToIFormErrorsAndConvertToObjectErrors(formikErrors, requestErrors, touched, true);

    return <form onSubmit={handleSubmit}>
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
            maxLength={20}
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
    </form>;
}