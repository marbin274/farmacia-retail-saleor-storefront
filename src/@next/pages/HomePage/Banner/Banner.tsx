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
  const { isMobileScreen, isDesktopScreen } = useMediaScreen();

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
                    height={250}
                    src={mainBannerLoading ? '' : banner.mobile}
                    width={360}
                  />
                </span>
              )}
              {!isMobileScreen && (
                <span className="fa-w-full fa-my-0 fa-mx-auto fa-hidden sm:fa-block">
                  <AsyncImage
                    loading="lazy"
                    className="fa-mx-auto fa-my-0 fa-text-gray-03"
                    alt="Farmauna Banner Desktop"
                    height={500}
                    src={mainBannerLoading ? '' : banner.desktop}
                    width={1920}
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
