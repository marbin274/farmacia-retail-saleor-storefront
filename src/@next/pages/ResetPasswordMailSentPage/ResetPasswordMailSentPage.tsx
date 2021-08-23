import { LocalRepository } from '@temp/@sdk/repository';
import { baseUrl } from '@temp/app/routes';
import ResetPasswordMailSentIcon from 'images/auna/reset-password-mail-sent.svg';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import ReactSVG from 'react-svg';
import { Button } from '@farmacia-retail/farmauna-components';
interface ResetPasswordMailSentProps {
  onClose?: () => void;
}

export const ResetPasswordMailSentPage: React.FC<ResetPasswordMailSentProps> =
  ({ onClose }) => {
    const localRepository = new LocalRepository();
    const resetPasswordEmail = localRepository.getResetPasswordEmail();
    const history = useHistory();

    const handleOnClick = () => {
      if (onClose) {
        onClose();
      }
    };
    React.useEffect(() => {
      return () => {
        localRepository.setResetPasswordEmail(undefined);
      };
    }, []);

    if (!resetPasswordEmail) {
      history.push(baseUrl);
    }

    return (
      <div className="fa-text-center">
        <ReactSVG
          path={ResetPasswordMailSentIcon}
          className="fa-flex fa-justify-center fa-mb-6"
        />
        <h3 className="fa-font-semibold fa-text-2xl fa-mb-6">
          Revise su correo electrónico
        </h3>
        <p className="fa-text-sm fa-font-medium fa-text-neutral-dark fa-px-8">
          Hemos enviado las instrucciones para que puedas restaurar la
          contraseña a{' '}
          <strong className="fa-text-highlight-medium">
            {resetPasswordEmail}
          </strong>
        </p>
        <div className="fa-mt-6">
          <Button size="large" fullWidth onClick={handleOnClick}>
            Entendido
          </Button>
        </div>
      </div>
    );
  };

export default ResetPasswordMailSentPage;
