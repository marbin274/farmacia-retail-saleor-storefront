import React from "react";
import ItemQuantity from "../OverlayManager/Cart/ItemQuantity";

interface QuantityTextFieldProps {
  quantity: number;
  maxQuantity: number;
  onQuantityChange: (value: number) => void;
}

export const QuantityTextField: React.FC<QuantityTextFieldProps> = ({
  quantity,
  maxQuantity,
  onQuantityChange,
}: QuantityTextFieldProps) => (
  <ItemQuantity
    onAdd={() => onQuantityChange(1)}
    onRemove={() => onQuantityChange(-1)}
    value={quantity}
    maxValue={maxQuantity}
  />
);
