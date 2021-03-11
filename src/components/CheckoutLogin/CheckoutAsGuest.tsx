import React from "react";
import { Link } from "react-router-dom";
// import { Button, OverlayTheme, OverlayType } from "..";
import { Button } from "..";
import { launchCheckoutGaEvent } from "@temp/@sdk/utils";
import { OverlayContextInterface, OverlayTheme, OverlayType } from "../Overlay";

const CheckoutAsGuest: React.FC<{
  overlay: OverlayContextInterface;
  checkoutUrl: string;
}> = ({ overlay, checkoutUrl }) => (
  <div className="checkout-login__guest">
    <h3 className="checkout-login__header">¿No tienes cuenta?</h3>
    <p>
      Estar registrado te permite vivir una experiencia personalizada y ágil.
    </p>
    <Button
      className="checkout-login__button_secondary"
      onClick={() => overlay.show(OverlayType.register, OverlayTheme.right)}
    >
      Registrarme
    </Button>

    <Link to={checkoutUrl}>
      <Button
        className="checkout-login__button_primary"
        onClick={() => launchCheckoutGaEvent()}
      >
        Continua como invitado
      </Button>
    </Link>
  </div>
);

export default CheckoutAsGuest;
