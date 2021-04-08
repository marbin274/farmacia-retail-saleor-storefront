import React from "react";
import ReactSVG from "react-svg";
import { launchCheckoutEvent, steps } from "@temp/@sdk/gaConfig";
import { Link } from "react-router-dom";
import medicinesImg from "images/auna/medicines.svg";
import arrowImg from "images/breadcrumbs-arrow.svg";
import { Button } from "..";
import { OverlayContextInterface, OverlayTheme, OverlayType } from "../Overlay";

const CheckoutAsGuest: React.FC<{
  overlay: OverlayContextInterface;
  checkoutUrl: string;
}> = ({ overlay, checkoutUrl }) => (
  <div className="checkout-login__guest">
    <div className="checkout-login__guest__content">
      <div className="checkout-login__guest__content__top">
        <ReactSVG
          path={medicinesImg}
          className="checkout-login__guest__content__top__img"
        />
        <span className="checkout-login__guest__content__top__text">
          Quiero comprar como:
        </span>
        <Link to={checkoutUrl} className="checkout-login__link_guest">
          <Button
            className="checkout-login__button_guest"
            onClick={() => launchCheckoutEvent(steps.address)}
          >
            Invitado
          </Button>
        </Link>
      </div>
      <div className="checkout-login__guest__content__bottom">
        <span>¿Aún no te registras?</span>
        <div
          className="checkout-login__button_register"
          onClick={() => overlay.show(OverlayType.register, OverlayTheme.right)}
        >
          Regístrate
          <ReactSVG
            path={arrowImg}
            className="checkout-login__button_register__icon"
          />
        </div>
      </div>
    </div>
  </div>
);

export default CheckoutAsGuest;
