import { maybe } from "@temp/core/utils";
import { History } from "history";
import React from "react";
import { useHistory } from "react-router";
import { TypedAccountRegisterMutation } from "./queries";
import { RegisterFormContent } from "./RegisterFormContent";
import "./scss/index.scss";

interface IRegisterForm {
  hide?: () => void;
  onSwitchSection?: () => void;
  registerSuccessful?: (flag: boolean, history: History<any>) => void;
  setEmail?: (email: string) => void;
}

const RegisterForm: React.FC<IRegisterForm> = ({
  hide,
  onSwitchSection,
  registerSuccessful,
  setEmail,
}) => {
  const history = useHistory();

  return (
    <TypedAccountRegisterMutation
      onCompleted={data => {
        const successful = maybe(() => !data.accountRegister.errors.length);

        if (successful) {
          registerSuccessful(true, history);
        }
      }}
    >
      {(registerCustomer, { loading, data }) => {
        return (
          <>
            <div className="login__content__welcome">
              <h4>
                ¡Bienvenido a la <br />
                farmacia que te cuida!
              </h4>
              <p>
                Crear una cuenta es la mejor forma de administrar tus datos,
                hacer seguimiento a tus pedidos y recibir información
                personalizada
              </p>
            </div>
            <RegisterFormContent
              errors={data?.accountRegister?.errors}
              loading={loading}
              registerCustomer={registerCustomer}
              setEmail={setEmail}
            />
            <div className="login-form__change-section">
              <p>¿Ya tienes cuenta?</p>
              <button onClick={onSwitchSection}>Ingresar</button>
            </div>
          </>
        );
      }}
    </TypedAccountRegisterMutation>
  );
};

export default RegisterForm;
