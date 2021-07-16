import { mediaUp, styled } from "@styles";

export const SkeletonProduct = styled.div<{height: number}>`
    height: ${({ height }) => `${height}rem`};
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
