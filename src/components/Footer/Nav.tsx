import { DOCUMENTS_URLS_S3 } from "@temp/core/config";
import { indexOf } from "lodash";
import * as React from "react";
import ReactSVG from "react-svg";
import { NavLink } from "..";
import arrowDowm from "../../images/arrow_down.svg";
import { TypedSecondaryMenuQuery } from "./queries";
import "./scss/index.scss";


class Nav extends React.PureComponent {

  state = { width: 0 };

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
    this.state.width = window.screen.width;
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    const _arrows = Array.from(document.getElementsByClassName("footer-nav__arrow-icon")).map(x => x.id);

    if (this.state.width > 540) {
      _arrows.map(x => {
        document.getElementById(x).style.transform = "rotate(360deg)";
      });
    }

    function onClickArrow(data) {
      const arrows = Array.from(document.getElementsByClassName("footer-nav__arrow-icon")).map(x => x.id);
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

      const pElements: any[] = Array.from(document.getElementsByTagName("p")).filter(x => x.id.length > 0).map(x => x.id);

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
          document.getElementById(currentArrow).style.transform = "rotate(180deg)";
          return;
        }
        element.style.display = "none";
        document.getElementById(currentArrow).style.transform = "rotate(360deg)";
      });
    }


    return (
      <footer className="footer-nav">
        <div className="container">
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
                      <p style={this.state.width > 540 ? { display: "block" } : { display: "none" }}
                        id={subItem.id}
                        key={subItem.id}>
                        <NavLink item={subItem} />
                      </p>
                    ))}
                  </div>
                </div>
              ));
            }}
          </TypedSecondaryMenuQuery>
        </div>
        <div className="container_terms_and_privacy container">
          <div className="copyright">
            <label htmlFor="">Copyright Auna 2020 <br /> Todos los derechos reservados</label>
          </div>
          <div className="terms">
            <a href={DOCUMENTS_URLS_S3.terminosYCondicionesUrl}>Términos y condiciones</a>
          </div>
          <div className="privacy">
            <a href={DOCUMENTS_URLS_S3.politicasDePrivacidadUrl}>Políticas de privacidad</a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Nav;