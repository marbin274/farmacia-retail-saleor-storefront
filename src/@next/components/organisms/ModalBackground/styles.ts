import { styled, media } from "@styles";

export const Modal = styled.div<{
  imageMobile: string,
  imageDesktop: string
}>`  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
 
  height: 100%;
  z-index: 1000;
  padding-bottom: 2rem;
  overflow-y: auto;
  background: no-repeat url("${(props: any) => props.imageDesktop}") transparent;
  background-size: contain;
  
  ${media.smallScreen`
    background: no-repeat url("${(props: any )=> props.imageMobile}") transparent;
    background-size: contain;
  `};
`;

export const CloseDiv = styled.div`
  margin-top: 0.9375rem;
  margin-right: 0.9375rem;
  cursor: pointer;
  ${media.smallScreen`
    margin-top: 0;
    margin-right: 0;
  `}
  margin-left: auto;
`;

export const Content = styled.div`
  padding: ${({ theme: { spacing } }) =>
    `0rem ${spacing.gutter} 0rem ${spacing.gutter}`};
`;
