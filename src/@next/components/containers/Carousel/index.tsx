import { largeScreen, smallScreen } from "@temp/@next/globalStyles/constants";
import NukaCarousel, { CarouselProps } from "nuka-carousel";
import * as React from "react";
import Media from "react-media";
import "./scss/index.scss";
import {ArrowRightIcon, ArrowLeftIcon, Button} from "@farmacia-retail/farmauna-components";

interface CarouselType extends CarouselProps {
  children: React.ReactNode;
}

export const Carousel: React.FC<CarouselType> = ({ children, ...rest }) => {
  const settings = {
    className: "carousel",
    renderBottomCenterControls: () => null,
    renderCenterLeftControls: ({ previousSlide, currentSlide }: any) =>
      currentSlide !== 0 ? (
        <div onClick={previousSlide}>
          <Button iconOnly={true} icon={<ArrowLeftIcon />} />
        </div>
      ) : (
        <div className='carousel__button fa-flex fa-h-10 fa-items-center fa-px-3'>    
          <ArrowLeftIcon />
        </div>
      ),
    renderCenterRightControls: ({
      nextSlide,
      currentSlide,
      slideCount,
      slidesToShow,
    }: any) => (
      slideCount - slidesToShow !== currentSlide && slideCount > slidesToShow ? (
        <div onClick={nextSlide}>
          <Button iconOnly={true} icon={<ArrowRightIcon />} />
        </div>
      ) :  (
        <div className='carousel__button fa-flex fa-h-10 fa-items-center fa-px-3'>
          <ArrowRightIcon />    
        </div>
      )
    ),
    ...rest,
  };

  const carousel = (slides: number, isMobile: boolean) => {
    const carouselSettings = { ...settings };
    if (isMobile) {
      carouselSettings.cellSpacing = 24;
      carouselSettings.slideWidth = 0.78;
      carouselSettings.cellAlign = 'center' ;
    } else {
      carouselSettings.cellSpacing = 16;
      carouselSettings.slideWidth = 1;
      carouselSettings.cellAlign = 'left' ;
    }
    return (
      <NukaCarousel slidesToShow={slides} slidesToScroll={slides} {...carouselSettings}>
        {children}
      </NukaCarousel>
    )
  };

  return (
    <Media query={{ maxWidth: smallScreen }}>
      {(matches: any) =>
        matches ? (
          carousel(1, true)
        ) : (
            <Media query={{ maxWidth: largeScreen }}>
              {(matches: any) => carousel(matches ? 2 : 4, false)}
            </Media>
          )
      }
    </Media>
  );
};
