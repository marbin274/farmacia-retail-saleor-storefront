import { Button } from '@temp/@next/components/atoms';
import { LocalRepository } from '@temp/@sdk/repository';
import { baseUrl } from "@temp/app/routes";
import ResetPasswordMailSentIcon from 'images/auna/reset-password-mail-sent.svg';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import ReactSVG from 'react-svg';

const ResetPasswordMailSent = () => {
    const localRepository = new LocalRepository();
    const resetPasswordEmail = localRepository.getResetPasswordEmail();
    const history = useHistory();

    const handleOnClick = () => {
        history.push(baseUrl);
    }
    React.useEffect(() => {
        return () => {
            localRepository.setResetPasswordEmail(undefined);
        }
    }, []);
    if (!resetPasswordEmail) {
        history.push(baseUrl);
    }

    return <div className="container">
        <div className="reset-password-mail-sent">
            <ReactSVG path={ResetPasswordMailSentIcon} className="reset-password-mail-sent__image" />
            <h3>Revise su correo electrónico</h3>
            <p>Hemos enviado las instrucciones para que puedas restaurar la contraseña a <strong>{resetPasswordEmail}</strong></p>
            <div className="reset-password-mail-sent__button">
                <Button onClick={handleOnClick}>Entendido</Button>
            </div>
        </div>
    </div>;
}

export default ResetPasswordMailSent;
