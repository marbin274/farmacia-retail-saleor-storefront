import * as React from "react";
import { TypedPasswordResetMutation } from "./queries";
import ResetPasswordFormContent from "./ResetPasswordFormContent";
import "./scss/index.scss";
interface IPasswordResetForm {
  children?: React.ReactChild;
}

const PasswordResetForm: React.FC<IPasswordResetForm> = ({ children }) => (
  <div className="password-reset-form">
    <TypedPasswordResetMutation>
      {(passwordReset, { loading, data, called }) => {
        return (
          <>
            <ResetPasswordFormContent
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
