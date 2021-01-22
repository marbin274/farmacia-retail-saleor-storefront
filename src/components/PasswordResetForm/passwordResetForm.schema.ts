import { emailValidation } from "@temp/@next/utils/schemas";
import * as Yup from "yup";

export const passwordResetFormSchema = Yup.object().shape({
    email: emailValidation,
});
