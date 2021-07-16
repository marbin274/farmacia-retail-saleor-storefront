import React, { FC } from "react";
import classNames from "classnames";
import { IAlertProps } from "./types";

export const Alert: FC<IAlertProps> = ({
  className,
  icon,
  message,
  type = "success",
}) => {
  return (
    <div
      className={classNames(
        "fa-px-2.5 fa-py-2 fa-rounded-lg fa-text-xs fa-flex fa-items-center",
        {
          "fa-bg-primary-lightest fa-text-primary-dark": type === "success",
          "fa-bg-error-lightest fa-text-error-dark": type === "error",
        },
        className
      )}
    >
      {icon}
      <span
        className={classNames({
          "fa-ml-2": !!icon,
        })}
      >
        {message}
      </span>
    </div>
  );
};
