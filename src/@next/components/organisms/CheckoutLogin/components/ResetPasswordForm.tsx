import { Button } from '@farmacia-retail/farmauna-components';
import React from 'react';
import { PasswordResetForm } from '@temp/components';

interface IResetPasswordForm {
  onClick: () => void;
}

const ResetPasswordForm: React.FC<IResetPasswordForm> = ({ onClick }) => (
  <div>
    <div className="fa-text-center fa-text-2xl fa-font-semibold fa-mb-4">
      ¿Ya te registraste?
    </div>
    <PasswordResetForm
      onClick={onClick}
      buttonBack={
        <Button
          className="fa-mt-4"
          variant="outline"
          fullWidth
          size="large"
          type="button"
          onClick={onClick}
        >
          Volver iniciar sesión
        </Button>
      }
    />
  </div>
);

export default ResetPasswordForm;
