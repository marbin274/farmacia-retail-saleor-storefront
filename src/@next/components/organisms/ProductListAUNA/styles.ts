import { mediaUp, styled } from "@styles";

export const List = styled.div<{columns: number}>`
  display: grid;    
  grid-template-columns: 1fr;
  grid-gap: 0 1rem;  
  margin-bottom: 2rem;
  ${mediaUp.smallScreen`
    grid-gap: 1rem;
    grid-template-columns: 1fr;
  `}

  ${mediaUp.largeScreen`    
    grid-gap: 1rem 1rem ;
    grid-template-columns: ${({ columns }) =>([...Array( columns + 1)].join("1fr "))};
  `}
`;

