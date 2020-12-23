import * as Yup from "yup";

export const addressFormSchema = Yup.object().shape({
  city: Yup.string().required("Selecciona el distrito de entrega"),
  dataTreatmentPolicy: Yup.boolean(),
  documentNumber: Yup.string()
    .uppercase()
    .trim()
    .min(8, "Debe contener de 8 a 20 caracteres, no incluir espacios")
    .max(20, "Debe contener de 8 a 20 caracteres, no incluir espacios")
    .required("Ingresa tu número de documento")
    .matches(/^[0-9A-Z]+$/, "Debe contener de 8 a 20 caracteres, no incluir espacios"),
  email: Yup.string()
    .required("Indique email")
    .matches(/^[0-9a-zA-Z@.]+$/, "Debe contener un correo válido, ingresa letras (A-Z), números (0-9), (@) y (.), no incluir espacios")
    .email("Debe contener un correo válido, ingresa letras (A-Z), números (0-9), (@) y (.), no incluir espacios"),
  firstName: Yup.string().required("Ingresa tu nombre y apellido"),
  phone: Yup.string()
    .trim()
    .min(9, "Debe contener 9 dígitos comenzando con 9, no incluir espacios, ni letras (A-Z)")
    .matches(/^[9][0-9]*$/, "Debe contener 9 dígitos comenzando con 9, no incluir espacios, ni letras (A-Z)"),
  streetAddress1: Yup.string().trim().required("Ingresa tu dirección exacta"),
  streetAddress2: Yup.string().trim(),
  termsAndConditions: Yup.boolean()
    .oneOf([true], "Debes aceptar para continuar")
    .required("Debes aceptar para continuar"),
});
