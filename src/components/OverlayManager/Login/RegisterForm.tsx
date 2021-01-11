import { maybe } from "@temp/core/utils";
import React from "react";
import { AlertManager, useAlert } from "react-alert";
import { RegisterAccount } from "./gqlTypes/RegisterAccount";
import { TypedAccountRegisterMutation } from "./queries";
import { RegisterFormContent } from "./RegisterFormContent";
import "./scss/index.scss";

const showSuccessNotification = (
  data: RegisterAccount,
  hide: () => void,
  alert: AlertManager
) => {
  const successful = maybe(() => !data.accountRegister.errors.length);

  if (successful) {
    hide();
    alert.show(
      {
        title: data.accountRegister.requiresConfirmation
          ? "Hemos enviado siguientes instrucciones. Revisa tu correo electrónico."
          : "New user has been created",
      },
      { type: "success", timeout: 5000 }
    );
  }
};

interface IRegisterForm {
  hide?: () => void;
  onSwitchSection?: () => void;
}

const RegisterForm: React.FC<IRegisterForm> = ({ hide, onSwitchSection }) => {
  const alert = useAlert();


  return (
    <TypedAccountRegisterMutation
      onCompleted={data => showSuccessNotification(data, hide, alert)}
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
