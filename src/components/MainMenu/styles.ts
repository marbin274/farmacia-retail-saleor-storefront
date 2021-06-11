import farmatheme from "@farmatheme";
import { mediaUp, styled } from "@styles";

export const Wrapper = styled.nav<{ isProductDetail: boolean }>`
  background-color: ${({ isProductDetail }) =>
    isProductDetail
      ? farmatheme.theme.colors.neutral.lightest
      : farmatheme.theme.colors.highlight.darkest};
  width: 100%;
  padding: ${({ isProductDetail }) =>
    isProductDetail ? "0.5rem 1rem" : "1rem"};
  ${mediaUp.largeScreen`
    padding: 1rem 0rem;
  `};

  > .container {
    padding: 0rem;
  }
`;

export const ContainerSearch = styled.div`
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  ${mediaUp.largeScreen`
    flex-direction: row;
  `};

  .search__products--expanded {
    top: 8rem;
  }
`;

export const Menu = styled.div`
  display: none;
  position: relative;
  ${mediaUp.largeScreen`
    display: block;
  `};
`;

export const Search = styled.div`
  display: block;
  position: relative;
  ${mediaUp.largeScreen`
        display: none;
    `};
  .search {
    min-height: initial;
    &__input {
      margin-top: 0px;
      padding: 0px;
      touch-action: none;
      -ms-touch-action: none;
      .input {
        padding: 0rem 1rem 1rem 1rem;
        &__field {
          color: ${({ theme }) => theme.colors.white};
          &::placeholder {
            color: ${({ theme }) => theme.colors.white};
          }
        }
      }
    }
    &__products {
      position: absolute;
      left: 0;
      z-index: 3;
    }
  }
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

    .icon_button{
      height: 1.5rem;
    }

    button {
      border-color: ${farmatheme.theme.colors.highlight.medium};
      span {
        color: ${farmatheme.theme.colors.highlight.medium};
      }
    }
  `
      : ""}

  ${mediaUp.largeScreen`
        width: 20rem;
  `};
`;
