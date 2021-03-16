import React from "react";
import { launchCheckoutEvent, steps } from "@temp/@sdk/gaConfig";
import { LoginForm } from "../";

const SignInForm: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <div onClick={() => launchCheckoutEvent(steps.address)}>
    <h3 className="checkout-login__header">¿Ya te registraste?</h3>
    <LoginForm onForgottenPassword={() => onClick()} hideRegister={true} />
  </div>
);

export default SignInForm;
