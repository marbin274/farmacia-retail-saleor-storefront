import React, { FC } from "react";
import { AddNewTile } from "@components/atoms";
import { CreditCardTile } from "../CreditCardTile";
import { IPaymentMethodsProps } from "./types";

export const PaymentMethods: FC<IPaymentMethodsProps> = ({
  creditCards,
  onClickAdd,
  onClickSetDefault,
}) => {
  return (
    <div className="fa-grid fa-grid-cols-1 md:fa-grid-cols-2 fa-gap-4">
      <AddNewTile type="tajeta" onClick={onClickAdd} />
      {creditCards?.map(c => (
        <CreditCardTile
          creditCard={c}
          key={c.id}
          onClickSetDefault={onClickSetDefault}
        />
      ))}
    </div>
  );
};
