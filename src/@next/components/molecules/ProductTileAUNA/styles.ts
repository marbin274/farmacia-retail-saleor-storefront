import { mediaUp, styled, media } from "@styles";
import { aunaBlack, aunaGrey100 } from "@styles/constants";
import farmatheme from "@farmatheme";
import { Link } from "react-router-dom";

const productIntHeight = "18rem";

export const LinkContainer = styled(Link)`
  display: grid;
  grid-template-columns: 5.625rem 1fr;
  align-items: flex-start;
`;

export const ProductCard = styled.div<{
  canAddToCart?: boolean | 0 | undefined;
}>`
  color: ${aunaBlack};
  text-align: center;
  transition: 0 .3s;
  padding: 1rem;
  position: relative;
  ${mediaUp.largeScreen`
    background: #ffffff;
    padding: 2rem;
    border-radius: 1rem;
    &:hover {
      box-shadow: 0 0.5rem 1rem rgba(144, 139, 167, 0.2);
    }
  `}

  .img {
    width: auto;
    max-height: 10.625rem;
    max-width: 100%;
    align-items: center;
    display:flex;
    justify-content:center;
    vertical-align: middle;
    margin: 0 auto;
     img {
      width: auto;
      max-height: 10.625rem;
      max-width: 100%;
      vertical-align: middle;
      margin: auto;
      margin-top:8px;
    }
  }

  .description {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    line-height: 1.4;
    padding: 0.4rem 0;
    text-align: center;
    overflow: hidden;
    margin-bottom: 1.25rem;
    ${mediaUp.largeScreen`
      height: 5.3125rem;
    `}
  }

  .price {
    font-family: "Poppins", sans-serif;
    padding: 0.7rem 0rem 0rem 0rem;
    text-align: center;
    font-size: 1.125rem;
    font-weight: 600;

    &.undiscounted_price {
      text-decoration: line-through;
      color: ${farmatheme.theme.colors.neutral.dark};
      font-size: 0.875rem;
      font-weight: normal;
      display: inline-block;
      vertical-align: middle;
    }
  }

  .button {
    button {
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 23px;
      width: 7.688rem;
      height:48px;

      span {
        // font-size: 2rem;
      }
      :hover {
        border-color: transparent;
      }
      &:active {
        background: transparent !important;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
      }

      :focus {
        border-color: transparent;
      }

      :disabled {
        border-color: transparent;
        cursor: not-allowed;
      }
    }
  }

`;

export const Title = styled.h4``;

export const ProductAttribute = styled.h5`
  color: ${aunaGrey100};
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: normal;
  padding: 0.1rem 0;
  text-align: center;
`;

export const Price = styled.p`
  ${media.largeScreen`
  > span {
    font-size: 1rem !important;
    line-height: 120%;
    position: relative;
    &:before{
      content: "Precio";
      margin-right: 1rem;
      font-size: 0.75rem !important;
      font-weight: 500;
      color: ${farmatheme.theme.colors.neutral.medium};
      position: absolute;
      top: -1.25rem;
    }
  }
  `}
`;

export const Image = styled.div``;

export const AddToCartButton = styled.div``;

export const DisabledAddToCartButton = styled.div``;

export const WrapperStockout = styled.div`
  overflow: hidden;
  position: relative;
  height: ${productIntHeight};
  margin-bottom: 16px;
`;
