import { media, styled } from "@styles";
import { Size } from "./types";


const padding = {
  md: "0.9rem 3.7rem",
  sm: "0.1rem 2rem",
};

const fontSize = (fontSize: string, smallFontSize: string) => ({
  md: fontSize,
  sm: smallFontSize,
});

// @ts-ignore
const getButtonColors = props => props.theme.button.colors[props.color];

export const Primary = styled.button<{
  color: "primary" | "secondary";
  fullWidth?: boolean;
  size: Size;
}>`
  background-color: ${props => getButtonColors(props).background};
  padding: ${(props: { size: Size }) => padding[props.size]}; 
  border: 1px solid #008A66;
  border-radius: 40px;
  transition: 0.3s;
  outline: none;
  cursor: pointer;
  color: #008A66;
  width: ${props => (props.fullWidth ? "100%" : "auto")};

  &:hover {
    background-color: ${props => getButtonColors(props).hoverBackground};
    color: ${props => getButtonColors(props).hoverColor};
  }

  &:active {
    background-color: ${props => getButtonColors(props).activeBackground};
    box-shadow: -3px 3px 14px 0px rgba(129, 67, 67, 0.2);
  }

  &:disabled {
    background-color: ${props => getButtonColors(props).disabledBackground};
    color: ${props => getButtonColors(props).disabledColor};
    cursor: default;

    &,
    &:hover {
      cursor: default;
    }
  }

  ${media.smallScreen`
    padding:  0.9rem 1rem;
    width: ${(props: { fullWidth: boolean }) =>
      props.fullWidth ? "100%" : "88%"};
  `}
`;

export const Secondary = styled(Primary)`
  box-shadow: inset 0px 0px 0px 3px ${props => getButtonColors(props).color};
  border-left: 1px solid ${props => getButtonColors(props).color};
  border-right: 1px solid ${props => getButtonColors(props).color};
`;

export const Outline = styled(Primary)`
  border: ${({theme}) => `1px solid ${theme.colors.interactive}`};
  background-color: transparent;
  color: ${({theme}) => theme.colors.interactive};

  &:hover {
    background-color: transparent;
    color: ${({theme}) => theme.colors.interactive};
  }
`;

export const Text = styled.span<{ size: Size }>`
  display: inline-block;
  font-size: ${({
    size,
    theme: {
      button: { typography },
    },
  }) => fontSize(typography.fontSize, typography.smallFontSize)[size]};
  font-weight: ${props => props.theme.typography.normalFontWeight};
  line-height: ${props => props.theme.typography.baseLineHeight};
  user-select: none;
`;
