import resetPasswordImg from "images/auna/reset-password.svg";
import closeImg from "images/x.svg";
import * as React from "react";
import ReactSVG from "react-svg";
import {
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface,
  PasswordResetForm
} from "../..";
import "./scss/index.scss";

const Password: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay,
}) => (
  <Overlay context={overlay}>
    <div className="password-reset">
      <Online>
        <div className="overlay__header">
          <div className="overlay__header-text" ><p>Olvidé mi contraseña</p></div>
          <ReactSVG
            path={closeImg}
            onClick={overlay.hide}
            className="overlay__header__close-icon"
          />
        </div>
        <div className="password-reset__content">
          <ReactSVG
            path={resetPasswordImg}
            className="password-reset__content__image"
          />
          <PasswordResetForm />
        </div>
      </Online>
      <Offline>
        <OfflinePlaceholder />
      </Offline>
    </div>
  </Overlay>
);

export default Password;
