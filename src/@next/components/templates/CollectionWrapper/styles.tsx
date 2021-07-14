import { media, mediaUp, styled } from "@temp/@next/globalStyles";

export const Wrapper = styled.div`
  .product_found {
    ${mediaUp.mediumScreen`
      margin: 0 !important;
    `}
  }

  ${media.mediumScreen`
    .product_list_header__right_side {
      border-bottom: 0.0625rem solid #d3d7e5;
      display: flex;
      flex-direction: column-reverse;
      
      .products_found, .product_list_header__dropdown {
        margin-top: 0 !important;
      }
    }
    .products_found {
        display: none;
    }
  `};
`;
