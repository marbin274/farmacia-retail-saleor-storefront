import { Overlay } from '@components/organisms';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { ReactSVG } from 'react-svg';
import { Button } from '@farmacia-retail/farmauna-components';
import { alertService } from './AlertService';
import * as S from './styles';
import { alertTypes, IAlertServiceProps } from './types';

const dataInitial: IAlertServiceProps = {
  buttonText: '',
  icon: '',
  type: 'Info',
};

export const Alert: React.FC<any> = () => {
  const history = useHistory();
  const [alert, setAlert] = useState<IAlertServiceProps>(dataInitial);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const subscription = alertService
      .onAlert()
      .subscribe((data: IAlertServiceProps) => {
        if (data) {
          setShow(true);
          setAlert(data);
        } else {
          setAlert(dataInitial);
          setShow(false);
        }
        return subscription.unsubscribe;
      });
  }, []);

  const hide = () => {
    if (alert.acceptDialog) {
      alert.acceptDialog();
    }
    setShow(false);
    alertService.clearAlert();
  };

  const redirectTo = () => {
    setShow(false);
    alertService.clearAlert();
    if (alert.redirectionLink) {
      history.push(alert.redirectionLink);
    }
  };

  return (
    <Overlay
      key={alert.icon}
      position="center"
      show={show}
      hide={hide}
      duration={0}
      transparent={false}
    >
      <S.Modal>
        {alert.type !== 'Text' && (
          <S.Icon className="icon">
            <ReactSVG src={alert.icon || alertTypes[alert.type].icon} />
          </S.Icon>
        )}
        <S.Title>{alert.title || alertTypes[alert.type].title}</S.Title>
        <S.Message>{alert.message}</S.Message>
        <S.Footer>
          <Button
            size="large"
            onClick={alert.redirectionLink ? redirectTo : hide}
          >
            {alert.buttonText}
          </Button>
        </S.Footer>
      </S.Modal>
    </Overlay>
  );
};
