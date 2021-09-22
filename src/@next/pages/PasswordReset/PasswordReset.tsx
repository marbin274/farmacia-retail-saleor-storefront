import { ResetPasswordForm } from '@components/molecules';
import { Button } from '@farmacia-retail/farmauna-components';
import { setAuthToken } from '@sdk/auth';
import { useSetPassword, useUserDetails } from '@sdk/react';
import { BASE_URL } from '@temp/core/config';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { passwordResetSchema } from './PasswordReset.schema';
import * as S from './styles';
import { FormikProps } from './types';

const initialData: FormikProps = {
  password: '',
  retypedPassword: '',
};

export const PasswordReset: React.FC = () => {
  const router = useRouter();
  const { data: user } = useUserDetails();
  const [tokenError, setTokenError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>('');
  const [showPasswordMessageChanged, setShowPasswordMessageChanged] =
    useState<boolean>(false);

  const [setPassword, { data, error: graphqlErrors, loading }] =
    useSetPassword();

  const { email, token } = useMemo(
    () => ({
      email: router.query.email as string,
      token: router.query.token as string,
    }),
    [router.query]
  );

  useEffect(() => {
    if (router.isReady && (!email || !token)) {
      router.push(BASE_URL);
    }
  }, []);

  const onSubmit = (values: FormikProps) => {
    if (email && token && values.password) {
      setPassword({
        email,
        password: values.password,
        token,
      });
    }
  };

  const handleClickGoHome = () => {
    router.push(BASE_URL);
  };

  useEffect(() => {
    if (data?.setPassword?.token) {
      setAuthToken(data?.setPassword?.token);
      setShowPasswordMessageChanged(true);
    }

    graphqlErrors?.extraInfo?.userInputErrors?.filter((error) => {
      switch (error.field) {
        case 'password':
          return setPasswordError(error.message);
        case 'error':
          return setTokenError(true);
        default:
          setTokenError(false);
          setPasswordError('');
      }
    });
  }, [data, graphqlErrors]);

  return (
    <S.Wrapper>
      {showPasswordMessageChanged ? (
        <div className="password-changed-confirm fa-bg-white fa-w-88 fa-py-7 fa-px-8 fa-text-center fa-my-10 fa-mx-0 fa-rounded-3xl md:fa-w-96 md:fa-py-10 md:fa-px-12">
          <S.ResetPasswordChangedIcon src="/assets/auna/reset-password-changed.svg" />

          <div className="fa-text-2xl fa-font-semibold fa-text-black fa-text-center fa-py-8 ">
            Restaurar contraseña
          </div>
          <p className="fa-text-black fa-text-sm">
            <strong className="fa-font-semibold">
              {user?.firstName || 'Hola'},
            </strong>{' '}
            se cambió con éxito tu nueva contraseña
          </p>
          <div className="fa-pt-8 fa-mx-auto fa-my-0 fa-grid fa-w-56 md:fa-w-64">
            <Button onClick={handleClickGoHome}>Iniciar sesión</Button>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={initialData}
          validationSchema={passwordResetSchema}
          onSubmit={onSubmit}
        >
          {({ handleChange, handleBlur, values, errors, handleSubmit }) => {
            return (
              <ResetPasswordForm
                {...{
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  loading,
                  passwordError,
                  tokenError,
                  values,
                }}
              />
            );
          }}
        </Formik>
      )}
    </S.Wrapper>
  );
};
