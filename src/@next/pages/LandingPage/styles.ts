import { media, styled } from '@styles';

export const Container = styled.div`
  margin: 5rem auto 0 auto;
`;

export const BannerContainer = styled.div`
  width: 100vw;
  text-align: center;
`;

export const BannerImageDesktop = styled.img`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.banner.desktopMaxWidth}px;
  max-height: ${({ theme }) => theme.banner.desktopMaxHeight}px;

  ${media.smallScreen`
    display: none;
  `}
`;

export const BannerImageMobile = styled.img`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.banner.mobileMaxWidth}px;
  max-height: ${({ theme }) => theme.banner.mobileMaxHeight}px;
  display: none;

  ${media.smallScreen`
    display: block;
  `}
`;

export const CollectionsContainer = styled.div`
  ${media.smallScreen`
    padding: 0 1rem;
  `}
`;

export const Collections = styled.div`
  margin: 2rem 0 4rem 0;
`;
