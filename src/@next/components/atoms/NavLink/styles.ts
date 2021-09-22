import { styled } from '@styles';

export const Link = styled.div<{ fullWidth: boolean }>`
  position: relative;
  font-weight: ${({ theme }) => theme.typography.boldFontWeight};
  text-transform: uppercase;
  transition: 300ms;
  z-index: 0;
  cursor: pointer;

  ${({ fullWidth }) =>
    fullWidth &&
    `
      display: block;
      width: 100%;
  `}

  &:hover, &:focus {
    outline: none;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
