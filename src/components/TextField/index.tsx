import * as React from "react";
import "./scss/index.scss";

type Style = "white" | "grey";

interface IClassNameArgs {
  errors?: {
    message: string;
    field?: string;
  }[];
  iconLeft?: React.ReactNode;
  styleType?: Style;
}

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: {
    message: string;
    field?: string;
  }[];
  helpText?: string;
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  styleType?: Style;
  innerIcon?: React.ReactNode;
  inputRef?: any;
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
  inputRef,
  ...rest
}) => (
  <div className="input">
    {iconLeft && <span className="input__icon-left">{iconLeft}</span>}
    {iconRight && <span className="input__icon-right">{iconRight}</span>}
    <div className="input__content">
      {label && <span className="input__label">{label}</span>}

      <input
        {...rest}
        ref={inputRef}
        className={generateClassName({ errors, iconLeft, styleType })}
      />
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
