import { Button } from '@farmacia-retail/farmauna-components';
import { useRegisterAccount } from '@temp/@sdk/react';
import { maybe } from '@temp/core/utils';
import { History } from 'history';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { RegisterFormContent } from './RegisterFormContent';

interface IRegisterForm {
  hide?: () => void;
  onSwitchSection?: () => void;
  registerSuccessful?: (flag: boolean, history: History<any>) => void;
  setEmail?: (email: string) => void;
}

const RegisterForm: React.FC<IRegisterForm> = ({ hide, onSwitchSection }) => {
  const history = useHistory();
  const location = useLocation();

  const hideOnClickLogin = location.pathname.includes('login');
  const [registerCustomer, { data, loading }] = useRegisterAccount();

  React.useEffect(() => {
    if (data && !loading) {
      const successful = maybe(() => !data.accountRegister.errors.length);

      if (successful) {
        history.push('/user-registered');
        hide();
      } else {
        sessionStorage.removeItem('user-registered-email');
      }
    }
  }, [data, loading]);

  const setEmail = (email: string) => {
    sessionStorage.setItem('user-registered-email', email);
  };

  const onClickSwitch = () => {
    if (hideOnClickLogin) {
      hide();
    } else {
      onSwitchSection();
    }
  };
  return (
    <>
      <RegisterFormContent
        errors={data?.accountRegister?.errors}
        loading={loading}
        registerCustomer={({ variables }) => registerCustomer(variables)}
        setEmail={setEmail}
      />
      <div className="fa-text-center fa-flex fa-flex-col fa-justify-center fa-w-full fa-mx-auto fa-mb-auto fa-mt-6">
        <p className="fa-mb-4 fa-text-neutral-darkest fa-font-medium fa-text-sm">
          ¿Ya tienes cuenta?
        </p>
        <Button
          className="fa-font-semibold fa-text-sm"
          variant="outline"
          size="large"
          onClick={onClickSwitch}
        >
          Ingresar con mi cuenta
        </Button>
      </div>
    </>
  );
};

export default RegisterForm;
