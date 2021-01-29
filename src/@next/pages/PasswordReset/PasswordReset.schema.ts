import { passwordValidation } from "@temp/@next/utils/schemas";
import { RESET_NEW_PASSWORD_REQUIRED, RESET_PASSWORD_NOT_MATCH, RESET_PASSWORD_REQUIRED } from "@temp/@next/utils/schemas.messages";
import * as Yup from "yup";

export const passwordResetSchema = Yup.object().shape({
    password: passwordValidation.required(RESET_NEW_PASSWORD_REQUIRED),
    retypedPassword: Yup.string()
        .required(RESET_PASSWORD_REQUIRED)
        .oneOf([Yup.ref("password")], RESET_PASSWORD_NOT_MATCH),
});
