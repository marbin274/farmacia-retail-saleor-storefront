import { maybe } from "@temp/core/utils";
import { History } from "history";
import React from "react";
import { useHistory, useLocation } from "react-router";
import { TypedAccountRegisterMutation } from "./queries";
import { RegisterFormContent } from "./RegisterFormContent";
import "./scss/index.scss";
import { Button } from "@farmacia-retail/farmauna-components";

interface IRegisterForm {
  hide?: () => void;
  onSwitchSection?: () => void;
  registerSuccessful?: (flag: boolean, history: History<any>) => void;
  setEmail?: (email: string) => void;
}

const RegisterForm: React.FC<IRegisterForm> = ({ hide, onSwitchSection }) => {
  const history = useHistory();
  const location = useLocation();

  const hideOnClickLogin = location.pathname.includes("login");

  const setEmail = (email: string) => {
    sessionStorage.setItem("user-registered-email", email);
  };

  const onClickSwitch = () => {
    if (hideOnClickLogin) {
      hide();
    } else {
      onSwitchSection();
    }
  };

  return (
    <TypedAccountRegisterMutation
      onCompleted={data => {
        const successful = maybe(() => !data.accountRegister.errors.length);

        if (successful) {
          history.push("/user-registered");
          hide();
        } else {
          sessionStorage.removeItem("user-registered-email");
        }
      }}
    >
      {(registerCustomer, { loading, data }) => {
        return (
          <>
            <RegisterFormContent
              errors={data?.accountRegister?.errors}
              loading={loading}
              registerCustomer={registerCustomer}
              setEmail={setEmail}
            />
            <div className="login-form__change-section">
              <p>¿Ya tienes cuenta?</p>
              <Button variant="outline" size="large" onClick={onClickSwitch}>
                Ingresar con mi cuenta
              </Button>
            </div>
          </>
        );
      }}
    </TypedAccountRegisterMutation>
  );
};

export default RegisterForm;
