import { styled, media, mediaUp } from "@styles";
import { Overlay } from "@components/organisms";

export const OverlayStyled = styled(Overlay)`
  #lightbox-modal {
    top: 8%;
    width: 17.375rem;

    ${mediaUp.xSmallScreen`
      width: 19.5rem;
    `}

    ${mediaUp.smallScreen`
      width: 48.75rem;
      top: 0;
    `}
  }
`;

export const ModalContainer = styled.div`
  height: 100vh;
  margin: 0 auto;
  padding-top: 0;
  width: 80vw;
  ${mediaUp.smallScreen`
    padding-top: 8rem;
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
  cursor: pointer;
  margin-left: auto;
  margin-right: 0;
  margin-top: 0;
  ${mediaUp.smallScreen`
    margin-top: 0.9375rem;
    margin-right: 0.9375rem;
  `}
`;

export const Content = styled.div`
  padding: ${({ theme: { spacing } }) =>
    `0rem ${spacing.gutter} 0rem ${spacing.gutter}`};
`;
