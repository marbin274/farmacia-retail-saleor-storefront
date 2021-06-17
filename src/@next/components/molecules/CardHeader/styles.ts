import { styled } from "@styles";
import { TitleSize } from "./types";

export const Header = styled.div<{ divider: boolean }>`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  padding: ${props => `1.1rem ${props.theme.spacing.gutter} 0.5rem  ${props.theme.spacing.gutter}`};
`;

export const Title = styled.h4<{ size: TitleSize }>`
  font-size: ${({ size, theme: { typography } }) =>
    size === "lg" ? typography.h4FontSize : typography.baseFontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  color: ${props => props.theme.colors.baseFont};
  text-transform: camelcase;
  padding-right: 0.6rem;
  margin: 0;
  margin-top: 2rem;
`;

export const Paragraph = styled.p`
  font-size: ${props => props.theme.typography.smallFontSize};
  color: ${props => props.theme.colors.lightFont};
  padding-right: 0.6rem;
  margin: 0;
`;
