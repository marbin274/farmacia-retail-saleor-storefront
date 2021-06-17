import { media, styled, defaultTheme } from "@styles";

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid ${defaultTheme.colors.aunaLightGray};
  background-color: white;
  z-index: 1;
  max-height: 8.5rem;

  ${media.smallScreen`
    max-height: 13rem;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    box-shadow: 0px -0.5rem 1rem rgb(0 0 0 / 8%);
  `}
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;

  ${media.smallScreen`
     flex-direction: column;
  `}
`;

export const ProductContent = styled.div`
  display: flex;

  ${media.smallScreen`
     margin-bottom: 1rem;
  `}
`;

export const ProductImg = styled.div`
  width: 5rem;
  height: 5rem;
  margin-right: 0.5rem;

  img {
    width: 5rem;
    height: 5rem;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ProductPrice = styled.div`
  display: flex;
  margin-top: 0.5rem;

  .price.discounted_price {
    font-size: 1.5rem;
    margin-right: 1rem;
    margin: 0 0.5rem 0 0;
  }

  .price.undiscounted_price {
    margin: 0;
  }

  div.price {
    font-size: 1.5rem;
    margin: 0;
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
        width: 7.75rem;
      }
   `}
`;
