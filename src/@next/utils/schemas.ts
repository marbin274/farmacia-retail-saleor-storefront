import * as Yup from "yup";

export const dataTreatmentPolicyValidation = Yup.boolean();

export const documentNumberValidation = Yup.string().defined("Ingresa tu número de documento")
    .uppercase()
    .trim()    
    .min(8, "Debe contener de ${min} a 20 caracteres, no incluir espacios")// tslint:disable-line    
    .max(20, "Debe contener de ${min} a 20 caracteres, no incluir espacios")// tslint:disable-line
    .required("Ingresa tu número de documento")    
    .matches(/^[0-9A-Z]+$/, "Debe contener de ${min} a ${max} caracteres, no incluir espacios");// tslint:disable-line

export const emailValidation = Yup.string().defined("Indique email")
    .required("Indique email")
    .matches(/^[0-9a-zA-Z@._-]+$/, "Debe contener un correo válido, ingresa letras (A-Z), números (0-9), (@) y (.), no incluir espacios")
    .email("Debe contener un correo válido, ingresa letras (A-Z), números (0-9), (@) y (.), no incluir espacios");

export const fullNameValidation = Yup.string().required("Ingresa tu nombre y apellido");

export const phoneValidation = Yup.string()
    .trim()
    .min(9, "Debe contener ${min} dígitos comenzando con ${min}, no incluir espacios, ni letras (A-Z)")// tslint:disable-line    
    .matches(/^[9][0-9]*$/, "Debe contener ${min} dígitos comenzando con ${min}, no incluir espacios, ni letras (A-Z)");// tslint:disable-line

export const termsAndConditionsValidation = Yup.boolean()
    .oneOf([true], "Debes aceptar para continuar")
    .required("Debes aceptar para continuar");
    