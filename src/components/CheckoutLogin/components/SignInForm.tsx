import React from "react";
import { LoginForm } from "../..";

const SignInForm: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <div>
    <div className="fa-text-2xl fa-font-semibold fa-mb-4 lg:fa-text-left fa-text-center">
      Soy Cliente
    </div>
    <div className="fa-text-sm fa-font-medium fa-mb-8 fa-text-neutral-dark 2 lg:fa-text-left fa-text-center">
      Completa los siguientes datos para ingresar
    </div>
    <LoginForm onForgottenPassword={() => onClick()} hideRegister={true} />
  </div>
);

export default SignInForm;
