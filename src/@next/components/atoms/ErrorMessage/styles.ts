import { styled } from '@styles';

export const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.aunaError};
  font-size: ${(props) => props.theme.input.errorFontSize};
  font-weight: ${(props) => props.theme.typography.smallFontWeight};
`;

ErrorMessage.displayName = 'S.ErrorMessage';
