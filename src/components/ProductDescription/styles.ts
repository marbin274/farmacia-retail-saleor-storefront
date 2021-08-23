import { mediaUp, styled } from '@styles';
import { css } from 'styled-components';

const priceStyle = css`
  color: #727171;
  font-size: 0.875rem;
  font-weight: 400;
  margin-bottom: 1.75rem;
`;

export const ProductDescriptionWrapper = styled.div`
  ${mediaUp.largeScreen`
    -ms-overflow-style: none;
    scrollbar-width: none;
    &:-webkit-scrollbar {
      display: none;
    }
  `}

  > div {
    > p,
    ul {
      ${priceStyle}
      margin-bottom: 0 !important;
    }
  }

  .price {
    font-size: 1.5rem;
    margin: 1.5rem auto;

    &.discounted_price {
      span,
      p {
        font-size: 1rem;
        position: relative;
        &::before {
          position: absolute;
          content: 'Precio';
          color: #aca8bd;
          font-size: 0.75rem;
          left: 0;
          top: -1.688rem;
          font-weight: normal;
        }

        ${mediaUp.smallScreen`
          font-size: 1.5rem;
          &::before {
            display: none;
          }
        `}
      }
    }
    &.undiscounted_price {
      span {
        font-size: 0.875rem;
        position: relative;
        &::before {
          position: absolute;
          content: 'Antes';
          color: #aca8bd;
          font-size: 0.75rem;
          left: 0;
          top: -1.688rem;
          font-weight: normal;
        }

        ${mediaUp.smallScreen`
          &::before {
            display: none;
          }
        `}
      }
    }
    &.outStock_price {
      span {
        font-size: 1rem;
        line-height: 1.875rem;
        font-weight: 600;
        position: relative;
        &::before {
          position: absolute;
          content: 'Precio';
          color: #aca8bd;
          font-size: 0.75rem;
          left: 0;
          top: -1.688rem;
          font-weight: normal;
        }

        ${mediaUp.smallScreen`
          font-size: 1.5rem;
          line-height: normal;
          &::before {
            display: none;
          }
        `}
      }
    }
  }
`;

export const ProductName = styled.h3`
  max-width: 22.5rem;
  margin-bottom: 0.688rem;
  color: #2f2c3a;
  line-height: 1.75rem;
  ${mediaUp.smallScreen`
    line-height: 1.875rem;
  `}
`;

export const VariantPickerWrapper = styled.div`
  .react-select-wrapper,
  .input {
    width: 50%;
    margin-bottom: 1rem;
  }

  .product-description__variant-picker__quantity {
    display: flex;

    .input {
      margin-left: $spacer * 2;
      max-width: 6rem;

      .input__field {
        max-width: 100%;
      }
    }
  }
`;

export const ProductQuantityWrapper = styled.div`
  .itemHandler {
    width: 100% !important;
    max-width: 9.375rem;
    align-items: flex-start;
  }
  .button {
    width: 100% !important;
    max-width: 9.375rem;
  }

  > div {
    margin-right: 0.625rem;
    min-width: 7rem;
  }

  > p {
    ${priceStyle}
    margin-bottom: 0.75rem !important;
  }
`;
