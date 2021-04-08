import { useCheckout, useSignIn } from "@sdk/react";
import { removePaymentItems } from "@temp/@next/utils/checkoutValidations";
import { joinFormikErrorsToIFormErrorsAndConvertToObjectErrors } from "@temp/@next/utils/errorsManagement";
import { TokenAuthVariables } from "@temp/@sdk/mutations/gqlTypes/TokenAuth";
import { useFormik } from "formik";
import * as React from "react";
import { Button } from "..";
import ForgottenPassword from "../OverlayManager/Login/ForgottenPassword";
import { loginFormSchema } from "./loginForm.schema";
import "./scss/index.scss";
import { TextField } from "@components/molecules";
import {
  ecommerceProductsMapper,
  getLocalStorageForCart,
  launchCheckoutEvent,
  steps,
} from "@temp/@sdk/gaConfig";

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
        <TextField
          autoComplete="email"
          errors={errors!.email}
          name="email"
          placeholder="Correo registrado en Farmauna"
          type="text"
          value={!values?.email ? "" : values?.email.toLowerCase()}
          onBlur={handleBlur}
          onChange={handleChange}
          inputWrapperClassname="login-form__input-wrapper"
        />
        <TextField
          autoComplete="password"
          errors={errors!.password}
          name="password"
          placeholder="Contraseña"
          type="password"
          value={!values?.password ? "" : values?.password}
          onBlur={handleBlur}
          onChange={handleChange}
          inputWrapperClassname="login-form__input-wrapper"
        />
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
            {...(loading && { disabled: true })}
            onClick={() =>
              launchCheckoutEvent(
                steps.address,
                ecommerceProductsMapper(getLocalStorageForCart())
              )
            }
          >
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
