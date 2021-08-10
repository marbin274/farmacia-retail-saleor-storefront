import React, { FC, useState } from "react";
import { XIcon } from "@farmacia-retail/farmauna-components";
import classNames from "classnames";
import { IPopAlertProps } from "./types";
import { Container } from "./styles";

export const PopAlert: FC<IPopAlertProps> = ({
  className,
  icon,
  message,
  title,
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <Container
      className={classNames(
        "fa-py-2 fa-px-4 fa-bg-white fa-shadow-md fa-rounded-lg fa-relative",
        className
      )}
    >
      <XIcon
        size={14}
        className="fa-absolute fa-right-1.5 fa-top-2"
        onClick={() => setVisible(false)}
        data-testid="close-icon"
      />
      {title && (
        <p className="fa-font-semibold fa-text-sm fa-mb-1 fa-mr-3">{title}</p>
      )}
      {message && (
        <div className="fa-flex fa-items-center">
          {icon && (
            <div>
              <div className="fa-rounded fa-bg-primary-lightest fa-flex fa-items-center fa-justify-center fa-h-10 fa-w-10 fa-mr-2">
                {icon}
              </div>
            </div>
          )}
          <div className="fa-text-xs">{message}</div>
        </div>
      )}
    </Container>
  );
};
