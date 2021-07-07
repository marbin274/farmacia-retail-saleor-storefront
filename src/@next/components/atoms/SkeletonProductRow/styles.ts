import { mediaUp, styled } from "@styles";

export const SkeletonItems = styled.div`
  height: 31.125rem;
  display: flex;
  justify-content: space-around;
  margin: 1rem 0rem;
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