import { largeScreen, smallScreen } from "@temp/@next/globalStyles/constants";
import NukaCarousel, { CarouselProps } from "nuka-carousel";
import * as React from "react";
import Media from "react-media";
import "./scss/index.scss";

interface CarouselType extends CarouselProps {
  children: React.ReactNode;
}

export const BannerCarousel: React.FC<CarouselType> = ({ children, ...rest }) => {

  const settings = {
    className: "carousel",
    renderBottomCenterControls: () => true,
    renderCenterLeftControls: () => false,
    renderCenterRightControls: () => false,
    ...rest,
  };

  const carousel = (slides: number) => (
    <NukaCarousel slidesToShow={slides} slidesToScroll={slides}  autoplay={true} pauseOnHover={true} {...settings} >
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
              {(matches: any) => carousel(1)}
            </Media>
          )
      }
    </Media>
  );
};
