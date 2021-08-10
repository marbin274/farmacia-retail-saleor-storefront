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

  padding: ${props => `0.5rem ${props.theme.spacing.gutter} 2rem ${props.theme.spacing.gutter}`};

  button {
    flex-grow: 1;
    &:nth-child(2) {
      margin-left: 2rem;

      @media (max-width: ${defaultTheme.breakpoints.smallScreen}) {
        margin-left: 0;
      }
    }
  }
`;
