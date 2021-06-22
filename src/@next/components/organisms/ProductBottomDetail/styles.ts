import { media, styled, mediaUp } from "@styles";
import farmatheme from "@farmatheme";

export const Container = styled.div`
  position: fixed;
  bottom: -0.063rem;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 1;
  max-height: 8.5rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  box-shadow: 0px -0.5rem 1rem rgb(0 0 0 / 8%);

  ${mediaUp.mediumScreen`
    min-height: 7rem;
    .container {
      display: flex;  
    }
  `}

  ${media.smallScreen`
    max-height: 10rem;

    .container {
      margin:0 !important;
    }
  `}
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;

  ${mediaUp.mediumScreen`
    min-width: 38.5rem;
    margin: auto;
  `}

  ${media.smallScreen`
     flex-direction: column;
     padding:0;
  `}
`;

export const ProductContent = styled.div`
  display: flex;
  align-items: center;

  ${media.smallScreen`
     padding: 1.5rem 0;
  `}
`;

export const ProductImg = styled.div`
  width: 4rem;
  height: 4rem;
  margin-right: 0.5rem;

  img {
    width: 5rem;
    height: auto;
  }

  ${mediaUp.mediumScreen`
    margin-right: 2rem;
  `}
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;

  ${media.smallScreen`
    width: calc(100% - 5.5rem);

    .inline-element {
      display:flex;
      justify-content: space-between;
      align-items:center;
      margin-top:0.938rem;
    }
  `}

  ${mediaUp.mediumScreen`
    width: 21.875rem;
    margin-right: 3.5rem;
  `}
`;

export const ProductName = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.875rem;
  line-height: 120%;
  font-weight: 500;
  ${media.smallScreen`
    color:${farmatheme.theme.colors.neutral.darkest}
  `}
`;

export const ProductPrice = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;

  div.price {
    font-size: 1.5rem;
    margin: 0;
    ${mediaUp.mediumScreen`
      > span {
        font-size: 1rem !important;
        line-height: 120%;

        &:before{
          content: "Precio";
          margin-right: 1rem;
          font-size: 0.75rem !important;
          font-weight: 500;
          color: ${farmatheme.theme.colors.neutral.medium};
        }
      }
    `}
  }
  .price.discounted_price {
    font-size: 1.5rem;
    margin-right: 1rem;
    margin: 0 0.5rem 0 0;
    ${mediaUp.mediumScreen`
      > span {
        font-size: 1rem !important;
        line-height: 120%;

        &:before{
          content: "Precio";
          margin-right: 1rem;
          font-size: 0.75rem !important;
          font-weight: 500;
          color: ${farmatheme.theme.colors.neutral.medium};
        }
      }
    `}
  }

  .price.undiscounted_price {
    margin: 0;
    ${mediaUp.mediumScreen`
      text-decoration: none !important;
      > span {
        font-size: 0.875rem;
        line-height: 120%;

        &:before{
          content: "Antes";
          margin-right: 1rem;
          font-size: 0.75rem;
          color: ${farmatheme.theme.colors.neutral.medium};
        }
      }
    `}
  }

  .product-description__error-message {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const CartContent = styled.div`
  display: flex;
  flex: 0 0 auto;
  margin-left: 2.5rem;
  min-width: 12rem;

  .itemHandler {
    width: 100%;
  }

  .itemHandler--actions {
    height: 3rem;
  }

  ${media.smallScreen`
      width: auto;
      margin-left: 5.5rem;

      .button {
        width: 7.75rem;
      }

      button {
        width: 7.188rem;

      }
   `}
`;
