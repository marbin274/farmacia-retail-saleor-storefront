import React, { FC } from "react";
import { CCProviders, CreditCardIcon } from "@components/atoms";
import {
  Button,
  StarFilledIcon,
  TrashIcon,
} from "@farmacia-retail/farmauna-components";
import { ICreditCardTileProps } from "./types";

export const CreditCardTile: FC<ICreditCardTileProps> = ({ creditCard }) => {
  return (
    <div className="fa-bg-white fa-p-6 fa-rounded-3xl">
      <div className="fa-flex fa-items-center fa-justify-between">
        <div className="fa-flex fa-items-center fa-cursor-pointer">
          <div className="fa-mr-2 fa-p-2 fa-bg-primary-medium fa-rounded fa-text-white">
            <StarFilledIcon size={12} />
          </div>
          <span className="fa-text-primary-medium fa-text-xs">
            Usar como tarjeta principal
          </span>
        </div>
        <Button icon={<TrashIcon />} size="small" />
      </div>

      <div className="fa-h-px fa-bg-neutral-medium fa-mt-3 fa-mb-4" />
      <p className="fa-text-lg fa-font-semibold fa-mb-4">{creditCard.cardNumber}</p>
      <div className="fa-flex fa-items-center fa-justify-between">
        <div className="fa-truncate fa-mr-4">
          Cristina Cáceres
        </div>
        <CreditCardIcon creditCardProvider={creditCard.brand as CCProviders} />
      </div>
    </div>
  );
};
