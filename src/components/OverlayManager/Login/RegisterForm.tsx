import "./scss/index.scss";

import React, { useState } from "react";

import { accountConfirmUrl } from "../../../app/routes";

import { Button, Form, TextField } from "../..";
import { maybe } from "../../../core/utils";
import { RegisterAccount } from "./gqlTypes/RegisterAccount";
import { TypedAccountRegisterMutation } from "./queries";

import { AlertManager, useAlert } from "react-alert";
import { Checkbox } from "@temp/@next/components/atoms";

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

  const [termsAndConditions, setTermsAndConditions] = useState(false);

  const handleTermsAndConditions = () => {
    setTermsAndConditions(!termsAndConditions);
  };

  const [dataTreatmentPolicy, setDataTreatmentPolicy] = useState(false);

  const handleDataTreatmentPolicy = () => {
    setDataTreatmentPolicy(!dataTreatmentPolicy);
  };

  return (
    <TypedAccountRegisterMutation
      onCompleted={data => showSuccessNotification(data, hide, alert)}
    >
      {(registerCustomer, { loading, data }) => {
        return (
          <Form
            errors={maybe(() => data.accountRegister.errors, [])}
            onSubmit={(
              event,
              { email, password, documentNumber, firstName, lastName }
            ) => {
              event.preventDefault();
              if (!termsAndConditions) {
                return false;
              }
              const redirectUrl = `${window.location.origin}${accountConfirmUrl}`;
              registerCustomer({
                variables: {
                  dataTreatmentPolicy,
                  documentNumber,
                  email,
                  firstName,
                  lastName,
                  password,
                  redirectUrl,
                  termsAndConditions,
                },
              });
            }}
          >
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
            <TextField
              name="firstName"
              autoComplete="given-name"
              label="*Nombre"
              type="text"
              required
            />
            <TextField
              name="lastName"
              autoComplete="family-name"
              label="*Apellido"
              type="text"
              required
            />
            <TextField
              name="documentNumber"
              autoComplete="dni"
              label="*Documento"
              type="text"
              maxLength={20}
              required
            />
            <TextField
              name="email"
              autoComplete="email"
              label="*Correo"
              type="email"
              required
            />
            <TextField
              name="password"
              autoComplete="password"
              label="*Contraseña"
              type="password"
              required
            />
            <div className="login__privacy__policies">
              <Checkbox
                data-cy="checkoutPaymentPromoCodeCheckbox"
                name="termsAndConditions"
                checked={termsAndConditions}
                onChange={handleTermsAndConditions}
              >
                <label htmlFor="">
                  * Estoy de acuerdo con las
                  <a href="https://saleor-frontend-storage.s3.us-east-2.amazonaws.com/legal/farmacia-politicas-privacidad.pdf">
                    {" "}
                    Políticas de privacidad
                  </a>{" "}
                  y
                  <a href="https://saleor-frontend-storage.s3.us-east-2.amazonaws.com/legal/farmacia-terminos-condiciones.pdf">
                    {" "}
                    Terminos y condiciones
                  </a>
                </label>
              </Checkbox>
            </div>
            <div className="login__additionals">
              <Checkbox
                data-cy="checkoutPaymentPromoCodeCheckbox"
                name="dataTreatmentPolicy"
                checked={dataTreatmentPolicy}
                onChange={handleDataTreatmentPolicy}
              >
                <label htmlFor="">
                  Acepto el tratamiento para <a href="#"> Fines adicionales</a>{" "}
                  (opcional )
                </label>
              </Checkbox>
            </div>
            <div className="login__content__button">
              <Button type="submit" {...(loading && { disabled: true })}>
                {loading ? "Cargando" : "Crear cuenta"}
              </Button>
            </div>
            <div className="login-form__change-section">
              <p>¿Ya tienes cuenta?</p>
              <button onClick={onSwitchSection}>Ingresar</button>
            </div>
          </Form>
        );
      }}
    </TypedAccountRegisterMutation>
  );
};

export default RegisterForm;
