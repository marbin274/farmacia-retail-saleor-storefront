import { mediaUp, styled } from "@styles";

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem 1rem ;

  ${mediaUp.xLargeScreen`
    grid-template-columns: 1fr 1fr 1fr 1fr;
  `}
`;

export const Loader = styled.div`
  text-align: center;
  margin: 2.5rem 0;
`;


