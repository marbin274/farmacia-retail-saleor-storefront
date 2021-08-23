import { useCheckout, useSignIn } from '@sdk/react';
import { removePaymentItems } from '@temp/@next/utils/checkoutValidations';
import { joinFormikErrorsToIFormErrorsAndConvertToObjectErrors } from '@temp/@next/utils/errorsManagement';
import { TokenAuthVariables } from '@temp/@sdk/mutations/gqlTypes/TokenAuth';
import { useFormik } from 'formik';
import * as React from 'react';
import ForgottenPassword from '../OverlayManager/Login/components/ForgottenPassword';
import { loginFormSchema } from './loginForm.schema';
import { Button, InputField } from '@farmacia-retail/farmauna-components';
import * as S from './styles';
interface ILoginForm {
  hide?: () => void;
  onSwitchSection?: () => void;
  onForgottenPassword?: () => void;
  hideRegister?: boolean;
}

const initialValues: TokenAuthVariables = {
  email: '',
  password: '',
};

const LoginForm: React.FC<ILoginForm> = ({
  hide,
  onSwitchSection,
  onForgottenPassword,
  hideRegister = false,
}) => {
  const [signIn, { loading, error: requestErrors }] = useSignIn();
  const { checkout, setShippingAddress } = useCheckout();
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors: formikErrors,
    values,
  } = useFormik<TokenAuthVariables>({
    initialValues,
    onSubmit: async (values) => {
      const authenticated = await signIn(values);
      if (authenticated && hide) {
        if (checkout?.id) {
          setShippingAddress(
            authenticated.data.user.defaultShippingAddress,
            authenticated.data.user.email,
            {
              dataTreatmentPolicy: authenticated.data.user.dataTreatmentPolicy,
              termsAndConditions: authenticated.data.user.termsAndConditions,
            },
            authenticated.data.user.documentNumber
          );
          removePaymentItems();
        }
        hide();
      }
    },
    validationSchema: loginFormSchema,
  });

  const errors = joinFormikErrorsToIFormErrorsAndConvertToObjectErrors(
    formikErrors,
    requestErrors?.extraInfo?.userInputErrors,
    touched,
    true
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <S.InputWrapper className="fa-mb-2.5 sm:fa-mb-4 fa-mx-0 fa-mt-0 fa-pb-2">
          <InputField
            label="Correo electrónico"
            error={!!errors?.email ? errors!.email[0].message : ''}
            placeholder="Correo electrónico"
            autoComplete="email"
            name="email"
            type="text"
            value={!values?.email ? '' : values?.email.toLowerCase()}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </S.InputWrapper>
        <S.InputWrapper className="fa-mb-2.5 sm:fa-mb-4 fa-mx-0 fa-mt-0 fa-pb-2">
          <InputField
            label="Contraseña"
            type="password"
            autoComplete="password"
            error={!!errors?.password ? errors!.password[0].message : ''}
            placeholder="Contraseña"
            name="password"
            value={!values?.password ? '' : values?.password}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </S.InputWrapper>
        <ForgottenPassword onClick={onForgottenPassword} />
        {requestErrors?.extraInfo?.userInputErrors?.[0]?.message && (
          <div>
            <span className="fa-text-error-medium">
              {requestErrors.extraInfo.userInputErrors[0].message}
            </span>
          </div>
        )}
        <div className="fa-mt-4 fa-text-center">
          <Button
            type="submit"
            size="large"
            className="fa-max-w-full"
            fullWidth
            {...(loading && { disabled: true })}
          >
            {loading ? 'Cargando' : 'Ingresar'}
          </Button>
        </div>
        {!hideRegister && (
          <div className="fa-text-center fa-flex fa-flex-col fa-justify-center fa-w-full fa-mx-auto fa-mb-auto fa-mt-6">
            <p className="fa-mb-4 fa-text-neutral-darkest fa-font-medium fa-text-sm">
              ¿No tienes cuenta?
            </p>
            <Button
              className="fa-font-semibold fa-text-sm"
              variant="outline"
              size="large"
              onClick={onSwitchSection}
            >
              Regístrate
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
