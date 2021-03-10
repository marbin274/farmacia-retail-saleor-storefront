import {  launchCheckoutGaEvent } from "@temp/@sdk/utils";
import React from "react";
import { LoginForm } from "../";

const SignInForm: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (

  <div onClick={()=> launchCheckoutGaEvent()}>
    <h3 className="checkout-login__header">¿Ya te registraste?</h3>
    <LoginForm onForgottenPassword={() => onClick()} hideRegister={true} />
  </div>
);

export default SignInForm;
