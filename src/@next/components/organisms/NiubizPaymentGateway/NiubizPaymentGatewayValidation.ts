import { IFormPayment } from "./types";

const NAME_REQUIRED = "Ingresa el nombre de la tarjeta";
const LASTNAME_REQUIRED = "Ingresa el apellido de la tarjeta";
const EMAIL_REQUIRED = "Ingresa tu correo electrónico";

export const validatePaymentGateway = (values: IFormPayment) => {
  const errors: Partial<IFormPayment> = {};
  if (!values.name) errors.name = NAME_REQUIRED;
  if (!values.lastname) errors.lastname = LASTNAME_REQUIRED;
  if (!values.email) errors.email = EMAIL_REQUIRED;

  return errors;
};
