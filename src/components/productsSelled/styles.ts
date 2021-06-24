import { media, styled } from "@styles";
import farmatheme from "@farmatheme";

export const Container = styled.div`
  margin: 0 auto;
  padding: 1rem 0 0 0;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  ${media.largeScreen`
    background-color: ${farmatheme.theme.colors.white};
    width: 100%;
    height: auto;      
  `}
`;

export const WraperOpenBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h3`
  color: ${farmatheme.theme.colors.black};
  font-size: ${({ theme }) => theme.typography.h3FontSize};
  font-weight: ${({ theme }) => theme.typography.boldFontWeight};
  margin-bottom: 2rem;
  text-align:left;

  ${media.largeScreen`
    text-align:center;
    font-size: ${({ theme }) => theme.typography.bigFontSize};
  `}
`;

export const TopImageDistrictBannerOpen = styled.div<{
  imageMobile: string;
  imageDesktop: string;
}>`
  width: 45rem;
  height: 4rem; 
  cursor: pointer;
  background: no-repeat url("${(props: any) =>
    props.imageDesktop}") transparent;
  background-size: contain;
  ${media.smallScreen`
    background: no-repeat url("${(props: any) =>
      props.imageMobile}") transparent;
    background-size: 100% 100%;
  `};

 `;

 export const SkeletonItem = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
 `;
