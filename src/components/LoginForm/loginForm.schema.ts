import * as SchemaMessage from "@temp/@next/utils/schemas.messages";
import * as SchemasConfig from "@temp/@next/utils/schemas.config";
import * as Yup from "yup";

const PASSWORD_REQUIRED = "Ingresa tu contraseña";
const EMAIL_REQUIRED = "Ingresa tu correo registrado en Farmauna";

export const emailValidation = Yup.string()
  .required(EMAIL_REQUIRED)
  .matches(SchemasConfig.EMAIL_REGEX_VALIDARION, SchemaMessage.EMAIL_VALIDATION)
  .email(SchemaMessage.EMAIL_VALIDATION);

export const loginFormSchema = Yup.object().shape({
  email: emailValidation,
  password: Yup.string().required(PASSWORD_REQUIRED),
});
