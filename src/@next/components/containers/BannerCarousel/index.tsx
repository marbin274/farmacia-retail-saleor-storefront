import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@farmacia-retail/farmauna-components';
import { useMediaScreen } from '@temp/@next/globalStyles';
import classNames from 'classnames';
import NukaCarousel, { CarouselProps } from 'nuka-carousel';
import * as React from 'react';
import * as S from './styles';
import farmatheme from '@farmatheme';

interface CarouselType extends CarouselProps {
  children: React.ReactNode;
}

export const BannerCarousel: React.FC<CarouselType> = ({
  autoplay,
  children,
  wrapAround = true,
  ...rest
}) => {
  const { isMobileScreen } = useMediaScreen();
  const settings: CarouselProps = {
    className: 'banner-carousel',
    renderBottomCenterControls: ({ currentSlide, goToSlide, slideCount }) =>
      slideCount === 1 ? null : (
        <div className="fa-flex fa-relative fa-top-6">
          {[...Array(slideCount)].map((_, index) => (
            <S.ControlCenter
              key={index}
              className={classNames(
                'fa-h-2.5 fa-rounded-md fa-mx-2 fa-cursor-pointer',
                {
                  'fa-w-5 fa-bg-highlight-medium': currentSlide === index,
                  'fa-w-2.5 fa-bg-neutral-medium': currentSlide !== index,
                }
              )}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      ),
    renderCenterLeftControls: ({
      goToSlide,
      previousSlide,
      currentSlide,
      slideCount,
    }) =>
      isMobileScreen || slideCount === 1 ? null : (
        <div
          onClick={
            currentSlide !== 0 ? previousSlide : () => goToSlide(slideCount - 1)
          }
        >
          <S.ControlSide
            color={farmatheme.theme.colors.neutral.lightest}
            iconOnly
            icon={
              <ArrowLeftIcon color={farmatheme.theme.colors.neutral.darkest} />
            }
          />
        </div>
      ),
    renderCenterRightControls: ({
      currentSlide,
      goToSlide,
      nextSlide,
      slideCount,
      slidesToShow,
    }) => {
      const existNextSlide =
        slideCount - slidesToShow !== currentSlide && slideCount > slidesToShow;
      return isMobileScreen || slideCount === 1 ? null : (
        <div onClick={existNextSlide ? nextSlide : () => goToSlide(0)}>
          <S.ControlSide
            color={farmatheme.theme.colors.neutral.lightest}
            iconOnly
            icon={
              <ArrowRightIcon color={farmatheme.theme.colors.neutral.darkest} />
            }
          />
        </div>
      );
    },
    ...rest,
  };

  const carousel = (slides: number) => (
    <S.BannerCarouselWrapper>
      <NukaCarousel
        autoplay={autoplay}
        autoplayInterval={5000}
        slidesToShow={slides}
        slidesToScroll={slides}
        pauseOnHover={true}
        wrapAround={wrapAround}
        {...settings}
      >
        {children}
      </NukaCarousel>
    </S.BannerCarouselWrapper>
  );

  return carousel(1);
};
