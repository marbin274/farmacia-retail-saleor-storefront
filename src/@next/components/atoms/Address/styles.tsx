import { styled } from "@styles";

export const Wrapper = styled.div`
  color: ${({ theme }) => theme.colors.aunaBlack}
  display: flex;
  flex-direction: column;
`

export const Name = styled.span`
  display: block;
  font-size: ${({theme})=> theme.typography.baseFontSize}
  font-weight: ${props => props.theme.typography.boldFontWeight};
  margin-bottom: 1.25rem;
`;
