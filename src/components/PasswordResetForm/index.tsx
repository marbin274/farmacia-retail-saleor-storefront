import "./scss/index.scss";

import * as React from "react";

import { Button, Form, TextField } from "..";
import { maybe } from "../../core/utils";
import { TypedPasswordResetMutation } from "./queries";
import { passwordResetUrl } from "../../app/routes";

interface IPasswordResetForm {
  children?: React.ReactChild;
}

const PasswordResetForm: React.FC<IPasswordResetForm> = ({ children }) => (
  <div className="password-reset-form">
    <p>
      Proporcione su dirección de correo electrónico para que podamos
      compartirle un enlace para restablecer su contraseña
    </p>
    <TypedPasswordResetMutation>
      {(passwordReset, { loading, data }) => {
        return (
          <Form
            errors={maybe(() => data.requestPasswordReset.errors, [])}
            onSubmit={(event, { email }) => {
              event.preventDefault();
              passwordReset({
                variables: {
                  email,
                  redirectUrl: `${window.location.origin}${passwordResetUrl}`,
                },
              });
            }}
          >
            <TextField
              name="email"
              autoComplete="email"
              label="Correo"
              type="email"
              required
            />
            {children}
            <div className="password-reset-form__button">
              <Button type="submit" {...(loading && { disabled: true })}>
                {loading ? "Cargando" : "Restablecer contraseña"}
              </Button>
            </div>
          </Form>
        );
      }}
    </TypedPasswordResetMutation>
  </div>
);

export default PasswordResetForm;
