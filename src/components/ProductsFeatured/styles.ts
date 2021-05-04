import { media, styled } from "@styles";
export const Container = styled.div`
width: ${props => `${props.theme.container.width}px`};
  max-width: 100vw;
  height: 526px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.spacer};
  margin-bottom: 0.625rem;
  ${media.largeScreen`
    width: 100%;      
  `}
`;

export const WraperOpenBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
