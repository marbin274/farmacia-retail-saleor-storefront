import { largeScreen, smallScreen } from "@temp/@next/globalStyles/constants";
import arrowImg from "@temp/images/carousel-arrow.svg";
import NukaCarousel, { CarouselProps } from "nuka-carousel";
import * as React from "react";
import Media from "react-media";
import ReactSVG from "react-svg";
import "./scss/index.scss";

interface CarouselType extends CarouselProps {
  children: React.ReactNode;
}

export const Carousel: React.FC<CarouselType> = ({ children, ...rest }) => {
  const settings = {
    className: "carousel",
    renderBottomCenterControls: () => null,
    renderCenterLeftControls: ({ previousSlide, currentSlide }: any) =>
      currentSlide !== 0 ? (
        <div
          onClick={previousSlide}
          className="carousel__control carousel__control--left"
        >
          <ReactSVG path={arrowImg} />
        </div>
      ) : null,
    renderCenterRightControls: ({
      nextSlide,
      currentSlide,
      slideCount,
      slidesToShow,
    }: any) =>
      slideCount - slidesToShow !== currentSlide ? (
        <div
          onClick={nextSlide}
          className="carousel__control carousel__control--right"
        >
          <ReactSVG path={arrowImg} />
        </div>
      ) : null,
    ...rest,
  };
  const carousel = (slides: number) => (
    <NukaCarousel slidesToShow={slides} slidesToScroll={slides} {...settings}>
      {children}
    </NukaCarousel>
  );

  return (
    <Media query={{ maxWidth: smallScreen }}>
      {(matches: any) =>
        matches ? (
          carousel(1)
        ) : (
            <Media query={{ maxWidth: largeScreen }}>
              {(matches: any) => carousel(matches ? 2 : 4)}
            </Media>
          )
      }
    </Media>
  );
};
