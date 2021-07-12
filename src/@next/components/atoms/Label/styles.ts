import {styled } from "@styles";

export const Wrapper = styled.span`
  color: ${props => props.theme.colors.greyText};
  display: inline-block;
  font-size: ${props => props.theme.typography.smallFontSize};
  font-weight: 500;
  white-space: pre;
`;
