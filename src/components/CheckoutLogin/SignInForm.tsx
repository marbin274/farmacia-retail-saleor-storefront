import React from "react";
import { LoginForm } from "../";

const SignInForm: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <>
    <h3 className="checkout-login__header">¿Ya te registraste?</h3>
    <LoginForm onForgottenPassword={() => onClick()} />
  </>
);

export default SignInForm;
