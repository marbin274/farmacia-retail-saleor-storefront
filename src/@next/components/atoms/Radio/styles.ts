import {DefaultTheme, styled} from "@styles";
import { css } from "styled-components";

const inputStyle = css<{ checked: boolean, theme: DefaultTheme }>`
  ${props => props.checked && `color: #21125E;`}

  cursor: pointer;

  input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }
  > div {
    display: inline-block;
    width: 1em;
    height: 1em;
    margin: 0.25em 1em 0.25em 0.25em;
    border: 0.1em solid ${props => props.checked ? props => props.theme.input.borderColorActive : props.theme.input.labelColor};
    border-radius: 0.5em;
    background: ${props => props.theme.colors.white};
    vertical-align: bottom;
  }
  ${props =>
    props.checked &&
    `> div > span {
      display: block;
      width: 0.5em;
      height: 0.5em;
      margin: 0.15em;
      border-radius: 0.25em;
      background: ${props.theme.input.borderColorActive};
    }`}
`;

export const Input = styled.div<{ checked: boolean }>`
  ${inputStyle}
`;

export const LabeledInput = styled.label<{ checked: boolean }>`
  ${inputStyle}
`;
