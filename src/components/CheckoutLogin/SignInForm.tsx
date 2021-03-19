import React from "react";
import { launchCheckoutEvent, steps } from "@temp/@sdk/gaConfig";
import { LoginForm } from "../";

const SignInForm: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <div
    className="checkout-login__user__form"
    onClick={() => launchCheckoutEvent(steps.address)}
  >
    <div className="checkout-login__user__form__header">Inicia sesión</div>
    <LoginForm onForgottenPassword={() => onClick()} hideRegister={true} />
  </div>
);

export default SignInForm;
