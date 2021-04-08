import * as SchemaValidation from "@temp/@next/utils/schemas";
import * as Yup from "yup";

export const registerFormSchema = Yup.object().shape({
         confirmPassword: SchemaValidation.passwordValidation.oneOf(
           [Yup.ref("newPassword"), null],
           "Debes repetir la misma contraseña"
         ),
         newPassword: SchemaValidation.passwordValidation,
         oldPassword: SchemaValidation.passwordValidation,
       });
