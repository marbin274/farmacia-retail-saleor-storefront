import * as React from 'react';
import { TypedPasswordResetMutation } from './queries';
import ResetPasswordFormContent from './ResetPasswordFormContent';
interface IPasswordResetForm {
  children?: React.ReactChild;
  buttonBack?: React.ReactChild;
  onClick?: () => void;
}

const PasswordResetForm: React.FC<IPasswordResetForm> = ({
  children,
  buttonBack,
  onClick,
}) => (
  <div>
    <TypedPasswordResetMutation>
      {(passwordReset, { loading, data, called }) => {
        return (
          <>
            <ResetPasswordFormContent
              onClose={onClick}
              called={called}
              loading={loading}
              errors={data?.requestPasswordReset?.errors}
              passwordReset={passwordReset}
              buttonBack={buttonBack}
            >
              {children}
            </ResetPasswordFormContent>
          </>
        );
      }}
    </TypedPasswordResetMutation>
  </div>
);

export default PasswordResetForm;
