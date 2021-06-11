import { media, styled } from "@styles";
import { white } from "@styles/constants";

export const ProductCard = styled.div<{
  canAddToCart?: boolean | 0 | undefined;
}>`
  position: relative;
  height: 9rem;
  width: 100%;
  border-radius: 1.5rem;
  background-color: ${white};
  padding: 0.5rem;
  margin-bottom: 1.5rem;

  ${media.largeScreen`
    height: 15.125rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  `}

  .itemHandler,
  .button {
    z-index: 100;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

export const WrapperImage = styled.div`
  display: inline-block;
  border-radius: 1.25rem;
  background-color: ${white};
  width: 8.125rem;
  height: 8.125rem;
  vertical-align: top;
  position: relative;

  ${media.largeScreen`
    height: 12.125rem;
  `}

  .img {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    height: 100%;
    max-height: 8.125rem;
    margin: auto;

    img {
      align-items: center;
    }
  }
`;

export const WrapperDetail = styled.div`
  display: inline-block;
  width: calc(100% - 8.875rem);
  margin-left: 0.5rem;
  vertical-align: top;
  padding-top: 0.75rem;

  a {
    outline: none;
  }
`;

export const ProductTitle = styled.h3`
  width: 100%;
  height: 3rem;
  color: #2f2c3a;
  font-size: 1.25rem !important;
  font-weight: 600;
  line-height: 1.5rem !important;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.largeScreen`
    -webkit-line-clamp: 3;
    height: 4.5rem;
  `}
`;

export const ProductPrice = styled.div`
  margin-top: 0.7rem !important;

  .price {
    display: inline-block;
    margin: 0 1rem 0 0 !important;

    span {
      font-size: 1.25rem !important;
      font-weight: 600;
    }
  }
  .undiscounted_price {
    text-decoration: none !important;
    vertical-align: top !important;
    span {
      font-size: 1.25rem !important;
      font-weight: 400;
      text-decoration: line-through;
    }
  }
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
    bottom: 1.5rem;
    top: auto;
    right: auto;
    left: auto;
  `}
`;
