import farmatheme from '@farmatheme';
import { ContainerStyle, mediaUp, styled } from '@styles';

export const Wrapper = styled.nav<{ isProductDetail: boolean }>`
  background-color: ${({ isProductDetail }) =>
    isProductDetail
      ? farmatheme.theme.colors.neutral.lightest
      : farmatheme.theme.colors.highlight.darkest};
  width: 100%;
  padding: ${({ isProductDetail }) =>
    isProductDetail ? '0.5rem 1rem' : '1rem'};
  z-index: 3;

  ${mediaUp.largeScreen`
    padding: 1rem 0rem;
    z-index: 2;
  `};
`;

export const ContainerSearch = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: baseline;
  margin-bottom: 1rem;
  .input {
    width: 100%;

    &__content {
      max-width: 100% !important;
      border: none !important;
    }
    &__inner-icon {
      background-color: transparent !important;

      svg {
        fill: #23212b !important;
      }
    }
  }
`;

export const Container = styled.div`
  ${ContainerStyle}
  padding: 0rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mediaUp.largeScreen`
    flex-direction: row;
  `};

  .search__products--expanded {
    top: 8rem;
  }
`;

export const Menu = styled.div`
  display: none;
  ${mediaUp.largeScreen`
    display: block;
  `};
`;

export const WrapperAddressGeo = styled.div<{ isProductDetail: boolean }>`
  position: relative;
  width: 100%;

  ${({ isProductDetail }) =>
    isProductDetail
      ? `
    span {
      color: ${farmatheme.theme.colors.neutral.darkest};
    }
    svg{
      color: ${farmatheme.theme.colors.highlight.medium};

      ${mediaUp.largeScreen`
        color: ${farmatheme.theme.colors.neutral.lightest};
      `}
    
    }
    .icon_button{
      height: 1.5rem;
    }

    button {
      border-width: 0.125rem;
      border-color: ${farmatheme.theme.colors.primary.medium};
      span {
        color: ${farmatheme.theme.colors.primary.dark};
        font-weight: 600;
      }
    }
  `
      : ''}

  ${mediaUp.largeScreen`
        width: 20rem;
  `};
`;
