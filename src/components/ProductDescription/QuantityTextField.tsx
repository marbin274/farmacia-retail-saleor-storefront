import React, { useEffect, useState } from "react";
import ItemQuantity from "../OverlayManager/Cart/ItemQuantity";

interface QuantityTextFieldProps {
  quantity: number;
  maxQuantity: number;
  onQuantityChange: (value: number) => void;
}

export const QuantityTextField: React.FC<QuantityTextFieldProps> = ({
  quantity,
  maxQuantity = NaN,
  onQuantityChange,
}: QuantityTextFieldProps) => {
  const [isTooMuch, setIsTooMuch] = useState(false);

  useEffect(() => {
    if (!isNaN(maxQuantity)) {
      setIsTooMuch(quantity >= maxQuantity);
    }
  }, [quantity, maxQuantity]);

  const handleQuantityChange = (quantityToAdd: 1 | -1) => {
    const newQuantity = quantity + quantityToAdd;

    if (newQuantity > 0 && !isTooMuch && quantity !== newQuantity) {
      onQuantityChange(newQuantity);
    }
  };

  return (
    <ItemQuantity
      enableRemoveLastItem = {false}
      onAdd={() => handleQuantityChange(1)}
      onRemove={() => handleQuantityChange(-1)}
      value={quantity.toString()}
    />
  );
};
