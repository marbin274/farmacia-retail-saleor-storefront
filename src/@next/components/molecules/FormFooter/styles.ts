import { defaultTheme, styled } from "@styles";

export const Footer = styled.div<{ divider: boolean }>`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: ${defaultTheme.breakpoints.smallScreen}) {
    flex-direction: column;
    justify-content: center;
  }

  padding: ${props => `1.1rem ${props.theme.spacing.gutter}`};
  ${({ divider, theme }) =>
    divider && `border-top: 1px solid ${theme.colors.light};`}

  button {
    &:last-child {
      margin-left: 2rem;

      @media (max-width: ${defaultTheme.breakpoints.smallScreen}) {
        margin-left: 0;
      }
    }
  }
`;
