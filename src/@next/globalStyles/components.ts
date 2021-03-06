import styled, { css } from "styled-components";
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
    z-index: 2;

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

export const CustomSelectContainer = styled.div`
  .select-input {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 0;
    width: 100%;
    ${mediaUp.smallScreen`
      justify-content: flex-end;
    `}
    .label {
      color: ${farmatheme.theme.colors.neutral.darkest};
    }    
  }

  .select-container { 
    align-items: center;
    background: #FFFFFF;
    border: 0.0625rem solid #908BA7;
    border-radius: 2.5rem;
    cursor: pointer;
    display:flex;
    justify-content: flex-start;
    justify-content: space-between;
    position:relative;
    z-index: 0; 
    ${mediaUp.largeScreen`
      z-index: 1; 
    `}
  }

  div[class*="menu"] {
    border-bottom-left-radius: 1.25rem;
    border-bottom-right-radius: 1.25rem;
    margin-top: -1.25rem;
    padding-top: 1.25rem;
    z-index: -1; 
    ${mediaUp.largeScreen`
      z-index: 0; 
    `}
  }
  .dropdown-select {
    > div {
      margin: 0;
      padding: 0;
    }
    .select-control {
      display: flex;
      justify-content: flex-end;
      margin: 0;
      padding: 0;
      ${mediaUp.smallScreen`
        display: block;
        justify-content: initial;
      `}
    }
  }
`;
