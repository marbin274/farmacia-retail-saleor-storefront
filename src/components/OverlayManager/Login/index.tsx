import { BulletXFilledIcon } from "@farmacia-retail/farmauna-components";
import React, { FC, useState } from "react";
import {
  LoginForm,
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType,
} from "../..";
import RegisterForm from "./RegisterForm";
import "./scss/index.scss";

const Login: FC<{
  overlay: OverlayContextInterface;
  active?: "login" | "register";
}> = props => {
  const [active, setActive] = useState<"login" | "register">(props.active);
  const { show, hide } = props.overlay;

  const changeActiveTab = (active: "login" | "register") => {
    setActive(active);
  };

  return (
    <Overlay context={props.overlay}>
      <div className="login">
        <Online>
          <div className="scroll">
            <div className="overlay__header">
              <p className="overlay__header-text">
                {active === "login" ? "Ingresar" : "Regístrate"}
              </p>
              {active === "login" ? (
                <p className="overlay__header-text-sub">
                  Completa los siguientes datos para ingresar
                </p>
              ) : (
                <p className="overlay__header-text-sub">
                  Completa los siguientes datos para tu registro
                </p>
              )}
              <BulletXFilledIcon
                size={32}
                color="#452FBA"
                onClick={hide}
                className="overlay__header__close-icon"
              />
            </div>
            <div className="login__content">
              {active === "login" ? (
                <LoginForm
                  hide={hide}
                  onSwitchSection={() => changeActiveTab("register")}
                  onForgottenPassword={() =>
                    show(OverlayType.password, OverlayTheme.center)
                  }
                />
              ) : (
                <RegisterForm
                  hide={hide}
                  onSwitchSection={() => changeActiveTab("login")}
                />
              )}
            </div>
          </div>
        </Online>
        <Offline>
          <OfflinePlaceholder />
        </Offline>
      </div>
    </Overlay>
  );
};

Login.defaultProps = {
  active: "login",
};

export default Login;
