import * as React from "react";
import addImg from "../../../images/add.svg";
import ReactSVG from "react-svg";
import minusImg from "../../../images/minus.svg";
import classNames from "classnames";

type IProps = {
  onAdd: () => void;
  onRemove: () => void;
  value: string;
  className?: string;
};

const ItemQuantity: React.FC<IProps> = ({
  onAdd,
  onRemove,
  value,
  className = null,
}) => (
  <div className={classNames("cart__list__item__quantity", className)}>
    <ReactSVG
      path={minusImg}
      className="cart__list__item__quantity__icon"
      onClick={onRemove}
    />
    <p className="cart__list__item__quantity__text">{value}</p>
    <ReactSVG
      path={addImg}
      className="cart__list__item__quantity__icon"
      onClick={onAdd}
    />
  </div>
);

export default ItemQuantity;
