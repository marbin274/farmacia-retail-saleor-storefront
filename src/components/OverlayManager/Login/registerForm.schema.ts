import {
    dataTreatmentPolicyValidation,
    documentNumberValidation,
    emailValidation,
    termsAndConditionsValidation
} from "@temp/@next/utils/schemas";
import * as Yup from "yup";

export const registerFormSchema = Yup.object().shape({
    dataTreatmentPolicy: dataTreatmentPolicyValidation,
    documentNumber: documentNumberValidation,
    email: emailValidation,
    firstName: Yup.string().required("Ingresa tu nombre"),
    lastName: Yup.string().required("Ingresa tu apellido"),
    password: Yup.string().min(8, "Debe contener ${min} caracteres como mínimo").required("Ingresa una contraseña"),// tslint:disable-line
    redirectUrl: Yup.string().notRequired(),
    termsAndConditions: termsAndConditionsValidation,
});
