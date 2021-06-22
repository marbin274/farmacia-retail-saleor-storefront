import React, { FC } from "react";
import { Radio } from "@components/atoms";
import classNames from "classnames";
import { ITileRadioProps } from "./types";

export const TileRadio: FC<ITileRadioProps> = ({
  children,
  className,
  label,
  onClick,
  radioProps: { checked, ...rest },
}) => {
  return (
    <div
      className={classNames(
        "fa-border-solid fa-border fa-bg-white fa-rounded-2xl fa-select-none",
        {
          "fa-border-transparent": !checked,
          "fa-border-interactive": !!checked,
        },
        className
      )}
      onClick={onClick}
    >
      <div
        className={classNames(
          "fa-flex fa-items-center fa-p-4 fa-rounded-t-2xl",
          {
            "fa-rounded-b-2xl": !checked || (!!checked && !children),
            "fa-bg-highlight-lightest fa-text-interactive": !!checked,
          }
        )}
      >
        <Radio checked={checked} {...rest} />
        <span className="fa-font-semibold fa-text-sm">{label}</span>
      </div>
      {checked && children && <div className="fa-px-4 fa-py-3">{children}</div>}
    </div>
  );
};
