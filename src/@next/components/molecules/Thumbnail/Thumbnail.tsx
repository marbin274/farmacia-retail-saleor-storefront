import React from "react";
import { maybe } from "@utils/misc";
import { PlaceholderImage } from "@components/atoms";
import { CachedImage } from "../";
import { IProps } from "./types";
import { ImageMagnifier } from "@farmacia-retail/farmauna-components";
import { useMediaScreen } from "@temp/@next/globalStyles";

export const Thumbnail: React.FC<IProps> = ({
  source,
  children,
  hasMagnifier,
  ...props
}: IProps) => {
  const { thumbnail, thumbnail2x } = source;

  if (!thumbnail && !thumbnail2x) {
    return <PlaceholderImage />;
  }

  const url = maybe(() => thumbnail!.url);
  const url2x = maybe(() => thumbnail2x!.url);
  const alt = maybe(() => (thumbnail!.alt ? thumbnail!.alt : ""), "");

  const { isMobileScreen } = useMediaScreen();

  if (hasMagnifier && !isMobileScreen) {
    return (
      <ImageMagnifier
        src={url! || url2x!}
        srcLarge={url2x || url}
        alt={alt}
      ></ImageMagnifier>
    );
  }

  return (
    <CachedImage {...props} url={url} url2x={url2x} alt={alt}>
      {children}
    </CachedImage>
  );
};
