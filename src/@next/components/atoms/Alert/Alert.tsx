import { Overlay } from '@components/organisms';
import { Button } from '@farmacia-retail/farmauna-components';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { alertService } from './AlertService';
import * as S from './styles';
import { alertTypes, IAlertServiceProps } from './types';

const dataInitial: IAlertServiceProps = {
  buttonText: '',
  icon: '',
  type: 'Info',
};

export const Alert: React.FC<any> = () => {
  const router = useRouter();
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
      router.push(alert.redirectionLink);
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
          <S.Icon className="icon" data-testid="alert-icon">
            <ReactSVG src={alert.icon || alertTypes[alert.type].icon} />
          </S.Icon>
        )}
        <S.Title data-testid="alert-title">
          {alert.title || alertTypes[alert.type].title}
        </S.Title>
        <S.Message data-testid="alert-message">{alert.message}</S.Message>
        <S.Footer>
          <Button
            data-testid="alert-button"
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
