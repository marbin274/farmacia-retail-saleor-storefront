import { BulletXFilledIcon } from '@farmacia-retail/farmauna-components';
import farmatheme from '@farmatheme';
import * as React from 'react';
import {
  Offline,
  OfflinePlaceholder,
  Online,
  OverlayContextInterface,
  PasswordResetForm,
} from '../..';
import * as S from './styles';

const Password: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay,
}) => {
  return (
    <S.OverlayWrapper context={overlay}>
      <S.PasswordResetWrapper className="fa-w-full fa-max-w-screen">
        <Online>
          <div className="fa-border-0 fa-p-0 fa-items-center fa-block">
            <div className="fa-not-italic fa-font-semibold fa-leading-6 fa-tracking-normal fa-text-aunaBlack fa-w-full fa-text-center fa-text-2xl">
              <span className="fa-text-center">Olvidé mi contraseña</span>
            </div>
            <BulletXFilledIcon
              size={32}
              color={farmatheme.theme.colors.interactive}
              onClick={overlay.hide}
              className="fa-absolute fa-top-3.5 fa-right-3.5 sm:fa-top-8 sm:fa-right-8"
            />
          </div>
          <div className="fa-pt-1">
            <PasswordResetForm />
          </div>
        </Online>
        <Offline>
          <OfflinePlaceholder />
        </Offline>
      </S.PasswordResetWrapper>
    </S.OverlayWrapper>
  );
};
export default Password;
