import * as React from "react";
import {
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface,
  PasswordResetForm
} from "../..";
import "./scss/index.scss";
import { BulletXFilledIcon } from "@farmacia-retail/farmauna-components";
import farmatheme from "@farmatheme";

const Password: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {

  return (
    <Overlay context={overlay}>
      <div className="password-reset">
        <Online>
          <div className="overlay__header">
            <div className="overlay__header-text" ><span className="forgot-password">Olvidé mi contraseña</span></div>
            <BulletXFilledIcon
              size={32}
              color={farmatheme.theme.colors.interactive}
              onClick={overlay.hide}
              className="overlay__header__close-icon"
            />
          </div>
          <div className="password-reset__content">
            <PasswordResetForm />
          </div>
        </Online>
        <Offline>
          <OfflinePlaceholder />
        </Offline>
      </div>
    </Overlay>
  )
}
export default Password;
