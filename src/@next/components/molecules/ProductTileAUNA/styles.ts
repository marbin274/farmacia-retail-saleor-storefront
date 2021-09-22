import farmatheme from '@farmatheme';
import { media, mediaUp, styled } from '@styles';
import { aunaBlack, aunaGrey100 } from '@styles/constants';

const productIntHeight = '18rem';

export const LinkContainer = styled.div`
  align-items: flex-start;
  cursor: pointer;
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: 5.625rem 1fr;
`;

export const ProductCard = styled.div<{
  canAddToCart?: boolean | 0 | undefined;
}>`
  color: ${aunaBlack};
  padding: 1rem;
  position: relative;
  text-align: center;
  transition: 0 0.3s;
  ${mediaUp.largeScreen`
    background: #ffffff;
    border-radius: 1rem;
    padding: 2rem;
    &:hover {
      box-shadow: 0 0.5rem 1rem rgba(144, 139, 167, 0.2);
    }
  `}

  .img {
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    max-height: 10.625rem;
    max-width: 100%;
    vertical-align: middle;
    width: auto;
    img {
      margin: auto;
      margin-top: 8px;
      max-height: 10.625rem;
      max-width: 100%;
      vertical-align: middle;
      width: auto;
    }
  }

  .description {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 1.25rem;
    overflow: hidden;
    padding: 0.4rem 0;
    text-align: center;
    ${mediaUp.largeScreen`
      height: 5.3125rem;
    `}
  }

  .price {
    font-family: 'Poppins', sans-serif;
    font-size: 1.125rem;
    font-weight: 600;
    padding: 0.7rem 0rem 0rem 0rem;
    text-align: center;

    &.discounted_price {
      margin-right: 0;
    }
    &.undiscounted_price {
      color: ${farmatheme.theme.colors.neutral.dark};
      display: inline-block;
      font-size: 0.875rem;
      font-weight: normal;
      margin-left: 1rem;
      text-decoration: line-through;
      vertical-align: middle;
    }
  }

  .button {
    button {
      border-radius: 1.4375rem;
      cursor: pointer;
      height: 2.5rem;

      ${mediaUp.largeScreen`
        height: 3rem;
        padding: 0.5rem;
      `}

      &:active {
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        background: transparent !important;
        box-shadow: none;
      }
    }
  }
  .itemHandler--actions {
    height: 2.5rem;
    width: 7rem;

    ${mediaUp.largeScreen`
      width: 8rem;
      height: 3rem;
    `}
  }
`;

export const Title = styled.h4``;

export const ProductAttribute = styled.h5`
  color: ${aunaGrey100};
  font-family: 'Poppins', sans-serif;
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
      color: ${farmatheme.theme.colors.neutral.medium};
      content: "Precio";
      font-size: 0.75rem !important;
      font-weight: 500;
      margin-right: 1rem;
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
  height: ${productIntHeight};
`;
