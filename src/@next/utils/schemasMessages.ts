import * as SchemasConfig from "./schemasConfig";

export const DOCUMENT_NUMBER_REQUIRED = "Ingresa tu número de documento";
export const DOCUMENT_NUMBER_LENGTH_VALIDATION = `Debe contener como mínimo ${SchemasConfig.DOCUMENT_NUMBER_MIN_LENGTH} números, no incluir espacios, ni letras (A-Z) `;
export const DOCUMENT_NUMBER_CHARACTERS_VALIDATION_MESSAGE = `El campo solo debe contener números`;
export const EMAIL_REQUIRED = "Ingresa tu correo electrónico";
export const EMAIL_VALIDATION =
  "Debe contener un correo válido, ingresa letras (A-Z), números (0-9), (@) y (.), no incluir espacios";
export const FULLNAME_REQUIRED = "Ingresa tu nombre y apellido";
export const PASSWORD_REQUIRED = "Ingresa una contraseña";
export const PASSWORD_VALIDATION = `Debe contener ${SchemasConfig.PASSWORD_MIN_LEGTH} caracteres como mínimo`;
export const RESET_NEW_PASSWORD_REQUIRED = "Ingresa la nueva contraseña";
export const RESET_PASSWORD_REQUIRED = "Ingresa nuevamente la contraseña";
export const RESET_PASSWORD_NOT_MATCH = "La contraseña no coincide";
export const PHONE_VALIDATION = `Debe contener ${SchemasConfig.PHONE_MIN_LENGTH} dígitos comenzando con 9, no incluir espacios, ni letras (A-Z)`;
export const PHONE_REQUIRED = "Ingresa tu número de celular";
export const TERMS_AND_CONTIDIONS_REQUIRED = "Debes aceptar para poder comprar";
export const SHIPPING_METHOD_REQUIRED = "Debes seleccionar el método de envío";
export const SHIPPING_METHOD_DATE_INVALID = "Debe ingresar una fecha de envío";
export const SHIPPING_METHOD_SCHEDULE_INVALID = "Debe seleccionar una hora de envío";
