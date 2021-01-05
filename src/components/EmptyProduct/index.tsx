import * as React from "react";

import "./scss/index.scss";
import ReactSVG from "react-svg";
import emptyProduct from "../../images/empty-products.svg"

interface EmptyProductProps {
  title?: string;
  message?: string;
}

const EmptyProduct: React.FC<EmptyProductProps> = ({ title, message }) => {
  return (
    <div className="empty-product">
      <div className="empty-product__icon">
        <ReactSVG path={emptyProduct} />
      </div>
      <h2 className="empty-product__title">{title}</h2>
      <p className="empty-product__message">{message}</p>
    </div>
  );
};

EmptyProduct.defaultProps = {
  message:
    "Intenta buscar productos en otra categoría, por el momento no lo tenemos en venta.",
  title: "No hay productos",
  
};

export default EmptyProduct;
