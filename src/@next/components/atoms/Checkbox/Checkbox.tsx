import React from "react";
import * as S from "./styles";
import { IProps } from "./types";
import { CheckIcon } from "@farmacia-retail/farmauna-components";

const ENTER_KEY: number = 13;
const SPACE_KEY: number = 32;

export const Checkbox: React.FC<IProps> = ({
  checked,
  children,
  parentStyles,
  error,
  name,
  onChange = () => null,
  ...props
}: IProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <S.Checkbox ref={ref} style={{...parentStyles}}>
      <S.Label
        htmlFor={props?.id}
        onClick={evt => {
          evt.preventDefault();
          onChange(evt);
          if (ref.current) {
            ref.current.blur();
          }
        }}
      >
        <input
          {...props}
          tabIndex={-1}
          type="checkbox"
          name={name}
          checked={checked}
          readOnly
        />
        <div
          ref={ref}
          tabIndex={0}
          onKeyDown={evt => {
            if (evt.which === SPACE_KEY || evt.which === ENTER_KEY) {
              evt.preventDefault();
              onChange(evt);
            }
          }}
        >
          <S.Span error={!!error}>
            <CheckIcon className={"checkout_icon"} size={16} />
          </S.Span>
        </div>
      </S.Label>
      {children}
    </S.Checkbox>
  );
};
