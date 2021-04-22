import { media, styled } from "@styles";

export const Container = styled.div`  
  height: 526px;
  margin: 0 auto;
  max-width: 100vw;
  padding: 2rem ${props => props.theme.spacing.spacer};
  width: ${props => `${props.theme.container.width}px`};
  ${media.largeScreen`
    width: 100%;      
  `}
`;

export const WraperOpenBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h3`
  color: ${({theme})=> theme.colors.aunaBlack};
  font-size: ${({theme})=> theme.typography.h3FontSize};
  font-weight: ${({theme})=> theme.typography.boldFontWeight};
  margin-bottom: 2rem;
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
