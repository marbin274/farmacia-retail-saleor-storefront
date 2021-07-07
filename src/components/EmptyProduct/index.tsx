import * as React from "react";
import ReactSVG from "react-svg";
import emptyProduct from "../../images/empty-products.svg";
import { Message } from "./styles";

interface EmptyProductProps {
  title?: string;
  message?: string;
}

const EmptyProduct: React.FC<EmptyProductProps> = ({ title, message }) => {
  return (
    <div className="fa-flex fa-items-center fa-flex-col fa-h-80 fa-mt-auto lg:fa-justify-center">
      <div className="fa-mb-8">
        <ReactSVG path={emptyProduct} />
      </div>
      <h2 className="fa-text-2xl fa-font-normal fa-mb-5">{title}</h2>
      <Message className="fa-text-base fa-text-center fa-font-light">
        {message}
      </Message>
    </div>
  );
};

EmptyProduct.defaultProps = {
  message:
    "Intenta buscar productos en otra categoría, por el momento no lo tenemos en venta.",
  title: "No hay productos",
};

export default EmptyProduct;
