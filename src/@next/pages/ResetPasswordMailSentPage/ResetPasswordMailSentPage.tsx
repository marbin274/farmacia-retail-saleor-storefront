import { LocalRepository } from '@temp/@sdk/repository';
import { baseUrl } from "@temp/app/routes";
import ResetPasswordMailSentIcon from 'images/auna/reset-password-mail-sent.svg';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import ReactSVG from 'react-svg';
import { Button } from "@farmacia-retail/farmauna-components";
interface ResetPasswordMailSentProps {
    onClose?: () => void;
}

export const ResetPasswordMailSentPage: React.FC<ResetPasswordMailSentProps> = ({onClose}) => {
    const localRepository = new LocalRepository();
    const resetPasswordEmail = localRepository.getResetPasswordEmail();
    const history = useHistory();

    const handleOnClick = () => {
        if (document.querySelector<HTMLElement>('.overlay__header')) {
            document.querySelector<HTMLElement>('.overlay').style.display = 'none';
            document.querySelector<HTMLElement>('body').style.overflow = '';
        }
        if (onClose) {
            onClose();
        }
    }
    React.useEffect(() => {
        return () => {
            localRepository.setResetPasswordEmail(undefined);
        }
    }, []);

    React.useEffect(() => {
        if (document.querySelector<HTMLElement>('.overlay__header')) {
            document.querySelector<HTMLElement>('.overlay__header').style.display = 'none';
        }
    }, []);

    if (!resetPasswordEmail) {
        history.push(baseUrl);
    }

    return (
        <div className="reset-password-mail-sent">
            <ReactSVG path={ResetPasswordMailSentIcon} className="reset-password-mail-sent__image" />
            <h3>Revise su correo electrónico</h3>
            <p>Hemos enviado las instrucciones para que puedas restaurar la contraseña a <strong>{resetPasswordEmail}</strong></p>
            <div className="reset-password-mail-sent__button">
                <Button 
                    size="large"
                    fullWidth 
                    onClick={handleOnClick}
                >
                    Entendido
                </Button>
            </div>
        </div>
    )
}

export default ResetPasswordMailSentPage;
