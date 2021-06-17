import { media, mediaUp, styled } from "@styles";
import { smallScreen, xSmallScreen } from "@temp/@next/globalStyles/constants";

export const Container = styled.div`
width: ${props => `${props.theme.container.width}px`};
  max-width: 100vw;
  height: 32.875rem;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.spacer};
  ${media.largeScreen`
    width: 100%;    
  `}
`;

export const WraperOpenBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TopImagesContainer = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  height:100%;
`;

export const TopImageItem = styled.div<{ imageMobile: string, imageDesktop: string }>`
  background-image: url("${(props: any )=> props.imageMobile}");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  height: 3.5rem; 
  ${mediaUp.smallScreen`
    background-image: url("${(props: any) => props.imageDesktop}");
  `}
`;

export const TopImageAunaContainer = styled.div`
  width: 7.875rem;
  ${mediaUp.xSmallScreen`
    width: 7.875rem;
  `}
  ${mediaUp.smallScreen`
    flex: 1;    
    justify-content: flex-end;
    display: flex;
  `}
`;

export const TopImageAuna = styled(TopImageItem as any)` 
  max-width: 24.8125rem;
  ${mediaUp.smallScreen`
    background-size: 100% 100%;
    flex: 1;
    height: 3.125rem;  
    width: initial;
  `}
  ${mediaUp.mediumScreen`
    height: 4.625rem;  
  `}
`;

export const TopImageDistrictContainer = styled.div`
  flex: 1;
`;

export const TopImageDistrict = styled(TopImageItem as any)`
max-width: 34.0625rem;
  ${mediaUp.smallScreen`
    height: 3.125rem;  
  `}
  ${mediaUp.mediumScreen`
    height: 4.625rem;  
  `}
`;

export const TopImageDistrictBannerOpen = styled.div<{
  imageMobile: string,
  imageDesktop: string
}>`
  width: 45rem;
  height: 4rem; 
  cursor: pointer;
  background: no-repeat url("${(props: any) => props.imageDesktop}") transparent;
  background-size: contain;
  ${media.smallScreen`
    background: no-repeat url("${(props: any )=> props.imageMobile}") transparent;
    background-size: 100% 100%;
  `};
 `;

export const SSkeletonBanner = styled.div`
  position: relative;
    cursor: pointer;
    background-position: center top;
    background: linear-gradient(-90deg, #F0F0F0 0%, #F8F8F8 50%, #F0F0F0 100%);
    @media (max-width: ${smallScreen}px) {
      height: 28.75rem;
      border-radius: 0;
      background-position: center top;
      margin-top: 1rem;
    }
    @media (max-width: ${xSmallScreen}px) {
      width: ${xSmallScreen}px;
    }
  animation: pulse 1.2s ease-in-out infinite;
  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
`;
