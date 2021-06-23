import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Radio input.
 */
const Radio: React.FC<IProps> = ({
  checked,
  children,
  customLabel = false,
  selectedColor = "green",
  ...props
}: IProps) => {
  const StyledInput = customLabel ? S.Input : S.LabeledInput;

  return (
    <StyledInput checked={checked || false} selectedColor={selectedColor}>
      <input type="radio" checked={checked} {...props} />{" "}
      <div>
        <S.Span checked={checked || false} selectedColor={selectedColor}/>
      </div>
      {children}
    </StyledInput>
  );
};

export { Radio };
