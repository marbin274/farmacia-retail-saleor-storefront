import * as Yup from "yup";
import * as SchemasConfig from "./schemas.config";
import * as SchemaMessage from "./schemas.messages";

export const dataTreatmentPolicyValidation = Yup.boolean();

export const documentNumberValidation = Yup.string()
  .uppercase()
  .trim()
  .min(
    SchemasConfig.DOCUMENT_NUMBER_MIN_LENGTH,
    SchemaMessage.DOCUMENT_NUMBER_LENGTH_VALIDATION
  )
  .max(
    SchemasConfig.DOCUMENT_NUMBER_MAX_LENGTH,
    SchemaMessage.DOCUMENT_NUMBER_LENGTH_VALIDATION
  )
  .required(SchemaMessage.DOCUMENT_NUMBER_REQUIRED)
  .matches(
    SchemasConfig.DOCUMENT_REGEX_VALIDATION,
    SchemaMessage.DOCUMENT_NUMBER_CHARACTERS_VALIDATION_MESSAGE
  );

export const emailValidation = Yup.string()
  .required(SchemaMessage.EMAIL_REQUIRED)
  .matches(SchemasConfig.EMAIL_REGEX_VALIDARION, SchemaMessage.EMAIL_VALIDATION)
  .email(SchemaMessage.EMAIL_VALIDATION);

export const fullNameValidation = Yup.string().required(
  SchemaMessage.FULLNAME_REQUIRED
);

export const passwordValidation = Yup.string()
  .required(SchemaMessage.PASSWORD_REQUIRED)
  .min(SchemasConfig.PASSWORD_MIN_LEGTH, SchemaMessage.PASSWORD_VALIDATION);

export const phoneValidation = Yup.string()
  .trim()
  .min(SchemasConfig.PHONE_MIN_LENGTH, SchemaMessage.PHONE_VALIDATION)
  .matches(SchemasConfig.PHONE_REGEX_VALIDATION, SchemaMessage.PHONE_VALIDATION)
  .required(SchemaMessage.PHONE_REQUIRED);

export const termsAndConditionsValidation = Yup.boolean()
  .oneOf([true], SchemaMessage.TERMS_AND_CONTIDIONS_REQUIRED)
  .required(SchemaMessage.TERMS_AND_CONTIDIONS_REQUIRED);
