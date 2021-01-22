import { Button } from "@components/atoms";
import FormIcon from 'images/auna/reset-password-enter-new-password.svg';
import React from "react";
import ReactSVG from "react-svg";
import { TextField } from "../TextField";
import './scss/index.scss';
import * as S from "./styles";
import { IProps } from "./types";


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
    <div className="container">
      <S.Wrapper>
        <div className="new-password-form">
          <ReactSVG path={FormIcon} className="new-password-form__image" />
          <div className="new-password-form__text"><p>Crea una nueva contraseña que contenga mínimo 8 caracteres</p></div>
          <form onSubmit={handleSubmit}>
            <S.InputFields>
              <TextField
                label="Nueva contraseña"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                placeholder="Ingresa tu contraseña"
                value={values.password}
                errors={
                  errors.password || passwordError
                    ? [
                      {
                        field: "password",
                        message: errors.password || passwordError,
                      },
                    ]
                    : undefined
                }
              />
              <TextField
                label="Confirma contraseña"
                onBlur={handleBlur}
                name="retypedPassword"
                onChange={handleChange}
                type="password"
                placeholder="Ingresa tu contraseña"
                value={values.retypedPassword}
                errors={
                  errors.retypedPassword
                    ? [
                      {
                        field: "retypedPassword",
                        message: errors.retypedPassword,
                      },
                    ]
                    : undefined
                }
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
      </S.Wrapper>
    </div>
  );
};
