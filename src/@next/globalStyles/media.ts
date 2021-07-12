import { useMediaQuery } from "react-responsive";
import { css } from "styled-components";
import {
  largeScreen,
  mediumScreen,
  smallScreen,
  xLargeScreen,
  xSmallScreen,
  xxSmallScreen, 
  xxLargeScreen,
  xxxLargeScreen
} from "./constants";


const breakpoints = {
  largeScreen,
  mediumScreen,
  smallScreen,
  xLargeScreen,
  xSmallScreen,
  xxSmallScreen,
  xxLargeScreen,
  xxxLargeScreen,
  
};

type Breakpoints = keyof typeof breakpoints;
type Media = Record<
  Breakpoints,
  (l: TemplateStringsArray, ...p: any[]) => string
>;

export const useMediaScreen = (screen?: string) => {

  const isDesktopScreen = useMediaQuery({
    query: `(min-width: ${mediumScreen}px)`,
  });
  
  const isCustomMaxScreen = useMediaQuery({
    query: `(max-width: ${screen}px)`,
  });

  const isCustomMinScreen = useMediaQuery({
    query: `(min-width: ${screen}px)`,
  });

  const isMaxLargeScreen = useMediaQuery({
    query: `(max-width: ${largeScreen}px)`,
  });

  const isMobileScreen = useMediaQuery({
    query: `(max-width: ${smallScreen}px)`,
  });
  

  return {
    isDesktopScreen,
    isCustomMaxScreen,
    isCustomMinScreen,
    isMaxLargeScreen,
    isMobileScreen,
  };
}

export const media = Object.keys(breakpoints).reduce(
  (acc, label) => {
    acc[label as Breakpoints] = (
      literals: TemplateStringsArray,
      ...placeholders: any[]
    ) =>
      css`
        @media (max-width: ${breakpoints[label as Breakpoints]}px) {
          ${css(literals, ...placeholders)}
        }
      ` as any;
    return acc;
  },
  // tslint:disable-next-line:no-object-literal-type-assertion
  {} as Media
);

export const mediaUp = Object.keys(breakpoints).reduce(
  (acc, label) => {
    acc[label as Breakpoints] = (
      literals: TemplateStringsArray,
      ...placeholders: any[]
    ) =>
      css`
        @media (min-width: ${breakpoints[label as Breakpoints]}px) {
          ${css(literals, ...placeholders)}
        }
      ` as any;
    return acc;
  },
  // tslint:disable-next-line:no-object-literal-type-assertion
  {} as Media
);
