import { styled } from "@styles";

export const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.aunaError};
  font-size: ${props => props.theme.input.errorFontSize};
  font-weight: ${props => props.theme.typography.smallFontWeight};
`;

export const ErrorParagraph = styled.p`
  margin: 0;
  line-height: 1rem;
`;

ErrorMessage.displayName = "S.ErrorMessage";