import * as React from "react";
import { TypedPasswordResetMutation } from "./queries";
import ResetPasswordFormContent from "./ResetPasswordFormContent";
import "./scss/index.scss";
interface IPasswordResetForm {
  children?: React.ReactChild;
  onClick?: () => void;
}

const PasswordResetForm: React.FC<IPasswordResetForm> = ({ children, onClick }) => (
  <div className="password-reset-form">
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
            >
              {children}
            </ResetPasswordFormContent>
          </>
        )
      }}
    </TypedPasswordResetMutation>
  </div>
);

export default PasswordResetForm;
