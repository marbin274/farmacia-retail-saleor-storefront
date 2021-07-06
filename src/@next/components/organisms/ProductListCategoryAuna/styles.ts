import { media, styled } from "@styles";

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem 1rem ;

  ${media.largeScreen`
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  `}

  ${media.smallScreen`
    grid-template-columns: 1fr;
    grid-gap: 0 1rem;
  `}
`;

export const Loader = styled.div`
  text-align: center;
  margin: 2.5rem 0;
`;


