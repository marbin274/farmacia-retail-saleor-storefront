import React from "react";
import classNames from "classnames";
import { IProps } from "./types";

const Collection = React.forwardRef<HTMLDivElement, IProps>(
  ({ children, className }, ref) => (
    <div
      className={classNames(
        "fa-bg-neutral-light fa-flex fa-flex-col fa-p-4",
        className
      )}
      ref={ref}
    >
      {children}
    </div>
  )
);

export default Collection;
