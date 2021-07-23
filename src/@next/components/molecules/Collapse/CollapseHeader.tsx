import React, { FC } from "react";
import { UpIcon, DownIcon } from "@farmacia-retail/farmauna-components";
import classNames from "classnames";
import { ICollapseHeaderProps } from "./types";

export const CollapseHeader: FC<ICollapseHeaderProps> = ({
  active,
  hasError,
  title,
  onClick,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={classNames(
        "fa-py-3 fa-px-4 fa-flex fa-justify-between fa-items-center fa-cursor-pointer fa-selection-none",
        {
          "fa-shadow-lg": active,
          "fa-text-interactive": !hasError,
          "fa-text-error-medium": hasError,
        }
      )}
      onClick={onClick}
    >
      <span
        className={classNames({
          "fa-font-semibold": active,
        })}
      >
        {title}
      </span>
      {active ? <UpIcon /> : <DownIcon />}
    </div>
  );
};
