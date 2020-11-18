import React from "react";
import { LoginForm } from "../";
import ForgottenPassword from "../OverlayManager/Login/ForgottenPassword";

const SignInForm: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <>
    <h3 className="checkout-login__header">¿Ya te registraste?</h3>
    <LoginForm hideRegister>
      <ForgottenPassword onClick={onClick} />
    </LoginForm>
  </>
);

export default SignInForm;
