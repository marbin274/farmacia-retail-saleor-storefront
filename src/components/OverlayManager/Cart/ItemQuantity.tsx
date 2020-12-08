import React, { useEffect, useState, FC } from "react";
import addImg from "../../../images/add.svg";
import ReactSVG from "react-svg";
import minusImg from "../../../images/minus.svg";
import classNames from "classnames";
import { MAX_ORDER_PER_PRODUCT } from "@temp/core/config";

type IProps = {
  className?: string;
  onAdd: () => void;
  onRemove: () => void;
  value: number;
  maxValue?: number;
};

const ItemQuantity: FC<IProps> = ({
  className = null,
  maxValue = MAX_ORDER_PER_PRODUCT,
  onAdd,
  onRemove,
  value,
}) => {
  const [isValueGreaterThanOne, setIsValueGreaterThanOne] = useState(false);
  const [
    isValueLessThanMaxOrderPerProduct,
    setIsValueLessThanMaxOrderPerProduct,
  ] = useState(false);
  const [isValueLessThanMax, setIsValueLessThanMax] = useState(false);

  useEffect(() => {
    setIsValueGreaterThanOne(value > 1);
    setIsValueLessThanMaxOrderPerProduct(value < MAX_ORDER_PER_PRODUCT);
    setIsValueLessThanMax(value < maxValue);
  }, [value]);

  const handleAddClick = () => {
    if (isValueLessThanMaxOrderPerProduct && isValueLessThanMax) {
      onAdd();
    }
  };

  const handleRemoveClick = () => {
    if (isValueGreaterThanOne) {
      onRemove();
    }
  };

  return (
    <div className={classNames("cart__list__item__quantity", className)}>
      <ReactSVG
        path={minusImg}
        className={classNames("cart__list__item__quantity__icon", {
          disabled: !isValueGreaterThanOne,
        })}
        onClick={handleRemoveClick}
      />
      <p className="cart__list__item__quantity__text">{value}</p>
      <ReactSVG
        path={addImg}
        className="cart__list__item__quantity__icon"
        onClick={handleAddClick}
      />
    </div>
  );
};

export default ItemQuantity;
