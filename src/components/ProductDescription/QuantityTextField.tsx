import React from "react";
import ItemQuantity from "../OverlayManager/Cart/ItemQuantity";

interface QuantityTextFieldProps {
  disableButtons?: boolean;
  maxQuantity: number;
  onQuantityChange: (value: number) => void;
  quantity: number;
}

export const QuantityTextField: React.FC<QuantityTextFieldProps> = ({
  disableButtons = false,
  maxQuantity,
  onQuantityChange,
  quantity,
}: QuantityTextFieldProps) => (
  <ItemQuantity
    onAdd={() => onQuantityChange(1)}
    onRemove={() => onQuantityChange(-1)}
    value={quantity}
    maxValue={maxQuantity}
    disableOnAdd={disableButtons}
    disableOnRemove={disableButtons}
  />
);
