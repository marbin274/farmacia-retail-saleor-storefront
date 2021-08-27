import FormIcon from 'images/auna/reset-password-enter-new-password.svg';
import React from 'react';
import ReactSVG from 'react-svg';
import * as S from './styles';
import { IProps } from './types';
import { Button, InputField } from '@farmacia-retail/farmauna-components';

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
    <div className="rest-password-form fa-bg-neutral-light fa-w-full">
      <S.Wrapper>
        <S.NewPasswordForm className="new-password-form fa-px-8 fa-bg-white fa-rounded-3xl fa-mx-0 fa-my-16 fa-pt-24 md:fa-pt-0">
          <div className="fa-w-80 fa-mx-auto fa-my-0">
            <div className="fa-text-2xl fa-font-semibold fa-text-black fa-text-center fa-py-12 fa-px-0">
              Restaurar contraseña
            </div>
            <ReactSVG
              path={FormIcon}
              className="fa-pb-8 fa-text-center"
              svgClassName="fa-mx-auto fa-my-auto"
            />
            <div className="fa-text-black fa-text-sm fa-font-medium fa-mt-0 fa-mx-auto fa-mb-9 fa-max-w-xs fa-text-center">
              <p>Crea una nueva contraseña que contenga mínimo 8 caracteres</p>
            </div>
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
                    error={
                      !!errors?.password ? errors!.password : passwordError
                    }
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
                  error={
                    !!errors?.retypedPassword
                      ? errors!.retypedPassword
                      : passwordError
                  }
                />
              </S.InputFields>

              {tokenError && (
                <S.GeneralError>
                  Parece que el token para restablecer la contraseña ya no es
                  válido.
                </S.GeneralError>
              )}

              <div className="fa-my-16 fa-mx-auto fa-text-center">
                <Button type="submit" fullWidth={true} disabled={loading}>
                  {loading
                    ? 'Actualizando contraseña'
                    : 'Guardar nueva contraseña'}
                </Button>
              </div>
            </form>
          </div>
        </S.NewPasswordForm>
      </S.Wrapper>
    </div>
  );
};
