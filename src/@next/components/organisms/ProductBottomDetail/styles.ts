import { media, styled, mediaUp, ContainerStyle } from '@styles';
import farmatheme from '@farmatheme';

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
  `}

  ${media.smallScreen`
    max-height: 10rem;
  `}
`;

export const ContainerWrapper = styled.div`
  ${ContainerStyle};
  margin: 0;

  ${mediaUp.smallScreen`
    margin: 0 auto; 
  `}
  ${mediaUp.mediumScreen`
      display: flex;  
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
  height: 4rem;
  margin-right: 0.25rem;
  width: 4rem;

  img {
    height: 4rem;
    width: 4rem;
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
      align-items:center;
      display:flex;
      justify-content: space-between;
      margin-top:0.938rem;

      .itemHandler{
        .itemHandler--actions {
          height: 2.5rem;
          width: 7rem;
        }
        .itemHandler__limit-max {
          font-size: 0.625rem !important;
        }
      }
    
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

  ${media.smallScreen`
    margin-right: 0.4rem;
  `};

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
  .price.outStock_price {
    ${media.smallScreen`
      > span {
        font-size: 1rem;
        line-height: 120%;
        position: relative;
        &::before {
          content: "Precio" !important;
          color: #aca8bd;
          font-size: 0.75rem;
          font-weight: normal;
          left: 0;
          position: absolute;
          top: -1.3rem;
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
        text-decoration: line-through !important;

        &:before{
          content: "Antes";
          margin-right: 1rem;
          font-size: 0.75rem;
          display: inline-block;
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
