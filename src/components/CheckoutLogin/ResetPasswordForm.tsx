import React from "react";
import { PasswordResetForm } from "..";

interface IResetPasswordForm {
  onClick: () => void;
}

const ResetPasswordForm: React.FC<IResetPasswordForm> = ({ onClick }) => (
  <>
    <h3 className="checkout-login__header">¿Ya te registraste?</h3>
    <PasswordResetForm>
      <button
        className="login__content__password-reminder__forget"
        onClick={onClick}
      >
        Volver al login
      </button>
    </PasswordResetForm>
  </>
);

export default ResetPasswordForm;
