import React, { FC } from "react";
import { AddNewTile } from "@components/atoms";
import { Alert } from "@components/molecules";
import { CheckIcon, TrashIcon } from "@farmacia-retail/farmauna-components";
import { CreditCardTile } from "../CreditCardTile";
import { IPaymentMethodsProps } from "./types";

export const PaymentMethods: FC<IPaymentMethodsProps> = ({
  creditCards,
  onClickAdd,
  onClickDelete,
  onClickSetDefault,
  showAddSuccess,
  showDeleteSuccess,
}) => {
  return (
    <>
      <AddNewTile
        type="tajeta"
        onClick={onClickAdd}
        className="fa-flex md:fa-hidden fa-mb-4"
      />
      {showAddSuccess && (
        <Alert
          icon={<CheckIcon size={12} />}
          message="Tarjeta guardada con éxito"
          className="fa-mb-4 fa-flex md:fa-hidden"
        />
      )}
      {showDeleteSuccess && (
        <Alert
          icon={<TrashIcon size={12} />}
          message="La tarjeta ha sido eliminada"
          className="fa-mb-4 fa-flex md:fa-hidden"
          type="error"
        />
      )}
      <div className="fa-grid fa-grid-cols-1 md:fa-grid-cols-2 fa-gap-4">
        <AddNewTile
          type="tajeta"
          onClick={onClickAdd}
          className="fa-hidden md:fa-flex"
        />
        {creditCards?.map(c => (
          <CreditCardTile
            creditCard={c}
            key={c.id}
            onClickSetDefault={onClickSetDefault}
            onClickDelete={onClickDelete}
          />
        ))}
      </div>
    </>
  );
};
