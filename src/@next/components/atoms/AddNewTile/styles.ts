import { styled, media } from "@styles";

export const Content = styled.div`
  font-size: ${props => props.theme.typography.h4FontSize};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;

  ${media.smallScreen`
    flex-direction: row;
    padding-top: 0;
    padding-bottom: 0;
  `}
`;

export const Text = styled.div`
  font-size: ${({theme}) => theme.typography.baseFontSize};
`
