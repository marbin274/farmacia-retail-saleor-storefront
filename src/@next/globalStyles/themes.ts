import baseStyled, { ThemedStyledInterface } from "styled-components";

import * as C from "./constants";

export const defaultTheme = {
  breakpoints: {
    largeScreen: "992px",
    mediumScreen: "720px",
    smallScreen: "540px",
    xLargeScreen: "1280px",
    xxLargeScreen: "1600px",
    xxxLargeScreen: "1920px",
  },
  button: {
    animation: {
      transition: "0.3s",
    },
    colors: {
      primary: {
        activeBackground: C.theme.aunaInteractivePressed,
        aunaGray60: C.aunaGrey60,
        background: C.theme.aunaInteractive,
        color: C.white,
        disabledBackground: C.theme.aunaDisabledBackground,
        disabledColor: C.theme.aunaDisabled,
        hoverBackground: C.theme.aunaInteractiveHover,
        hoverColor: C.white,
      },
      secondary: {
        activeBackground: C.theme.aunaInteractivePressed,
        background: C.white,
        color: C.theme.aunaInteractive,
        disabledBackground: C.theme.aunaDisabledBackground,
        disabledColor: C.theme.aunaDisabled,
        hoverBackground: C.theme.white,
        hoverColor: C.theme.aunaInteractive,
        orangeAuna: C.theme.aunaOrange,
      },
    },
    padding: {
      main: "0.9rem 3.7rem",
      small: "0.9rem 1rem",
    },
    typography: {
      fontSize: "1.125rem",
      fontWeight: "600",
      lineHeight: "1.25rem",
      smallFontSize: "1rem",
      textTransform: "uppercase",
    },
  },
  carousel: {
    carouselControlPadding: "0.2rem 0.5rem",
    carouselControlShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
  },
  chip: {
    colors: {
      primary: {
        activeBackground: C.theme.primaryTransparent,
        background: C.theme.primaryLight,
        color: C.theme.primaryDark,
        hoverBackground: "none",
        hoverColor: C.theme.primaryDark,
      },
      secondary: {
        activeBackground: C.theme.primaryTransparent,
        background: C.theme.secondaryLight,
        color: C.theme.secondaryDark,
        hoverBackground: "none",
        hoverColor: C.theme.secondaryDark,
      },
    },
    typography: {
      fontSize: "1rem",
      smallFontSize: "0.75rem",
    },
  },
  colors: {
    ...C.theme,
  },
  container: {
    width: 1140,
  },
  dropdown: {
    backgroundColor: C.theme.white,
    boxShadow: "0px 6px 10px 0px rgba(0, 0, 0, 0.15)",
  },
  grid: {
    containerWidth: 1140,
  },
  iconButton: {
    backgroundColor: C.theme.white,
    hoverBackgroundColor: C.theme.secondary,
    hoverForegroundColor: C.theme.white,
    size: 36,
  },
  input: {
    borderColor: C.aunaGrey60,
    borderColorActive: C.aunaInteractive,
    borderColorError: C.aunaError,
    borderRadius: '4px',
    errorFontSize: "12px",
    labelColor: C.aunaGrey100,
    labelColorActive: C.aunaGrey100,
    labelColorError: C.aunaGrey100,
    labelFontSize: "0.9rem",
    labelLeft: '0px',
    labelTop: '-1.5rem',
    placeholderColor: C.aunaGrey100,
    selectMenuShadow: "0px 6px 10px 0px rgba(0, 0, 0, 0.15)",
    textColor: C.aunaBlack,
    textColorActive: C.aunaBlack,
    textColorError: C.aunaError,
    textColorHover: C.aunaGrey60,
    textFontSize: '0.9rem',
    topPadding: '1.4rem',
  },
  link: {
    base: {
      color: C.gray,
      hoverColor: C.grayMedium,
    },
    secondary: {
      color: C.blue,
      hoverColor: C.blueLight,
    },
  },
  message: {
    backgroundColor: C.white,
    contentMargin: `${C.spacer}rem 0 0`,
    letterSpacing: "0.5px",
    padding: "1rem 1.5rem",
    titleMargin: `0 ${C.spacer * 1.5}rem 0 0`,
    titleTransform: "uppercase",
    titleWeight: C.extraBoldFontWeight,
    width: "25rem",
  },
  modal: {
    modalMinHeight: 455,
    modalWidth: 555,
  },
  productItem: {
    productItemCategoryColor: C.gray,
    productItemPriceFontWeight: C.boldFontWeight,
    productItemPriceMargin: `${C.spacer}rem 0 0`,
    productItemTitleFontWeight: C.boldFontWeight,
    productItemTitleHeight: "2.5rem",
    productItemTitleMargin: `${C.spacer / 2}rem 0 0`,
    productItemTitleTextTransform: "uppercase",
  },
  spacing: {
    /**
     * 30px in default theme
     */
    fieldSpacer: C.fieldSpacer,
    /**
     * 30px in default theme
     */
    gutter: "1.875rem",
    /**
     * 16px in default theme
     */
    spacer: `${C.spacer}rem`,
  },
  tile: {
    backgroundColor: C.grayLight,
    divisionLine: C.grayMedium,
    hoverBorder: C.blueDark,
  },
  typography: {
    baseFontFamily: C.baseFontFamily,
    /**
     * 16px in default theme
     */
    baseFontSize: C.baseFontSize,
    /**
     * 20px in default theme
     */
    baseFontSizeSmall: C.baseFontSizeSmall,
    baseLineHeight: C.baseLineHeight,
    bigFontSize: C.bigFontSize,
    boldFontWeight: C.boldFontWeight,
    extraBoldFontWeight: C.extraBoldFontWeight,
    /**
     * 64px in default theme
     */
    h1FontSize: C.h1FontSize,
    h1LineHeight: C.h1LineHeight,
    /**
     * 48px in default theme
     */
    h2FontSize: C.h2FontSize,
    /**
     * 24px in default theme
     */
    h3FontSize: C.h3FontSize,
    /**
     * 18px in default theme
     */
    h4FontSize: C.h4FontSize,
    labelFontSize: C.labelFontSize,
    /**
     * 400 in default theme
     */
    normalFontWeight: C.normalFontWeight,
    /**
     * 14px in default theme
     */
    smallFontSize: C.smallFontSize,
    smallFontWeight: C.smallFontWeight,
    sparseLineHeight: C.sparseLineHeight,
    /**
     * 96px in default theme
     */
    ultraBigFontSize: C.ultraBigFont,
  },
};

export type DefaultTheme = typeof defaultTheme;
export const styled = baseStyled as ThemedStyledInterface<DefaultTheme>;