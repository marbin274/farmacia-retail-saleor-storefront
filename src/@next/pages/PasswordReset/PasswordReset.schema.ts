import { passwordValidation } from "@temp/@next/utils/schemas";
import { RESET_PASSWORD_NOT_MATCH, RESET_PASSWORD_REQUIRED } from "@temp/@next/utils/schemas.messages";
import * as Yup from "yup";

export const passwordResetSchema = Yup.object().shape({
    password: passwordValidation,
    retypedPassword: Yup.string()
        .required(RESET_PASSWORD_REQUIRED)
        .oneOf([Yup.ref("password")], RESET_PASSWORD_NOT_MATCH),
});
