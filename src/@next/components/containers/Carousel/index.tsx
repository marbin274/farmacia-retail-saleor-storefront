import { CarouselProps } from "nuka-carousel";
import * as React from "react";
import { useMediaScreen } from "@temp/@next/globalStyles";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  Button,
} from "@farmacia-retail/farmauna-components";
import { useIsNearScreen } from "@temp/@next/hooks";
import * as S from "./styles";

interface CarouselType extends CarouselProps {
  children: React.ReactNode;
}

export const Carousel: React.FC<CarouselType> = ({ children, ...rest }) => {
  const { isNearScreen, fromRef } = useIsNearScreen();
  const settings: CarouselProps = {
    className: "carousel",
    renderBottomCenterControls: () => null,
    renderCenterLeftControls: ({ previousSlide, currentSlide }) =>
      currentSlide !== 0 ? (
        <div onClick={previousSlide}>
          <Button iconOnly icon={<ArrowLeftIcon />} />
        </div>
      ) : (
        <div>
          <Button iconOnly disabled icon={<ArrowLeftIcon />} />
        </div>
      ),
    renderCenterRightControls: ({
      nextSlide,
      currentSlide,
      slideCount,
      slidesToShow,
    }) =>
      slideCount - slidesToShow !== currentSlide &&
        slideCount > slidesToShow ? (
        <div onClick={nextSlide}>
          <Button iconOnly icon={<ArrowRightIcon />} />
        </div>
      ) : (
        <div>
          <Button iconOnly disabled icon={<ArrowRightIcon />} />
        </div>
      ),
    ...rest,
  };

  const carousel = (slides: number, isMobile: boolean) => {
    const carouselSettings: CarouselProps = { ...settings };
    if (isMobile) {
      carouselSettings.cellSpacing = 24;
      carouselSettings.slideWidth = 0.78;
      carouselSettings.cellAlign = "center";
    } else {
      carouselSettings.cellSpacing = 16;
      carouselSettings.slideWidth = 1;
      carouselSettings.cellAlign = "left";
    }
    return (
      <S.NukaCarouselStyled
        slidesToShow={slides}
        slidesToScroll={slides}
        {...carouselSettings}
      >
        {children}
      </S.NukaCarouselStyled>
    );
  };
  const { isDesktopScreen, isMobileScreen } = useMediaScreen();
  return (
    <div ref={fromRef}>
      {isNearScreen &&
        (isMobileScreen
          ? carousel(1, true)
          : carousel(isDesktopScreen ? 4 : 2, false))}
    </div>
  );
};
