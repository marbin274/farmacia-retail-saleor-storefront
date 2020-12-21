import * as Yup from "yup";

export const addressFormSchema = Yup.object().shape({
  city: Yup.string().required("Indique el distrito"),
  dataTreatmentPolicy: Yup.boolean(),
  documentNumber: Yup.string()
    .min(8, "El tamaño mínimo es 8")
    .max(20, "El tamaño máximo es 20")
    .required("Ingrese su número de documento"),
  email: Yup.string()
    .email("Indique email válido")
    .required("Indique email"),
  firstName: Yup.string().required("Ingrese su nombre"),
  phone: Yup.string()
    .trim()
    .min(9, "El teléfono debe contener 9 digitos")
    .matches(/[9]/, "El teléfono debe comentar con el nro 9"),
  streetAddress1: Yup.string().required("Indique dirección"),
  streetAddress2: Yup.string(),
  termsAndConditions: Yup.boolean()
    .oneOf([true], "Acepte los términos y condiciones")
    .required("Acepte los términos y condiciones."),
});
