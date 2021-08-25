import { BulletXFilledIcon } from '@farmacia-retail/farmauna-components';
import farmatheme from '@farmatheme';
import React, { FC, useState } from 'react';
import {
  Offline,
  OfflinePlaceholder,
  Online,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType,
} from '../..';
import { LoginForm } from '@components/organisms/LoginForm';
import RegisterForm from './components/RegisterForm';
import * as S from './styles';

const Login: FC<{
  overlay: OverlayContextInterface;
  active?: 'login' | 'register';
}> = (props) => {
  const [active, setActive] = useState<'login' | 'register'>(props.active);
  const { show, hide } = props.overlay;

  const changeActiveTab = (active: 'login' | 'register') => {
    setActive(active);
  };

  return (
    <S.OverlayWrapper context={props.overlay}>
      <div className="fa-max-w-screen">
        <Online>
          <S.ScrollWrapper>
            <S.OverlayHeaderWrapper className="fa-border-0 fa-p-0 fa-block">
              <p className="fa-text-aunaBlack fa-font-semibold fa-self-start fa-text-left fa-text-2xl">
                {active === 'login' ? 'Iniciar Sesión' : 'Regístrate'}
              </p>
              {active === 'login' ? (
                <p className="fa-text-sm fa-text-neutral-dark">
                  Completa los siguientes datos para ingresar
                </p>
              ) : (
                <p className="fa-text-sm fa-text-neutral-dark">
                  Completa los siguientes datos para tu registro
                </p>
              )}
              <BulletXFilledIcon
                size={32}
                color={farmatheme.theme.colors.interactive}
                onClick={hide}
                className="fa-absolute fa-top-3.5 fa-right-3.5 sm:fa-top-8 sm:fa-right-8"
              />
            </S.OverlayHeaderWrapper>
            <S.LoginContent className="fa-p-0 fa-overflow-auto sm:fa-pr-8">
              {active === 'login' ? (
                <LoginForm
                  hide={hide}
                  onSwitchSection={() => changeActiveTab('register')}
                  onForgottenPassword={() =>
                    show(OverlayType.password, OverlayTheme.center)
                  }
                />
              ) : (
                <RegisterForm
                  hide={hide}
                  onSwitchSection={() => changeActiveTab('login')}
                />
              )}
            </S.LoginContent>
          </S.ScrollWrapper>
        </Online>
        <Offline>
          <OfflinePlaceholder />
        </Offline>
      </div>
    </S.OverlayWrapper>
  );
};

Login.defaultProps = {
  active: 'login',
};

export default Login;
