import React, { FC } from "react";
import classNames from "classnames";
import { CollapseHeader } from "./CollapseHeader";
import { ICollapseProps } from "./types";

export const Collapse: FC<ICollapseProps> = ({
  active = false,
  children,
  hasError = false,
  header,
  onClick,
}) => {
  return (
    <div>
      <CollapseHeader
        data-testid="header"
        title={header}
        active={active}
        hasError={hasError}
        onClick={onClick}
      />
      <div
        className={classNames(
          "fa-py-3 fa-px-4 fa-bg-neutral-light fa-overflow-hidden fa-selection-none",
          {
            "fa-hidden": !active,
          }
        )}
      >
        {active && children}
      </div>
    </div>
  );
};
