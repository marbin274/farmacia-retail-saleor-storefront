import React from "react";

import { getBackgroundColor } from "@utils/styles";

import { InputLabel } from "../InputLabel";

const renderErrorIcon = () => {
  return null;
};

// todo investigate further strange errors in storybook tests, appearing when we use <Icon/>. At the moment just comment out code to enable test pass.
// import { aunaError } from "@styles/constants";
// import { Icon } from "@components/atoms";
// const renderErrorIcon = () => {
//   if (false && error) {
//     return (
//       <S.InputIconWrapper>
//         <Icon color={'red'} name={'heart'}/>
//       </S.InputIconWrapper>
//     );
//   }
// };

import * as S from "./styles";
import { IProps } from "./types";

export const Input: React.FC<IProps> = ({
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
  ...props
}: IProps) => {
  const elementRef = React.useRef(null);
  const [active, setActive] = React.useState(false);
  const [labelBackground, setColor] = React.useState<string>("transparent");

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


  return (
    <S.Wrapper
      active={active}
      error={error}
      disabled={disabled}
      ref={elementRef}
    >
      {contentLeft && <S.Content>{contentLeft}</S.Content>}
      <S.InputWrapper>
        <S.Input
          {...props}
          active={active}
          value={value}
          error={error}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
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
        {renderErrorIcon()}
      </S.InputWrapper>
      {contentRight && <S.Content>{contentRight}</S.Content>}
    </S.Wrapper>
  );
};
