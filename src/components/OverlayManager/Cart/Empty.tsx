import * as React from "react";

import { Button } from "../..";

const Empty: React.FC<{ overlayHide(): void }> = ({ overlayHide }) => (
  <div className="cart__empty">
    <div className="cart__empty__img" />
    <h4 className="cart__empty__title">Carrito vacío</h4>
    <p className="cart__empty__text">
      Seguro encontraras algunos productos para agregar
    </p>
    <div className="cart__empty__action">
      <Button onClick={overlayHide}>Explorar catálogo</Button>
    </div>
  </div>
);

export default Empty;
