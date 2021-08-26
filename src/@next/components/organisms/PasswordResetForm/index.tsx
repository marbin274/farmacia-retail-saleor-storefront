import { ResetPasswordVariables } from '@temp/@sdk/mutations/gqlTypes/ResetPassword';
import { usePasswordReset } from '@temp/@sdk/react';
import * as React from 'react';
import ResetPasswordFormContent from './ResetPasswordFormContent';
interface IPasswordResetForm {
  children?: React.ReactChild;
  buttonBack?: React.ReactChild;
  onClick?: () => void;
}

export const PasswordResetForm: React.FC<IPasswordResetForm> = ({
  children,
  buttonBack,
  onClick,
}) => {
  const [passwordReset, { called, data, loading }] = usePasswordReset();
  return (
    <div>
      <ResetPasswordFormContent
        onClose={onClick}
        called={called}
        loading={loading}
        errors={data?.requestPasswordReset?.errors}
        onPasswordReset={(variables: ResetPasswordVariables) =>
          passwordReset(variables)
        }
        buttonBack={buttonBack}
      >
        {children}
      </ResetPasswordFormContent>
    </div>
  );
};
