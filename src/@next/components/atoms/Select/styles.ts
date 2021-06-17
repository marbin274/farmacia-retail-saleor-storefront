import { styled } from "@styles";

export const Wrapper = styled.div<{ errors: boolean }>`
  padding-top: ${props => props.theme.input.topPadding};
  ${({ errors, theme }) =>
    errors &&
    `
  > div {
    > div {
      border-color: ${theme.colors.aunaError};
    }
  }
  `}
`;

export const Indicator = styled.div<{ rotate: string }>`
  position: absolute;
  top: 0;
  right: 1rem;
  transition-duration: 0.3s;
  transform: ${props =>
    props.rotate === "true" ? "rotate(-90deg)" : "rotate(0deg)"};
`;

export const HelpText = styled.span`
  color: ${props => props.theme.input.labelColor};
  font-size: ${props => props.theme.input.labelFontSize};
`;

export const ErrorMessages = styled.div`
  top: 100%;
`;
