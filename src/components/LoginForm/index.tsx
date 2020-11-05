import "./scss/index.scss";

import * as React from "react";

import { useSignIn } from "@sdk/react";
import { maybe } from "@utils/misc";

import { Button, Form, TextField } from "..";

interface ILoginForm {
  hide?: () => void;
  onSwitchSection?: () => void;
  children?: React.ReactChild;
}

const LoginForm: React.FC<ILoginForm> = ({
  hide,
  onSwitchSection,
  children,
}) => {
  const [signIn, { loading, error }] = useSignIn();

  const handleOnSubmit = async (evt, { email, password }) => {
    evt.preventDefault();
    const authenticated = await signIn({ email, password });
    if (authenticated && hide) {
      hide();
    }
  };

  return (
    <div className="login-form">
      <Form
        errors={maybe(() => error.extraInfo.userInputErrors, [])}
        onSubmit={handleOnSubmit}
      >
        <TextField
          name="email"
          autoComplete="email"
          label="Correo"
          type="email"
          required
        />
        <TextField
          name="password"
          autoComplete="password"
          label="Contraseña"
          type="password"
          required
        />
        <div className="login-form__button">
          {children}
          <Button type="submit" {...(loading && { disabled: true })}>
            {loading ? "Cargando" : "Ingresar"}
          </Button>
        </div>
        <div className="login-form__change-section">
          <p>¿No tienes cuenta?</p>
          <button onClick={onSwitchSection}>Regístrate</button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
