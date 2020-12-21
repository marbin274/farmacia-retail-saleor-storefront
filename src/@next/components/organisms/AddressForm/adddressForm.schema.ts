import * as Yup from "yup";

export const addressFormSchema = Yup.object().shape({
  city: Yup.string().required("Indique el distrito"),
  dataTreatmentPolicy: Yup.boolean(),
  documentNumber: Yup.string()
    .uppercase()
    .trim()
    .min(8, "El tamaño mínimo es 8")
    .max(20, "El tamaño máximo es 20")
    .required("Ingrese su número de documento")
    .matches(/^[0-9A-Z]+$/, "Ingrese letras (A-Z) y números (0-9)"),
  email: Yup.string()
    .required("Indique email")
    .matches(/^[0-9a-zA-Z@.]+$/, "Ingrese letras (a-z), números (0-9) y puntos (.)")
    .email("Indique email válido"),
  firstName: Yup.string().required("Ingrese su nombre"),
  phone: Yup.string()
    .trim()
    .min(9, "El teléfono debe contener 9 digitos")
    .matches(/[9][0-9]*$/, "El teléfono no es válido. ejem: 984578545"),
  streetAddress1: Yup.string().required("Indique dirección"),
  streetAddress2: Yup.string(),
  termsAndConditions: Yup.boolean()
    .oneOf([true], "Acepte los términos y condiciones")
    .required("Acepte los términos y condiciones."),
});
