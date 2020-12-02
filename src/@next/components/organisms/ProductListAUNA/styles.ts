import { media, styled } from "@styles";

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 5rem 3rem ;

  ${media.largeScreen`
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5rem 1.5rem ;
  `}

  ${media.smallScreen`
    grid-template-columns: 1fr 1fr;
    grid-gap: 6rem 1rem;
  `}
`;

export const Loader = styled.div`
  text-align: center;
  margin: 2.5rem 0;
`;
