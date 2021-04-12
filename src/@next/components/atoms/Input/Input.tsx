import React, { useState } from "react";
import eyeSVG from "src/images/auna/eye.svg";
import closedEyeSVG from "src/images/auna/closed-eye.svg";
import { getBackgroundColor } from "@utils/styles";
import { InputLabel } from "../InputLabel";

import * as S from "./styles";
import { IProps } from "./types";

const TYPE_TEXT = "text";
const TYPE_PASSWORD = "password";

export const Input = React.forwardRef<HTMLInputElement, IProps>(({
  onBlur,
  onFocus,
  contentLeft = null,
  contentRight = null,
  error = false,
  disabled = false,
  placeholder,
  label,
  value,
  onChange,
  type,
  inputWrapperClassname = "",
  ...props
}: IProps, ref) => {
  const elementRef = React.useRef(null);
  const [active, setActive] = React.useState(false);
  const [labelBackground, setColor] = React.useState<string>("transparent");
  const [inputType, setInputType] = useState<string>();

  React.useEffect(() => {
    if (elementRef) {
      const color = getBackgroundColor(elementRef.current);
      setColor(color);
    }
  }, []);

  const handleFocus = React.useCallback(
    e => {
      setActive(true);
      if (onFocus) {
        onFocus(e);
      }
    },
    [setActive, onFocus]
  );
  const handleBlur = React.useCallback(
    e => {
      setActive(false);
      if (onBlur) {
        onBlur(e);
      }
    },
    [setActive, onBlur]
  );

  const tooglePaswordIcon = () => {
    if (!inputType || inputType === TYPE_PASSWORD) {
      setInputType(TYPE_TEXT);
      return;
    }

    setInputType(TYPE_PASSWORD);
  };

  const hasRightIcon = type === TYPE_PASSWORD;

  return (
    <S.Wrapper
      active={active}
      error={error}
      disabled={disabled}
      ref={elementRef}
    >
      {contentLeft && <S.Content>{contentLeft}</S.Content>}
      <S.InputWrapper
        className={inputWrapperClassname}
        hasRightIcon={hasRightIcon}
      >
        <S.Input
          {...props}
          active={active}
          value={value}
          type={inputType || type}
          error={error}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          hasRightIcon={hasRightIcon}
          ref={ref}
        />
        {label && (
          <InputLabel
            active={active || !!value}
            disabled={disabled}
            error={error}
            labelBackground={labelBackground}
          >
            {label}
          </InputLabel>
        )}
        {type === TYPE_PASSWORD && (
          <S.IconRight
            path={
              !inputType || inputType === TYPE_PASSWORD ? closedEyeSVG : eyeSVG
            }
            error={+error}
            disabled={disabled}
            onMouseDown={tooglePaswordIcon}
          />
        )}
      </S.InputWrapper>
      {contentRight && <S.Content>{contentRight}</S.Content>}
    </S.Wrapper>
  );
});
