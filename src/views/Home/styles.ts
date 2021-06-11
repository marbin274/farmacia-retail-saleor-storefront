import { media, mediaUp, styled } from "@styles";
import { xSmallScreen,smallScreen,largeScreen, mediumScreen, xLargeScreen } from "@temp/@next/globalStyles/constants";

export const Container = styled.div`
width: ${props => `${props.theme.container.width}px`};
  max-width: 100vw;
  height: 526px;
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
  height:4.625rem;
`;
export const TopImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height:100%;
`;

export const TopImageItem = styled.div<{ imageMobile: string, imageDesktop: string, aboutauna?:boolean }>`
  background: no-repeat url("${(props: any )=> props.imageMobile}") transparent;
  background-size: 100% 100%;
  cursor: pointer;
  height: 4rem;
  width: ${({aboutauna})=>aboutauna ? "55%": "45%"};  
  ${mediaUp.mediumScreen`
    background: no-repeat url("${(props: any) => props.imageDesktop}") transparent;
    background-size: cover;
  `}
  @media(min-width: ${mediumScreen}px) and (max-width: ${largeScreen}px){
    width: auto;
  }
  ${mediaUp.largeScreen`
    height:auto;
  `}
  @media(min-width: ${largeScreen}px) and (max-width: ${xLargeScreen}px){
    height: auto;
  }
`
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
      height: 460px;
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
