import React from "react";
import {
  ecommerceProductsMapper,
  getLocalStorageForCart,
  launchCheckoutEvent,
  steps,
} from "@temp/@sdk/gaConfig";
import { LoginForm } from "../";

const SignInForm: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <div
    className="checkout-login__user__form"
    onClick={() =>
      launchCheckoutEvent(
        steps.address,
        ecommerceProductsMapper(getLocalStorageForCart())
      )
    }
  >
    <div className="checkout-login__user__form__header">Inicia sesión</div>
    <LoginForm onForgottenPassword={() => onClick()} hideRegister={true} />
  </div>
);

export default SignInForm;
