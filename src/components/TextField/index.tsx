import classNames from "classnames";
import * as React from "react";
import * as S from "./styles";
type Style = "white" | "grey";

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
  <div className="input fa-box-border fa-pb-0">
    {iconLeft && (
      <S.IconLeft className="fa-absolute fa-left-4 fa-z-2">
        {iconLeft}
      </S.IconLeft>
    )}
    {iconRight && (
      <S.IconRight className="fa-absolute fa-right-4 fa-z-2">
        {iconRight}
      </S.IconRight>
    )}
    <div className="input__content fa-relative">
      {label && (
        <span className="input__label fa-inline-block fa-absolute fa-text-gray-100 fa-top-1/2 fa-left-3 fa-transform fa--translate-y-1/2 fa-px-1.5 fa-pointer-events-none fa-transition-all fa-duration-300 fa-text-sm">
          {label}
        </span>
      )}

      <S.Input
        {...rest}
        ref={inputRef}
        className={classNames(
          "input__field fa-block fa-w-full fa-rounded fa-py-3 fa-px-4 fa-text-sm fa-text-gray-100 fa-border fa-border-solid fa-border-gray fa-outline-none fa-bg-transparent",
          {
            "fa-pl-12": iconLeft,
            error: errors && errors.length,
            gray: styleType === "grey",
          }
        )}
      />
      {innerIcon && <span className="input__inner-icon">{innerIcon}</span>}
    </div>
    {errors && (
      <span className="fa-text-error-medium fa-text-xs">
        {errors.map((error) => error.message).join(" ")}
      </span>
    )}
    {helpText && (
      <span className="fa-text-gray-dark fa-text-xs">{helpText}</span>
    )}
  </div>
);

export default TextField;
