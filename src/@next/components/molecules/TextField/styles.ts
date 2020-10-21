import { styled } from "@styles";

export const TextField = styled.div`
  padding-top: ${props => props.theme.input.topPadding};
  margin-bottom: ${props => props.theme.spacing.spacer};
  position: relative;
`;
TextField.displayName = "S.TextField";

export const HelpText = styled.span`
  color: ${props => props.theme.input.labelColor};
  font-size: ${props => props.theme.input.labelFontSize};
`;

export const ErrorMessages = styled.div`
  position: absolute;
  top: 100%;
`;
