import React, { useState } from "react";
import { Button, Checkbox } from "@app/components/atoms";
import { ErrorMessage } from "@app/components/atoms/ErrorMessage";
import { TextField } from "@components/molecules";
import { MutationFn } from "react-apollo";
import { RegisterAccount, RegisterAccountVariables } from "./gqlTypes/RegisterAccount";
import { registerFormSchema } from './registerForm.schema';
import { accountConfirmUrl } from "@temp/app/routes";
import { useFormik } from "formik";

interface RegisterFormContentProps {
    data: RegisterAccount
    loading: boolean;
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
export const RegisterFormContent: React.FC<RegisterFormContentProps> = ({ data, loading, registerCustomer }) => {

    const [termsAndConditions, setTermsAndConditions] = useState(initialValues.termsAndConditions);
    const [dataTreatmentPolicy, setDataTreatmentPolicy] = useState(initialValues.dataTreatmentPolicy);


    const { handleSubmit, handleChange, handleBlur, setFieldValue, touched, errors, values } = useFormik<RegisterAccountVariables>({
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



    return <form onSubmit={handleSubmit}>
        <TextField
            data-cy="registerFormFirstName"
            name="firstName"
            placeholder="Nombre"
            label="*Nombre"
            type="text"
            value={!values?.firstName ? "" : values?.firstName}
            errors={(touched.firstName && errors.firstName) && [{ field: 'firstName', message: errors.firstName }]}
            onChange={handleChange}
            onBlur={handleBlur}
        />
        <TextField
            name="lastName"
            placeholder="Apellido"
            label="*Apellido"
            type="text"
            value={!values?.lastName ? "" : values?.lastName}
            errors={(touched.lastName && errors.lastName) && [{ field: 'lastName', message: errors.lastName }]}
            onChange={handleChange}
            onBlur={handleBlur}
        />
        <TextField
            name="documentNumber"
            placeholder="Documento"
            label="*Documento"
            type="text"
            value={!values?.documentNumber ? "" : values?.documentNumber}
            errors={(touched.documentNumber && errors.documentNumber) && [{ field: 'documentNumber', message: errors.documentNumber }]}
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
            errors={(touched.email && errors.email) && [{ field: 'email', message: errors.email }]}
            onChange={handleChange}
            onBlur={handleBlur}
        />
        <TextField
            name="password"
            placeholder="Contraseña"
            label="*Contraseña"
            type="password"
            value={!values?.password ? "" : values?.password}
            errors={(touched.password && errors.password) && [{ field: 'password', message: errors.password }]}
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
                <label htmlFor="">
                    * Estoy de acuerdo con las
                  <a href="https://saleor-frontend-storage.s3.us-east-2.amazonaws.com/legal/farmacia-politicas-privacidad.pdf">
                        {" "}
                    Políticas de privacidad
                  </a>{" "}
                  y
                  <a href="https://saleor-frontend-storage.s3.us-east-2.amazonaws.com/legal/farmacia-terminos-condiciones.pdf">
                        {" "}
                    Términos y condiciones
                  </a>
                </label>
            </Checkbox>
            <ErrorMessage errors={(touched.termsAndConditions && errors.termsAndConditions) && [{ field: 'termsAndConditions', message: errors.termsAndConditions }]} />
        </div>
        <div className="login__additionals">
            <Checkbox
                data-cy="checkoutPaymentPromoCodeCheckbox"
                name="dataTreatmentPolicy"
                checked={dataTreatmentPolicy}
                onChange={handleDataTreatmentPolicy}
            >
                <label htmlFor="">
                    Acepto el tratamiento para <a href="#"> Fines adicionales</a>{" "}
                  (opcional )
                </label>
            </Checkbox>
        </div>
        <div className="login__content__button">
            <Button type="submit" {...(loading && { disabled: true })}>
                {loading ? "Cargando" : "Crear cuenta"}
            </Button>
        </div>
    </form>;
}
