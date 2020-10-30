import * as React from "react";

import { FormError } from "../Form";

import "./scss/index.scss";

type Style = "white" | "grey";

interface IClassNameArgs {
  errors?: FormError[];
  iconLeft?: React.ReactNode;
  styleType?: Style;
}

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: FormError[];
  helpText?: string;
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  styleType?: Style;
  innerIcon?: React.ReactNode;
}

const generateClassName = ({ errors, iconLeft, styleType }: IClassNameArgs) => {
  const baseClass = "input__field";
  const errorsClass = errors && errors.length ? " input__field--error" : "";
  const iconLeftClass = iconLeft ? " input__field--left-icon" : "";
  const styleTypeClass = styleType === "grey" ? " input__field--grey" : "";

  return baseClass.concat(errorsClass, iconLeftClass, styleTypeClass);
};
const TextField: React.FC<TextFieldProps> = ({
  label = "",
  iconLeft,
  iconRight,
  errors,
  helpText,
  styleType = "white" as Style,
  innerIcon,
  ...rest
}) => (
  <div className="input">
    {iconLeft && <span className="input__icon-left">{iconLeft}</span>}
    {iconRight && <span className="input__icon-right">{iconRight}</span>}
    <div className="input__content">
      <input
        {...rest}
        className={generateClassName({ errors, iconLeft, styleType })}
      />
      {label && <span className="input__label">{label}</span>}
      {innerIcon && <span className="input__inner-icon">{innerIcon}</span>}
    </div>
    {errors && (
      <span className="input__error">
        {errors.map(error => error.message).join(" ")}
      </span>
    )}
    {helpText && <span className="input__help-text">{helpText}</span>}
  </div>
);

export default TextField;
