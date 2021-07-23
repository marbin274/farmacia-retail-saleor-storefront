import React, { FC } from "react";
import classNames from "classnames";
import { CCProviders, CreditCardIcon } from "@components/atoms";
import { CheckIcon } from "@farmacia-retail/farmauna-components";
import { ICreditCardItemProps } from "./types";

export const CreditCardItem: FC<ICreditCardItemProps> = ({
  className,
  creditCard,
  onClickSelect,
  selected,
}) => {
  const formatCardNumber = () => {
    return creditCard?.cardNumber.replace(/\*/g, "•");
  };

  return (
    <div
      className={classNames(
        "fa-bg-white fa-rounded-3xl fa-shadow-md fa-py-4 fa-px-6 fa-border fa-border-solid",
        {
          "fa-border-transparent": !selected,
          "fa-border-primary-medium": selected,
        },
        className
      )}
    >
      <div className="fa-flex fa-items-center fa-justify-between fa-mb-4">
        <div data-testid="card-number" className="fa-text-lg fa-font-semibold">
          {formatCardNumber()}
        </div>
        <div
          data-testid="select-option"
          onClick={() => onClickSelect?.(creditCard.id)}
          className={classNames(
            "fa-border fa-border-solid fa-h-8 fa-w-8 fa-rounded-2xl fa-flex fa-items-center fa-justify-center",
            {
              "fa-text-white fa-bg-primary-medium fa-border-transparent": selected,
              "fa-bg-transparent fa-border-neutral-medium": !selected,
              "fa-cursor-pointer": !!onClickSelect,
            }
          )}
        >
          {selected && (
            <CheckIcon
              data-testid="selected-icon"
              size={14}
              className="fa-mt-1"
            />
          )}
        </div>
      </div>
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
