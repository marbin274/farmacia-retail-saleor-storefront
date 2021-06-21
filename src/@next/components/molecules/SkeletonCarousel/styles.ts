import { mediaUp, styled } from "@styles";

export const SkeletonRow = styled.div`  
  padding: 1rem 0;
  width: 100%;  
`;

export const SkeletonTitle = styled.div`
  padding: 1rem 1rem 3rem;
  width: 100%;
  ${mediaUp.smallScreen`
    width: 80%;
  `};
`;

export const SkeletonItems = styled.div`
  height: 31.125rem;
  display: flex;
  justify-content: space-around;
  width: 100%;
  ${mediaUp.smallScreen`
  height: 26.188rem;
  `};
  > div {
    display: none;
    ${mediaUp.smallScreen`
        display: block;
    `};
    &:last-child {
      display: block;      
    }
  }
`;

export const SkeletonItem = styled.div`
  width: 100%;
  ${mediaUp.smallScreen`
    margin: 0rem 2rem;
  `};
 `;