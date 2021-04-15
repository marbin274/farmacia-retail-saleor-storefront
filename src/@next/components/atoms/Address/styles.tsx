import { styled } from "@styles";

export const Wrapper = styled.div`
  color: ${({ theme }) => theme.colors.aunaBlack}
  p {
    line-height: 2rem;
  }
`

export const Name = styled.span`
  display: block;
  font-size: ${({theme})=> theme.typography.baseFontSize}
  font-weight: ${props => props.theme.typography.boldFontWeight};
  margin-bottom: 1.25rem;
`;
