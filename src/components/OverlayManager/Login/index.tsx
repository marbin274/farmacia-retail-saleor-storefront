import "./scss/index.scss";
import * as React from "react";
import ReactSVG from "react-svg";
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
import closeImg from "../../../images/close-circle.svg";

class Login extends React.Component<
  { overlay: OverlayContextInterface; active?: "login" | "register" },
  { active: "login" | "register"; title: string }
> {
  static defaultProps = {
    active: "login",
    title: "Ingresar",
  };
  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
      title: props.title,
    };
  }

  changeActiveTab = (active: "login" | "register") => {
    const title = active === "login" ? "Ingresar" : "Registro";
    this.setState({ active, title });
  };

  render() {
    const { overlay } = this.props;
    const { show, hide } = overlay;

    return (
      <Overlay context={overlay}>
        <div className="login">
          <Online>
            <div className="overlay__header">
              <p className="overlay__header-text">{this.state.title}</p>
              <ReactSVG
                path={closeImg}
                onClick={hide}
                className="overlay__header__close-icon"
              />
            </div>
            <div className="login__content">
              {this.state.active === "login" ? (
                <LoginForm
                  hide={hide}
                  onSwitchSection={() => this.changeActiveTab("register")}
                  onForgottenPassword={() =>
                    show(OverlayType.password, OverlayTheme.right)
                  }
                />
              ) : (
                <RegisterForm
                  hide={hide}
                  onSwitchSection={() => this.changeActiveTab("login")}
                />
              )}
            </div>
          </Online>
          <Offline>
            <OfflinePlaceholder />
          </Offline>
        </div>
      </Overlay>
    );
  }
}

export default Login;
