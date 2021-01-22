import { useSignIn } from "@sdk/react";
import { joinFormikErrorsToIFormErrorsAndConvertToObjectErrors } from "@temp/@next/utils/errorsManagement";
import { TokenAuthVariables } from "@temp/@sdk/mutations/gqlTypes/TokenAuth";
import { useFormik } from "formik";
import * as React from "react";
import { Button, TextField } from "..";
import ForgottenPassword from "../OverlayManager/Login/ForgottenPassword";
import { loginFormSchema } from "./loginForm.schema";
import "./scss/index.scss";

interface ILoginForm {
  hide?: () => void;
  onSwitchSection?: () => void;
  onForgottenPassword?: () => void;
  hideRegister?: boolean;
}

const initialValues: TokenAuthVariables = {
  email: '',
  password: '',
};

const LoginForm: React.FC<ILoginForm> = ({
  hide,
  onSwitchSection,
  onForgottenPassword,
  hideRegister = false,
}) => {
  const [signIn, { loading, error: requestErrors }] = useSignIn();

  const { handleSubmit, handleChange, handleBlur, touched, errors: formikErrors, values } = useFormik<TokenAuthVariables>({
    initialValues,
    onSubmit: async values => {
      const authenticated = await signIn(values);
      if (authenticated && hide) {
        hide();
      }
    },
    validationSchema: loginFormSchema,
  });

  const errors = joinFormikErrorsToIFormErrorsAndConvertToObjectErrors(formikErrors, requestErrors?.extraInfo?.userInputErrors, touched, true);

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <TextField
          autoComplete="email"
          errors={errors!.email}
          name="email"
          label="Correo"
          type="text"
          value={!values?.email ? "" : values?.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <TextField
          autoComplete="password"
          errors={errors!.password}
          name="password"
          label="Contraseña"
          type="password"
          value={!values?.password ? "" : values?.password}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <ForgottenPassword onClick={onForgottenPassword} />
        {requestErrors?.extraInfo?.userInputErrors?.[0]?.message &&
          <div className="login-form__errors"><span className="login-form__errors__error form-error">{requestErrors.extraInfo.userInputErrors[0].message}</span></div>
        }
        <div className="login-form__button">
          <Button type="submit" {...(loading && { disabled: true })}>
            {loading ? "Cargando" : "Ingresar"}
          </Button>
        </div>
        {!hideRegister && (
          <div className="login-form__change-section">
            <p>¿No tienes cuenta?</p>
            <button onClick={onSwitchSection}>Regístrate</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
