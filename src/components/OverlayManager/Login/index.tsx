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
import closeImg from "../../../images/close-circle.svg";
import letterImg from "images/auna/letter.svg";
import RegisterForm from "./RegisterForm";
import "./scss/index.scss";
import { Button } from "@temp/@next/components/atoms";
import { History } from "history";

class Login extends React.Component<
  { overlay: OverlayContextInterface; active?: "login" | "register" },
  {
    active: "login" | "register";
    title: string;
    registerSuccessfully: boolean;
    history: any;
    email: string;
  }
> {
  static defaultProps = {
    active: "login",
    title: "Ingresar",
  };
  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
      email: "",
      history: null,
      registerSuccessfully: false,
      title: props.title,
    };
  }

  changeActiveTab = (active: "login" | "register") => {
    const title = active === "login" ? "Ingresar" : "Registro";
    this.setState({ active, title });
  };

  registerWasSuccessfully = (flag: boolean, history: History<any>) => {
    this.setState({ history });
    this.setState({ registerSuccessfully: flag });
  };

  setEmail = (email: string) => {
    this.setState({ email });
  };

  render() {
    const { overlay } = this.props;
    const { show, hide } = overlay;

    return (
      <Overlay context={overlay}>
        <div className="login">
          <Online>
            {!this.state.registerSuccessfully ? (
              <div>
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
                      registerSuccessful={this.registerWasSuccessfully}
                      setEmail={this.setEmail}
                      onSwitchSection={() => this.changeActiveTab("login")}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="register_successfully">
                <div className="register_header">
                  <ReactSVG path={letterImg} />
                </div>
                <div className="register_title">
                  <p>Revisa tu correo electrónico</p>
                </div>
                <div className="register_body">
                  <p>
                    Hemos enviado las instrucciones para que puedas confirmar a
                    <br />
                    <strong>{this.state.email}</strong>
                  </p>
                </div>
                <div className="register_button">
                  <Button
                    onClick={() => {
                      this.state.history.goBack();
                      hide();
                    }}
                  >
                    Entendido
                  </Button>
                </div>
              </div>
            )}
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
