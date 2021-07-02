import React from "react";
import { IProps } from "./types";

export const Money: React.FC<IProps> = ({
  negative = false,
  money,
  defaultValue,
  ...props
}: IProps) => {
  if (!money) {
    return <span {...props}>{defaultValue}</span>;
  }
  const amount = negative ? -Math.abs(money.amount) : money.amount;
  return (
    <span {...props}>
      {money.currency && money.currency !== ""
        ? amount.toLocaleString(money.culture, {
            currency: money.currency,
            style: "currency",
          })
        : amount.toString()}
    </span>
  );
};

Money.displayName = "Money";
export default Money;
