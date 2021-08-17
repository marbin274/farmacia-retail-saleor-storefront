import * as SchemaValidation from '@temp/@next/utils/schemas';
import * as Yup from 'yup';

export const registerFormSchema = Yup.object().shape({
  confirmPassword: SchemaValidation.passwordValidation.oneOf(
    [Yup.ref('password'), null],
    'Debes repetir la misma contraseña'
  ),
  dataTreatmentPolicy: SchemaValidation.dataTreatmentPolicyValidation,
  documentNumber: SchemaValidation.documentNumberValidation,
  email: SchemaValidation.emailValidation,
  firstName: Yup.string().required('Ingresa tu nombre'),
  lastName: Yup.string().required('Ingresa tu apellido'),
  password: SchemaValidation.passwordValidation,
  redirectUrl: Yup.string().notRequired(),
  termsAndConditions: SchemaValidation.termsAndConditionsValidation,
});
