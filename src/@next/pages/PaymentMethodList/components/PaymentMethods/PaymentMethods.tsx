import React, { FC } from "react";
import { AddNewTile } from "@components/atoms";
import { CreditCardTile } from "../CreditCardTile";
import { IPaymentMethodsProps } from "./types";

export const PaymentMethods: FC<IPaymentMethodsProps> = ({ creditCards }) => {
  const foo = () => {
    return "";
  };

  return (
    <div className="fa-grid fa-grid-cols-1 md:fa-grid-cols-2 fa-gap-4">
      {creditCards?.length === 0 && <AddNewTile type="tajeta" onClick={foo} />}
      {creditCards?.map(c => (
        <CreditCardTile creditCard={c} />
      ))}
    </div>
  );
};
