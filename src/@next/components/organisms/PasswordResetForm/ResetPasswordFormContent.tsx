import { ResetPasswordMailSentPage } from '@app/pages';
import { IFormError } from '@app/types';
import { joinFormikErrorsToIFormErrorsAndConvertToObjectErrors } from '@app/utils/errorsManagement';
import { Button, InputField } from '@farmacia-retail/farmauna-components';
import { WINDOW_EXISTS } from '@temp/@sdk/consts';
import { ResetPasswordVariables } from '@temp/@sdk/mutations/gqlTypes/ResetPassword';
import { LocalRepository } from '@temp/@sdk/repository';
import { passwordResetUrl } from '@temp/app/routes';
import { useFormik } from 'formik';
import React from 'react';
import { passwordResetFormSchema } from './passwordResetForm.schema';
import * as S from './styles';
interface ResetPasswordFormContentProps {
  called: boolean;
  loading: boolean;
  errors?: IFormError[];
  buttonBack?: React.ReactChild;
  onClose: () => void;
  onPasswordReset: (variables: ResetPasswordVariables) => void;
}

const initialValues: ResetPasswordVariables = {
  email: '',
  redirectUrl: WINDOW_EXISTS
    ? `${window?.location.origin}${passwordResetUrl}`
    : passwordResetUrl,
};
const ResetPasswordFormContent: React.FC<ResetPasswordFormContentProps> = ({
  buttonBack,
  onClose,
  called,
  loading,
  errors: requestErrors,
  children,
  onPasswordReset,
}) => {
  const [showMessageSuccess, setShowMessageSuccess] =
    React.useState<boolean>(false);
  const [showMessageErrors, setShowMessageErrors] =
    React.useState<boolean>(false);

  const localRepository = new LocalRepository();

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors: formikErrors,
    values,
  } = useFormik<ResetPasswordVariables>({
    initialValues,
    onSubmit: (values) => {
      onPasswordReset(values);
    },
    validationSchema: passwordResetFormSchema,
  });

  const changeShowMessages = (show: boolean) => {
    setShowMessageErrors(show);
    setShowMessageSuccess(show);
  };

  React.useEffect(() => {
    if (called && !loading) {
      const hasErrors = requestErrors && requestErrors.length > 0;
      setShowMessageErrors(called && hasErrors);
      setShowMessageSuccess(called && !hasErrors && loading === false);
    } else {
      changeShowMessages(false);
    }
  }, [loading]);
  React.useEffect(() => {
    if (showMessageSuccess) {
      localRepository.setResetPasswordEmail(values.email);
      setOpen(!open);
    }
  }, [showMessageSuccess]);

  const errors = joinFormikErrorsToIFormErrorsAndConvertToObjectErrors(
    formikErrors,
    requestErrors,
    touched,
    showMessageErrors
  );

  const [open, setOpen] = React.useState<boolean>(true);

  return (
    <>
      {open ? (
        <>
          <p className="fa-my-6 fa-text-sm fa-not-italic fa-font-medium fa-leading-4 fa-tracking-wide fa-text-center">
            Ingresa tu dirección de correo electrónico y te enviaremos las
            instrucciones para restablecer tu contraseña
          </p>
          <form onSubmit={handleSubmit}>
            <InputField
              autoComplete="email"
              placeholder="Ejemplo: juanperez@mail.com"
              error={!!errors?.email ? errors!.email[0].message : ''}
              label="Correo electrónico"
              name="email"
              type="text"
              value={!values?.email ? '' : values?.email}
              onBlur={(e) => {
                changeShowMessages(false);
                handleBlur(e);
              }}
              onChange={(e) => {
                changeShowMessages(false);
                handleChange(e);
              }}
            />
            {children}
            <S.ButtonWrapper className="fa-mx-0 fa-mt-4 fa-mb-24 fa-text-center sm:fa-my-8">
              <Button
                {...(loading && { disabled: true })}
                fullWidth
                size="large"
                type="submit"
                variant="default"
              >
                {loading ? 'Cargando' : 'Enviar instrucciones'}
              </Button>
              {buttonBack}
            </S.ButtonWrapper>
          </form>
        </>
      ) : (
        <div>
          <ResetPasswordMailSentPage onClose={onClose} />
        </div>
      )}
    </>
  );
};

export default ResetPasswordFormContent;
