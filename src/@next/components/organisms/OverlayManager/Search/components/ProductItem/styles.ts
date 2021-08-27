import { media, mediaUp, styled } from '@styles';
import { aunaDiscount } from '@temp/@next/globalStyles/constants';
import { customBreakpoint, size } from '../../styles';

export const ProductItemLi = styled.li`
  ${size};
  margin: 0;
  ${mediaUp.largeScreen`
    margin-bottom: 1.5rem;
  `}

  &:hover {
    border: 0.0625rem solid #00b0ca;

    @media (max-width: ${customBreakpoint}) {
      .search__products__item__side__name > span {
        color: #e6f6f9;
      }
    }
  }
`;

export const ProductItemSide = styled.div`
  grid-template-columns: 5.625rem 1fr;

  img {
    max-height: 4.625rem;
    width: auto;
    margin-top: auto;
    margin-bottom: auto;
    display: inline-block;
    vertical-align: top;
    margin-right: 0;
    margin-left: 0;

    ${mediaUp.largeScreen`
      margin-left: initial;
      margin-right: initial;
    `}
  }
`;

export const ProductItemNameWrapper = styled.div`
  margin-left: 0.313rem;

  ${media.largeScreen`
    margin-right: 0;
  `}
`;

export const ProductItemName = styled.span`
  height: 4.375rem;
  font-size: 0.844rem;
  line-height: normal;
  ${mediaUp.largeScreen`
    font-size: initial;
    height: 1.5rem;
  `}
`;

export const ProductItemCategory = styled.span`
  line-height: normal;
  font-size: 0.688rem;
  ${mediaUp.largeScreen`
    font-size: initial;
  `}
`;

export const ProductItemPrice = styled.span<{
  isOnSale: boolean;
  canAddToCart: boolean;
}>`
  > span {
    &:last-child {
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
      color: ${({ isOnSale, canAddToCart }) =>
        !canAddToCart ? '#9F9FA1' : isOnSale ? aunaDiscount : '#161536'};
      ${mediaUp.largeScreen`
        margin-left: 0.375rem;
    `}
    }
  }
`;

export const ProductItemActions = styled.div`
  .button {
    > button {
      border-radius: 2.75rem;
      span {
        font-size: 0.875rem;
      }
    }
  }
`;
