import { styled, media, mediaUp } from "@styles";
import { Overlay } from "@components/organisms";

export const OverlayStyled = styled(Overlay)`
  #lightbox-modal {
    width: 48.75rem;

    ${media.smallScreen`
      top: 8%;
      width: 19.5rem;
    `}

    ${media.xSmallScreen`
      top: 8%;
      width: 17.375rem;
    `}
  }
`;

export const ModalContainer = styled.div`
  height: 100vh;
  margin: 0 auto;
  padding-top: 8rem;
  width: 80vw;
  ${media.smallScreen`
    padding-top: 0;
  `}
`;

export const Modal = styled.div<{
  imageMobile: string;
  imageDesktop: string;
}>`  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
 
  height: 100%;
  z-index: 1000;
  padding-bottom: 2rem;
  overflow-y: auto;
  background-color: transparent;
  background-image: url("${(props: any) => props.imageMobile}");
  background-repeat: no-repeat;
  background-size: 100% auto;
  
  ${mediaUp.mediumScreen`
    background-image: url("${(props: any) => props.imageDesktop}");    
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
