import React, { FC } from "react";
import { CCProviders, CreditCardIcon } from "@components/atoms";
import {
  Button,
  StarFilledIcon,
  TrashIcon,
} from "@farmacia-retail/farmauna-components";
import classNames from "classnames";
import { ICreditCardTileProps } from "./types";

export const CreditCardTile: FC<ICreditCardTileProps> = ({
  creditCard,
  onClickDelete,
  onClickSetDefault,
}) => {
  const formatCardNumber = () => {
    return creditCard?.cardNumber.replace(/\*/g, "•");
  };

  return (
    <div className="fa-bg-white fa-p-6 fa-rounded-3xl">
      <div className="fa-flex fa-items-center fa-justify-between">
        <div
          data-testid="main-card-option"
          className="fa-flex fa-items-center fa-cursor-pointer"
          onClick={() => onClickSetDefault(creditCard.id)}
        >
          <div
            className={classNames("fa-mr-2 fa-p-2 fa-rounded fa-text-white", {
              "fa-bg-primary-medium": creditCard.default,
              "fa-bg-neutral-medium": !creditCard.default,
            })}
          >
            <StarFilledIcon size={12} />
          </div>
          <span
            className={classNames("fa-text-xs", {
              "fa-text-primary-medium": creditCard.default,
              "fa-text-neutral-medium": !creditCard.default,
            })}
          >
            Usar como tarjeta principal
          </span>
        </div>
        <Button
          data-testid="delete-button"
          icon={<TrashIcon />}
          size="small"
          onClick={() => onClickDelete(creditCard.id)}
          iconOnly
        />
      </div>

      <div className="fa-h-px fa-bg-neutral-medium fa-mt-3 fa-mb-4" />
      <p
        data-testid="card-number"
        className="fa-text-lg fa-font-semibold fa-mb-4"
      >
        {formatCardNumber()}
      </p>
      <div className="fa-flex fa-items-center fa-justify-between">
        <div
          data-testid="fullname"
          className="fa-truncate fa-mr-4"
        >{`${creditCard.firstName} ${creditCard.lastName}`}</div>
        <CreditCardIcon creditCardProvider={creditCard.brand as CCProviders} />
      </div>
    </div>
  );
};
