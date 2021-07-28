import NukaCarousel, { CarouselProps } from "nuka-carousel";
import * as React from "react";
import * as S from "./styles";

interface CarouselType extends CarouselProps {
  children: React.ReactNode;
}

export const BannerCarousel: React.FC<CarouselType> = ({
  children,
  ...rest
}) => {
  const settings = {
    className: "carousel",
    renderBottomCenterControls: () => true,
    renderCenterLeftControls: () => false,
    renderCenterRightControls: () => false,
    ...rest,
  };

  const carousel = (slides: number) => (
    <S.BannerCarouselWrapper>
      <NukaCarousel
        slidesToShow={slides}
        slidesToScroll={slides}
        autoplay={true}
        pauseOnHover={true}
        {...settings}
      >
        {children}
      </NukaCarousel>
    </S.BannerCarouselWrapper>
  );

  return carousel(1);
};
