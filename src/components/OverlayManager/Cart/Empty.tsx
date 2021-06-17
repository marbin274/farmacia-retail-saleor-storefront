import * as React from "react";
import ReactSVG from "react-svg";
import { Button } from "@farmacia-retail/farmauna-components";
import emptyCartImg from "../../../images/empty-cart.svg";

const Empty: React.FC<{ overlayHide(): void }> = ({ overlayHide }) => (
  <div className="cart__empty">
    <ReactSVG path={emptyCartImg} className="cart__empty__img" />
    <h4 className="cart__empty__title">Carrito vacío</h4>
    <p className="cart__empty__text">
      Seguro encontrarás algunos productos para agregar
    </p>
    <div className="cart__empty__action">
      <Button onClick={overlayHide}>Explorar productos</Button>
    </div>
  </div>
);

export default Empty;
