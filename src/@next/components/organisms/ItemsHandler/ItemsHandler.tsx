import React, { useEffect, useState, FC } from "react";
import classNames from "classnames";
import { MAX_ORDER_PER_PRODUCT } from "@temp/core/config";
import { Button } from "../../atoms";
import "./scss/index.scss";

type IProps = {
  disableOnAdd?: boolean;
  disableOnRemove?: boolean;
  onAdd: () => void;
  onRemove: () => void;
  value: number;
  maxValue?: number;
  availables?: number;
};

const ItemsHandler: FC<IProps> = ({
  disableOnAdd = false,
  maxValue = MAX_ORDER_PER_PRODUCT,
  onAdd,
  onRemove,
  value,
  availables,
}) => {
  const [
    isValueLessThanMaxOrderPerProduct,
    setIsValueLessThanMaxOrderPerProduct,
  ] = useState(false);
  const [isValueLessThanMax, setIsValueLessThanMax] = useState(false);

  useEffect(() => {
    setIsValueLessThanMaxOrderPerProduct(value < MAX_ORDER_PER_PRODUCT);
    setIsValueLessThanMax(value < maxValue);
  }, [value, maxValue, MAX_ORDER_PER_PRODUCT]);

  const isEnabledToAddProduct =
    !disableOnAdd && isValueLessThanMaxOrderPerProduct && isValueLessThanMax;

  const handleAddClick = () => {
    if (isEnabledToAddProduct) {
      onAdd();
    }
  };

  const handleRemoveClick = () => {
    onRemove();
  };

  return (
    <div className="itemHandler">
      <Button
        className={classNames("add_remove_button")}
        onClick={handleRemoveClick}
      >
        -
      </Button>
      <p>{value}</p>
      <Button
        disabled={value >= MAX_ORDER_PER_PRODUCT || value === availables}
        className={classNames("add_remove_button")}
        onClick={handleAddClick}
      >
        +
      </Button>
    </div>
  );
};

export default ItemsHandler;
