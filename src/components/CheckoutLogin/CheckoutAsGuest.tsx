import React from "react";

import { Link } from "react-router-dom";
// import { Button, OverlayTheme, OverlayType } from "..";
import { Button } from "..";
import { OverlayContextInterface } from "../Overlay";

const CheckoutAsGuest: React.FC<{
  overlay: OverlayContextInterface;
  checkoutUrl: string;
}> = ({ overlay, checkoutUrl }) => (
  <div className="checkout-login__guest">
    <h3 className="checkout__header">¿No tienes cuenta?</h3>
    <p>
    Estar registrado te permite vivir una experiencia personalizada y ágil.
    </p>
    <Link to={checkoutUrl}>
      <Button>Continua como invitado</Button>
    </Link>

    {/* <p>
      or you can{" "}
      <span
        className="u-link"
        onClick={() => overlay.show(OverlayType.register, OverlayTheme.right)}
      >
        create an account
      </span>
    </p> */}
  </div>
);

export default CheckoutAsGuest;
