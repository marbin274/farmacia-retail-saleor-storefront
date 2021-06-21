import { mediaUp, styled } from "@styles";

 export const SkeletonProduct = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  ${mediaUp.smallScreen`
    flex-direction: row;
  `};
  > div {
    
    margin: 1.5rem 2rem;
    ${mediaUp.smallScreen`
      flex: 1;
    `};
    &:first-child {
      height: 15rem;    
      ${mediaUp.smallScreen`
        height: 40rem;    
      `};
    }
  }
  
 `;

 export const SkeletonDescription = styled.div`
  > div{
    &:last-child {
      margin-top: 3rem;
    }
  }
 `;

