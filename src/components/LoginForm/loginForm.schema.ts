import { emailValidation } from "@temp/@next/utils/schemas";
import * as Yup from "yup";

const PASSWORD_REQUIRED = "Ingresa tu contraseña";

export const loginFormSchema = Yup.object().shape({
    email: emailValidation,
    password: Yup.string().required(PASSWORD_REQUIRED),
});
