import {media, styled } from "@styles";

export const Wrapper = styled.span`
  color: ${props => props.theme.colors.greyText};
  font-weight: 500;
  font-size: 14px;
  display: inline-block;
  white-space: pre;

  ${media.smallScreen`
  margin-right:0;
  `}
`;
