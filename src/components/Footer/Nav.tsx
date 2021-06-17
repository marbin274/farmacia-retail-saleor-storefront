import { DOCUMENTS_URLS_S3 } from "@temp/core/config";
import { indexOf } from "lodash";
import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ReactSVG from "react-svg";
import { NavLink } from "..";
import arrowDowm from "../../images/arrow-down.svg";
import logoFarmaunaFooter from "../../images/logo-farmauna-footer.svg";
import { TypedSecondaryMenuQuery } from "./queries";
import "./scss/index.scss";
import SocialMedia from "../SocialMedia";
import classNames from "classnames";

type IProps = RouteComponentProps;

type IState = {
  width: number;
  higher: boolean;
};

class Nav extends React.PureComponent<IProps, IState> {
  state: IState = { width: 0, higher: false };

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
    this.state.width = window.screen.width;
    this.setHigher();
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setHigher();
    }
  }

  setHigher() {
    this.setState({
      higher: this.props.location.pathname.includes("/product/"),
    });
  }

  render() {
    const _arrows = Array.from(
      document.getElementsByClassName("footer-nav__arrow-icon")
    ).map(x => x.id);

    if (this.state.width > 540) {
      _arrows.map(x => {
        document.getElementById(x).style.transform = "rotate(360deg)";
      });
    }

    function onClickArrow(data) {
      const arrows = Array.from(
        document.getElementsByClassName("footer-nav__arrow-icon")
      ).map(x => x.id);
      let currentArrow = "";

      arrows.map(x => {
        if (x !== data.id) {
          document.getElementById(x).style.transform = "rotate(360deg)";
        } else {
          currentArrow = x;
          document.getElementById(x).style.transform = "rotate(180deg)";
          return;
        }
      });

      const children: any[] = data.children;

      const pElements: any[] = Array.from(document.getElementsByTagName("p"))
        .filter(x => x.id.length > 0)
        .map(x => x.id);

      children.map(x => {
        const index = pElements.filter(u => u === x.id)[0];
        pElements.splice(indexOf(pElements, index), 1);
      });

      pElements.map(x => {
        document.getElementById(x).style.display = "none";
      });

      children.map(x => {
        const element = document.getElementById(x.id);
        if (window.getComputedStyle(element).display === "none") {
          element.style.display = "block";
          document.getElementById(currentArrow).style.transform =
            "rotate(180deg)";
          return;
        }
        element.style.display = "none";
        document.getElementById(currentArrow).style.transform =
          "rotate(360deg)";
      });
    }

    return (
      <footer
        className={classNames("footer-nav", {
          "nav-higher": !!this.state.higher,
        })}
      >
        <div className="container">
          <div className="footer-nav__section">
            <div className="footer-nav__section-header">
              <div className="logo-footer-farmauna">
                <img src={logoFarmaunaFooter} alt="Logo Farmauna" />
              </div>
            </div>
            <div className="footer-nav__section-content">
              <p>¿Necesitas asesoría?</p>
              <p className="email_footer">
                <a href="mailto:consultas@farmauna.com" target="_blank">
                  consultas@farmauna.com
                </a>
              </p>
              <p className="phone_footer">
                <span className="phone">01 3913655</span>
              </p>
            </div>
          </div>
          <TypedSecondaryMenuQuery>
            {({ data }) => {
              return data.shop.navigation.secondary.items.map(item => (
                <div className="footer-nav__section" key={item.id}>
                  <h5 className="footer-nav__section-header">
                    <NavLink item={item} />
                    <ReactSVG
                      id={item.id}
                      onClick={() => onClickArrow(item)}
                      path={arrowDowm}
                      className={"footer-nav__arrow-icon"}
                    />
                  </h5>
                  <div className="footer-nav__section-content">
                    {item.children.map(subItem => (
                      <p
                        style={
                          this.state.width > 540
                            ? { display: "block" }
                            : { display: "none" }
                        }
                        id={subItem.id}
                        key={subItem.id}
                      >
                        <NavLink item={subItem} />
                      </p>
                    ))}
                  </div>
                </div>
              ));
            }}
          </TypedSecondaryMenuQuery>

          <SocialMedia />
        </div>
        <div className="container_terms_and_privacy">
          <div className="content_terms">
            <div className="copyright">
              <label htmlFor="">
                <a
                  href={DOCUMENTS_URLS_S3.politicasDePrivacidadUrl}
                  rel="noopener nofollow"
                >
                  Políticas de privacidad
                </a>
              </label>
              <label htmlFor="">
                <a
                  href={DOCUMENTS_URLS_S3.terminosYCondicionesUrl}
                  rel="noopener nofollow"
                >
                  Términos y condiciones
                </a>
              </label>
            </div>
            <div className="privacy">
              <a href="">© Copyright Farmauna 2021</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default withRouter(Nav);
