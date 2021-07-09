import { css } from "styled-components";
import { media, mediaUp } from "./media";
import farmatheme from "@farmatheme";
import { containerWidth, spacer } from "./constants";

export const CollectionStyle = css`
  background-color: ${farmatheme.theme.colors.neutral.light};
  display: flex;
  flex-direction: column;

  ${mediaUp.largeScreen`
    .products_found {
      margin: 0 !important;
    }
  `}

  ${media.largeScreen`
    .product_list_header__right_side {
      border-bottom: 0.0625rem solid #d3d7e5;
      display: flex;
      flex-direction: column-reverse;
      .products_found,
      .product_list_header__dropdown {
        margin-top: 0 !important;
      }
    }
    .products_found {
      display: none;
    }
  `}


  .collection-container-breadcrumbs {
    background-color: ${farmatheme.theme.colors.neutral.light};
    margin: 0 auto;
    max-width: 100vw;
    position: sticky;
    top: 5rem;
    width: ${containerWidth};
    z-index: 3;

    ${mediaUp.largeScreen`
      padding: 1.5rem 1rem;
      position: initial;
      z-index: 0;
    `};
  }
  .collection-container {
    margin: 0 auto;
    max-width: 100vw;
    padding: 0 1rem;
    width: ${containerWidth};

    ${mediaUp.smallScreen`
      justify-content: center;
    `}
  }

  .collection-body {
    align-items: flex-start;
    display: flex;
    margin-top: 0;

    ${media.smallScreen`
      align-items: center;
      flex-direction: column;
      justify-content: center;
    `}

    ${media.largeScreen`
      padding: 0;
    `}

    .breadcrumbs {
      display: none;
    }
  }
  .collection-products {
    margin-bottom: 1.875rem;
    margin-left: 0;
    width: 100%;
    z-index: 0;

    ${mediaUp.largeScreen`
      margin-left: 1.5rem;
      width: 50rem;
    `}

    ${media.largeScreen`
      .home-page__product {
        background-color: ${farmatheme.theme.colors.neutral.lightest};
        padding: 1rem;
      }
    `}
  }
`;

export const ContainerStyle = css`
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  padding: 0 ${spacer}rem;

  ${mediaUp.largeScreen`
    width: ${containerWidth};
   `}
`;
