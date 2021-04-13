import { media, styled } from "@styles";
import { largeScreen, mediumScreen, xLargeScreen } from "@temp/@next/globalStyles/constants";
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
`;
export const TopImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

// TODO: cambiar @media(min_width... por mediaUp cuando ambos pases estén en prod
export const TopImageItem = styled.div<{ imageMobile: string, imageDesktop: string, aboutauna?:boolean }>`
  background: no-repeat url("${(props: any )=> props.imageMobile}") transparent;
  background-size: 100% 100%;
  cursor: pointer;
  height: 4rem; 
  width: ${({aboutauna})=>aboutauna ? "55%": "45%"};
  @media(min-width: ${mediumScreen}px){
    background: no-repeat url("${(props: any) => props.imageDesktop}") transparent;
    background-size: contain;
  }
  @media(min-width: ${mediumScreen}px) and (max-width: ${largeScreen}px){
    height: 2.5rem;
    width: 21.5rem;
  }
  @media(min-width: ${largeScreen}px){
    width: 32rem;
  }
  @media(min-width: ${largeScreen}px) and (max-width: ${xLargeScreen}px){
    height: 3.7rem;
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
