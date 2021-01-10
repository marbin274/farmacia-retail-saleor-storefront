import {
  dataTreatmentPolicyValidation,
  documentNumberValidation,
  emailValidation,
  fullNameValidation,
  phoneValidation,
  termsAndConditionsValidation
} from "@temp/@next/utils/schemas";
import * as Yup from "yup";

export const addressFormSchema = Yup.object().shape({
  city: Yup.string().required("Selecciona el distrito de entrega"),
  dataTreatmentPolicy: dataTreatmentPolicyValidation,
  documentNumber: documentNumberValidation,
  email: emailValidation,
  firstName: fullNameValidation,
  phone: phoneValidation,
  streetAddress1: Yup.string().trim().required("Ingresa tu dirección exacta"),
  streetAddress2: Yup.string().trim(),
  termsAndConditions: termsAndConditionsValidation,
});
