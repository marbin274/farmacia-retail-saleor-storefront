import { ContainerStyle, media, mediaUp, styled } from "@styles";

export const WraperOpenBanner = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;
export const TopImagesContainer = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  height: 100%;
  width: 100%;
`;

export const TopImageItem = styled.div<{
  imageMobile: string;
  imageDesktop: string;
}>`
  background-image: url("${(props: any) => props.imageMobile}");
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
    display: flex;
    flex: 1;    
    justify-content: flex-end;
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
  imageMobile: string;
  imageDesktop: string;
}>`
  background: no-repeat url("${(props: any) => props.imageMobile}") transparent;
  background-size: 100% 100%;
  cursor: pointer;
  height: 4rem;
  width: 45rem;
  ${mediaUp.smallScreen`
    background: no-repeat url(${(props: any) =>
      props.imageDesktop}) transparent;
    background-size: contain;
  `};
`;

export const ProductsFeaturedWrapper = styled.div`
  ${ContainerStyle};
  padding: 0;

  ${mediaUp.smallScreen`
    padding: 0 1rem;
  `};
`;
