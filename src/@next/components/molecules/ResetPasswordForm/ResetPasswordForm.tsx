import FormIcon from 'images/auna/reset-password-enter-new-password.svg';
import React from "react";
import ReactSVG from "react-svg";
import './scss/index.scss';
import * as S from "./styles";
import { IProps } from "./types";
import { Button, InputField } from "@farmacia-retail/farmauna-components";


export const ResetPasswordForm: React.FC<IProps> = ({
  handleBlur,
  handleChange,
  handleSubmit,
  values,
  tokenError,
  passwordError,
  errors,
  loading,
}: IProps) => {
  return (
    <div className="rest-password-form">
      <div className="container">
        <S.Wrapper>
          <div className="new-password-form">
            <div className="content-new-password-form">
              <div className="title-new-password-form">Restaurar contraseña</div>
              <ReactSVG path={FormIcon} className="new-password-form__image" />
              <div className="new-password-form__text"><p>Crea una nueva contraseña que contenga mínimo 8 caracteres</p></div>
              <form onSubmit={handleSubmit}>
                <S.InputFields>
                  <div className="fa-mb-4">
                    <InputField
                      label="Nueva contraseña"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      placeholder="Ingresa la nueva contraseña"
                      value={values.password}
                      error={!!errors?.password ? errors!.password : passwordError}
                    />
                  </div>
                  <InputField
                    label="Confirma contraseña"
                    onBlur={handleBlur}
                    name="retypedPassword"
                    onChange={handleChange}
                    type="password"
                    placeholder="Ingresa nuevamente la contraseña"
                    value={values.retypedPassword}
                    error={!!errors?.retypedPassword ? errors!.retypedPassword : passwordError}
                  />
                </S.InputFields>

                {tokenError && (
                  <S.GeneralError>
                    Parece que el token para restablecer la contraseña ya no es válido.
                  </S.GeneralError>
                )}

                <div className="new-password-form__button">
                  <Button
                    type="submit"
                    fullWidth={true}
                    disabled={loading}
                  >{loading ? "Actualizando contraseña" : "Guardar nueva contraseña"}</Button>
                </div>
              </form>
            </div>
          </div>
        </S.Wrapper>
      </div>
    </div>
  );
};
