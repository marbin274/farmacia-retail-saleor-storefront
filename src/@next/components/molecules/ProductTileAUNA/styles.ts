import { media, styled } from "@styles";
import { aunaBlack, aunaGrey100, aunaInteractive } from "@styles/constants";

export const ProductCard = styled.div<{
  quantityAvailable?: number | undefined;
  quantityOrdered?: number | undefined;
}>`
  color: ${aunaBlack}
  background: inherit;
  height: 24rem;
  text-align: center;
  transition: 0 .3s;
  max-width: 11rem;
  position: relative;
  margin-bottom: 1.5rem;
  :hover {
    translate-Y: -.1rem;
  }

  .img {
    width: auto;
    height: 176px;
    max-width: 100%;
    vertical-align: middle;
     img {
      width: auto;
      height: auto;
      max-width: 100%;
      vertical-align: middle;
    }
  }

  .description {
    font-family: "Poppins", sans-serif;
    font-size: 1.2rem;
    height: 35%;
    font-weight: normal;
    line-height: 1.4;
    padding: 0.4rem 0;
    text-align: center;
    overflow: hidden;
  }
  

  .price {
    font-family: "Poppins", sans-serif;
    font-size: 1.5rem;
    font-weight: normal;
    padding: 0.7rem 0;
    text-align: center;
  }

  .button {
    ${({ quantityAvailable, quantityOrdered }) =>
      (quantityAvailable &&
        quantityAvailable > 0 &&
        quantityOrdered === undefined) ||
      (quantityOrdered && quantityOrdered < 50)
        ? `border-bottom: 1px solid ${aunaInteractive}`
        : `border-bottom: 1px solid #B8BCD5`}
    padding-bottom: 0.5rem;
    button {
      background: transparent;
      color: ${aunaInteractive}
      border: solid 1px transparent;
      cursor: pointer;
      width: 20%;
      padding: 0.5rem 0.5rem 0rem 0.35rem;
      border-radius: 6px;

      span {
        font-size: 2rem;
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
        color: #B8BCD5;
        border-color: transparent;
        cursor: not-allowed;
      }

    }
  }

  ${media.largeScreen`
  `}
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

export const Price = styled.p``;

export const Image = styled.div``;

export const AddToCartButton = styled.div``;

export const DisabledAddToCartButton = styled.div``;
