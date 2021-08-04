import { useCheckout, useSignIn } from "@sdk/react";
import { removePaymentItems } from "@temp/@next/utils/checkoutValidations";
import { joinFormikErrorsToIFormErrorsAndConvertToObjectErrors } from "@temp/@next/utils/errorsManagement";
import { TokenAuthVariables } from "@temp/@sdk/mutations/gqlTypes/TokenAuth";
import { useFormik } from "formik";
import * as React from "react";
import ForgottenPassword from "../OverlayManager/Login/ForgottenPassword";
import { loginFormSchema } from "./loginForm.schema";
import "./scss/index.scss";
import { Button, InputField } from "@farmacia-retail/farmauna-components";

interface ILoginForm {
  hide?: () => void;
  onSwitchSection?: () => void;
  onForgottenPassword?: () => void;
  hideRegister?: boolean;
}

const initialValues: TokenAuthVariables = {
  email: "",
  password: "",
};

const LoginForm: React.FC<ILoginForm> = ({
  hide,
  onSwitchSection,
  onForgottenPassword,
  hideRegister = false,
}) => {
  const [signIn, { loading, error: requestErrors }] = useSignIn();
  const { checkout, setShippingAddress } = useCheckout();
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors: formikErrors,
    values,
  } = useFormik<TokenAuthVariables>({
    initialValues,
    onSubmit: async values => {
      const authenticated = await signIn(values);
      if (authenticated && hide) {
        if (checkout?.id) {
          setShippingAddress(
            authenticated.data.user.defaultShippingAddress,
            authenticated.data.user.email,
            {
              dataTreatmentPolicy: authenticated.data.user.dataTreatmentPolicy,
              termsAndConditions: authenticated.data.user.termsAndConditions,
            },
            authenticated.data.user.documentNumber
          );
          removePaymentItems();
        }
        hide();
      }
    },
    validationSchema: loginFormSchema,
  });

  const errors = joinFormikErrorsToIFormErrorsAndConvertToObjectErrors(
    formikErrors,
    requestErrors?.extraInfo?.userInputErrors,
    touched,
    true
  );

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="InputField fa-pb-2">
          <InputField
            label="Correo electrónico"
            className="login-form__input-wrapper"
            error={!!errors?.email ? errors!.email[0].message : ""}
            placeholder="Correo electrónico"
            autoComplete="email"
            name="email"
            type="text"
            value={!values?.email ? "" : values?.email.toLowerCase()}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div className="InputField">
          <InputField
            label="Contraseña"
            type="password"
            autoComplete="password"
            error={!!errors?.password ? errors!.password[0].message : ""}
            placeholder="Contraseña"
            name="password"
            value={!values?.password ? "" : values?.password}
            onBlur={handleBlur}
            onChange={handleChange}
            className="login-form__input-wrapper"
          />
        </div>
        <ForgottenPassword onClick={onForgottenPassword} />
        {requestErrors?.extraInfo?.userInputErrors?.[0]?.message && (
          <div className="login-form__errors">
            <span className="login-form__errors__error form-error">
              {requestErrors.extraInfo.userInputErrors[0].message}
            </span>
          </div>
        )}
        <div className="login-form__button">
          <Button
            type="submit"
            size="large"
            {...(loading && { disabled: true })}
          >
            {loading ? "Cargando" : "Ingresar"}
          </Button>
        </div>
        {!hideRegister && (
          <div className="login-form__change-section">
            <p>¿No tienes cuenta?</p>
            <Button variant="outline" size="large" onClick={onSwitchSection}>
              Regístrate
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
