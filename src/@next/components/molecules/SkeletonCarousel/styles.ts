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
