import * as SchemaValidation from "@temp/@next/utils/schemas";
import * as Yup from "yup";

export const DISTRITO_REQUIRED = "Selecciona el distrito de entrega";
export const STREET_ADDRESS_1_REQUIRED = "Ingresa tu dirección exacta";
export const COORDINATES_REQUIRED = "Ingresa tu dirección en el mapa";

export const addressFormSchema = Yup.object().shape({
  city: Yup.string().required(DISTRITO_REQUIRED),
  dataTreatmentPolicy: SchemaValidation.dataTreatmentPolicyValidation,
  documentNumber: SchemaValidation.documentNumberValidation,
  email: SchemaValidation.emailValidation,
  firstName: SchemaValidation.fullNameValidation,
  latitude: Yup.number().nullable(),
  phone: SchemaValidation.phoneValidation,
  streetAddress1: Yup.string()
    .trim()
    .required(STREET_ADDRESS_1_REQUIRED),
  streetAddress2: Yup.string().trim(),
  termsAndConditions: SchemaValidation.termsAndConditionsValidation,
});

export const addressFormModalSchema = Yup.object().shape({
  city: Yup.string().required(DISTRITO_REQUIRED),
  dataTreatmentPolicy: Yup.boolean(),
  documentNumber: Yup.string(),
  email: Yup.string(),
  firstName: Yup.string(),
  phone: SchemaValidation.phoneValidation,
  streetAddress1: Yup.string()
    .trim()
    .required(STREET_ADDRESS_1_REQUIRED),
  streetAddress2: Yup.string().trim(),
  termsAndConditions: Yup.boolean(),
});
