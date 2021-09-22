import { media, styled } from '@styles';
import { white } from '@styles/constants';
import farmatheme from '@farmatheme';

export const ProductCard = styled.div<{
  canAddToCart?: boolean | 0 | undefined;
}>`
  position: relative;
  height: 9rem;
  width: 100%;
  background-color: ${white};
  padding: 1.25rem;
  margin-bottom: 1rem;
  border-radius: 1.5rem;

  ${media.largeScreen`
    height: 8.125rem;
    padding: 0.5rem;
    border-bottom: 0.063rem solid #D3D7E5;
    border-radius:0;
    &:last-child {
      border-bottom:0;
    }
  `}

  &:last-child {
    margin-bottom: 0;
  }
`;

export const WrapperImage = styled.div`
  display: inline-block;
  border-radius: 1.25rem;
  background-color: ${white};
  width: 8rem;
  height: auto;
  vertical-align: top;
  position: relative;

  ${media.largeScreen`
    width: 4.5rem;
    height: 4.5rem;
  `}

  .img {
    display: flex;
    height: 100%;
    margin: auto;

    img {
      align-items: center;
      height: 7.5rem;

      ${media.largeScreen`
       height: auto;
  `}
    }
  }
`;

export const WrapperDetail = styled.div`
  display: inline-block;
  width: calc(100% - 8.875rem);
  margin-left: 0.5rem;
  vertical-align: top;
  padding-top: 0;

  ${media.largeScreen`
    width: calc(100% - 5rem);
    padding-top:0;
  `}
`;

export const ProductTitle = styled.h3`
  width: 100%;
  height: 3rem;
  color: #2f2c3a;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.5rem !important;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.largeScreen`
    -webkit-line-clamp: 3;
    height: 3.125rem;
    overflow:hidden;
    margin-bottom:1rem;
    font-size: 0.875rem;
  `}
`;

export const ProductPrice = styled.div`
  margin-top: 0.7rem !important;

  .price {
    display: inline-block;
    margin: 0 1rem 0 0;

    ${media.largeScreen`
      margin-right: 0;
  `}

    span {
      font-size: 1.25rem;
      font-weight: 600;
      color: ${farmatheme.theme.colors.neutral.darkest};
    }

    ${media.largeScreen`
      p {
        margin: 0 0 0 0;
      }
      span {
        font-size: 0.75rem;
      }
  `}
  }
  .undiscounted_price {
    text-decoration: none !important;
    vertical-align: top !important;
    span {
      font-size: 1.25rem !important;
      ${media.largeScreen`
        font-size: 0.75rem !important;
        color: ${farmatheme.theme.colors.neutral.dark};
  `}
      font-weight: 400;
      text-decoration: line-through;
    }
  }

  ${media.largeScreen`
    display: flex;
    justify-content: space-between;
  `}
`;

export const ProductTitlePrice = styled.p`
  margin: 0;
  margin-bottom: 0.5rem;
  font-size: 0.75rem !important;
  line-height: 0.75rem !important;
  color: #aca8bd !important;
  font-weight: normal !important;
`;

export const WrapperItemHandler = styled.div`
  position: absolute;
  top: 5.25rem;
  right: 1.25rem;

  ${media.largeScreen`
    position:relative;
    bottom: auto;
    top: auto;
    right: auto;
    left: auto;
  `}
`;
