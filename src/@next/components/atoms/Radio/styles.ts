import { DefaultTheme, styled, defaultTheme } from "@styles";
import { css } from "styled-components";
import farmatheme from "@farmatheme";
import { RadioColor } from "./types";

const getCheckedColor = (color: RadioColor, hasError?: boolean) => {
  if (hasError) {
    return farmatheme.theme.colors.error.medium;
  }

  if (color === "purple") {
    return farmatheme.theme.colors.interactive;
  }

  return defaultTheme.input.borderColorActive;
};

const getColor = (hasError?: boolean) => {
  if (hasError) {
    return farmatheme.theme.colors.error.medium;
  }

  return defaultTheme.input.labelColor;
};

type IBaseProps = {
  checked: boolean;
  selectedColor: RadioColor;
  hasError?: boolean;
};

const inputStyle = css<IBaseProps & { theme: DefaultTheme }>`
  ${props => props.checked && `color: #21125E;`}

  cursor: pointer;

  input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }
  > div {
    align-items: center;
    display: flex;
    width: 1em;
    height: 1em;
    margin: 0.25em 1em 0.25em 0.25em;
    border: 0.1em solid
      ${props =>
        props.checked
          ? props => getCheckedColor(props.selectedColor, props.hasError)
          : getColor(props.hasError)};
    border-radius: 0.5em;
    background: ${props => props.theme.colors.white};
  }
`;

export const Span = styled.span<IBaseProps>`
  display: ${({ checked }) => (checked ? "block" : "none")};
  width: 0.5em;
  height: 0.5em;
  margin: 0 auto;
  border-radius: 0.25em;
  background: ${({ hasError, selectedColor }) =>
    getCheckedColor(selectedColor, hasError)};
`;

export const Input = styled.div<IBaseProps>`
  ${inputStyle}
`;

export const LabeledInput = styled.label<IBaseProps>`
  ${inputStyle}
`;
