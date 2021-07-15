import { Button } from "@farmacia-retail/farmauna-components";
import React from "react";
import { PasswordResetForm } from "..";

interface IResetPasswordForm {
  onClick: () => void;
}

const ResetPasswordForm: React.FC<IResetPasswordForm> = ({ onClick }) => (
  <div className="checkout-login__user__form">
    <div className="fa-text-2xl fa-font-semibold fa-mb-4">
      ¿Ya te registraste?
    </div>
    <PasswordResetForm onClick={onClick}>
      <Button
        className='fa-mt-4'
        variant="link"
        type="button"
        onClick={onClick}
      >
        Volver al login
      </Button>
    </PasswordResetForm>
  </div>
);

export default ResetPasswordForm;
