import React from "react";
import { PasswordResetForm } from "..";

interface IResetPasswordForm {
  onClick: () => void;
}

const ResetPasswordForm: React.FC<IResetPasswordForm> = ({ onClick }) => (
  <div className="checkout-login__user__form">
    <div className="checkout-login__user__form__header">
      ¿Ya te registraste?
    </div>
    <PasswordResetForm>
      <button
        className="login__content__password-reminder__forget"
        onClick={onClick}
      >
        Volver al login
      </button>
    </PasswordResetForm>
  </div>
);

export default ResetPasswordForm;
