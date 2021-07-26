import {mediaUp, styled} from "@styles";

export const ImagesTop = styled.div<{
    imageMobile: string,
    imageDesktop: string
  }>`
    background-color: transparent;
    background-image: url("${(props: any) => props.imageMobile}");
    background-repeat: no-repeat;
    background-size: 100% auto;
    height: 5rem;
    width: 100%;
    ${mediaUp.mediumScreen`
      background-image: url("${(props: any) => props.imageDesktop}");
      height: 6rem;
    `}
`;


export const CategoryItemRoot = styled.div`
  > div:first-child, div:last-child {
    margin: 0rem;
    width: 1.25rem;
  }
`;

export const CategoryName = styled.span`
  flex: 10;
`;

export const SaveConfirm = styled.div`
  ${mediaUp.mediumScreen`
    left: 0;
    position: absolute;
    top: -3.5rem;
    width: 100%;
  `}
`;
