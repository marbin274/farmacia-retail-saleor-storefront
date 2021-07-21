import React, { FC } from "react";
import { Radio } from "@components/atoms";
import classNames from "classnames";
import { ITileRadioProps } from "./types";

export const TileRadio: FC<ITileRadioProps> = ({
  children,
  contentNoSpacing = false,
  className,
  hasError,
  label,
  onClick,
  radioProps: { checked, ...rest },
}) => {
  return (
    <div
      className={classNames(
        "fa-border-solid fa-border fa-bg-white fa-rounded-2xl fa-select-none fa-overflow-hidden",
        {
          "fa-border-error-medium": !!hasError,
          "fa-border-transparent": !checked,
          "fa-border-interactive": !!checked,
        },
        className
      )}
    >
      <div
        className={classNames(
          "fa-flex fa-items-center fa-p-4 fa-rounded-t-2xl",
          {
            "fa-rounded-b-2xl": !checked || (!!checked && !children),
            "fa-bg-highlight-lightest fa-text-interactive": !!checked,
          }
        )}
        onClick={onClick}
      >
        <Radio
          {...rest}
          checked={checked}
          selectedColor="purple"
          hasError={hasError}
          readOnly
        />
        <span className="fa-font-semibold fa-text-sm">{label}</span>
      </div>
      {checked && children && (
        <div className={classNames({ "fa-px-4 fa-py-3": !contentNoSpacing })}>
          {children}
        </div>
      )}
    </div>
  );
};
