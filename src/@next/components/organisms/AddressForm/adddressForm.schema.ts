import * as SchemaValidation from "@temp/@next/utils/schemas";
import * as Yup from "yup";

export const DISTRITO_REQUIRED = "Selecciona el distrito de entrega";
const STREET_ADDRESS_1_REQUIRED = "Ingresa tu dirección exacta";

export const addressFormSchema = Yup.object().shape({
  city: Yup.string().required(DISTRITO_REQUIRED),
  dataTreatmentPolicy: SchemaValidation.dataTreatmentPolicyValidation,
  documentNumber: SchemaValidation.documentNumberValidation,
  email: SchemaValidation.emailValidation,
  firstName: SchemaValidation.fullNameValidation,
  phone: SchemaValidation.phoneValidation,
  streetAddress1: Yup.string().trim().required(STREET_ADDRESS_1_REQUIRED),
  streetAddress2: Yup.string().trim(),
  termsAndConditions: SchemaValidation.termsAndConditionsValidation,
});
