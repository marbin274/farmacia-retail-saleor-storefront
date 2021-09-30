import { MainBanner_mainBanner } from '@sdk/queries/gqlTypes/MainBanner';
import { BannerCarousel } from '@temp/@next/components/containers/BannerCarousel';
import { useMainBanner } from '@temp/@sdk/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { NotFound } from '../../NotFoundPage';
import * as S from './styles';
import { launchClickOnBanner } from '@temp/@sdk/gaConfig';
import { AsyncImage } from '@temp/@next/components/atoms/AsyncImage';
import { useMediaScreen } from '@temp/@next/globalStyles';

const baseUrlPattern = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})*\/?/;
const heightBannerDesktop = 500;
const widthBannerDesktop = 1920;
const heightBannerMobile = 500;
const widthBannerMobile = 1920;

type BannerType = {
  link: string | null;
  desktop: any;
  mobile: any;
};

const getBannersFromData = (data: MainBanner_mainBanner): BannerType[] => {
  return data?.frames
    ? data?.frames.map((banner): BannerType => {
        const bannerDesktop = banner.images?.find(
          (it) => it.screenType === 'desktop'
        );
        const bannerMobile = banner.images?.find(
          (it) => it.screenType === 'mobile'
        );
        const result: BannerType = {
          link: banner.link,
          desktop: bannerDesktop?.url || '',
          mobile: bannerMobile?.url || '',
        };
        return result;
      })
    : [
        {
          link: null,
          desktop: '/assets/auna/home-banner-top.png',
          mobile: '/assets/auna/home-banner-mob.png',
        },
      ];
};

export const Banner: React.FC = () => {
  const router = useRouter();
  const { isMobileScreen, isDesktopScreen } = useMediaScreen('1024');

  const { data: mainBanner, loading: mainBannerLoading } = useMainBanner({
    fetchPolicy: 'cache-and-network',
  });

  const redirectTo = (url?: string) => {
    if (!url) {
      return;
    }
    let result = '';
    const match = baseUrlPattern.exec(url);
    if (match != null) {
      result = match[0];
    }
    if (result.length > 0) {
      url = url.replace(result, '');
    }
    router.push(url);
  };

  if (mainBanner && mainBanner === null) {
    return <NotFound />;
  }

  const banners = getBannersFromData(mainBanner);
  const multiBanner: boolean = banners?.length > 1;

  const getResizedHeight = () => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 0;
    return width > widthBannerDesktop || width === 0
      ? heightBannerDesktop
      : (heightBannerDesktop / widthBannerDesktop) * width;
  };

  return (
    <S.BannerWrapper className="fa-relative fa-text-center">
      <BannerCarousel
        autoplay={multiBanner}
        transitionMode={multiBanner ? 'scroll' : 'fade'}
        wrapAround={multiBanner}
      >
        {banners.map((banner, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                redirectTo(banner.link);
                launchClickOnBanner(index + 1, banner?.link, isDesktopScreen);
              }}
            >
              {isMobileScreen && (
                <span className="fa-w-full fa-my-0 fa-mx-auto sm:fa-hidden">
                  <AsyncImage
                    loading="lazy"
                    className="fa-mx-auto fa-my-0 fa-text-gray-03"
                    alt="Farmauna Banner Mobile"
                    height={heightBannerMobile}
                    src={mainBannerLoading ? '' : banner.mobile}
                    width={widthBannerMobile}
                  />
                </span>
              )}
              {!isMobileScreen && (
                <span className="fa-w-full fa-my-0 fa-mx-auto fa-hidden sm:fa-block">
                  <AsyncImage
                    loading="lazy"
                    className="fa-mx-auto fa-my-0 fa-text-gray-03"
                    alt="Farmauna Banner Desktop"
                    height={getResizedHeight()}
                    src={mainBannerLoading ? '' : banner.desktop}
                    width={widthBannerDesktop}
                  />
                </span>
              )}
            </div>
          );
        })}
      </BannerCarousel>
    </S.BannerWrapper>
  );
};
