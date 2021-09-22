import { mediaUp, styled } from '@styles';
import { aunaBlack } from '@temp/@next/globalStyles/constants';

export const Container = styled.div`
  max-width: 100vw;
  min-height: 25rem;
  padding: 0.1rem 0;
  width: 100%;

  ${mediaUp.largeScreen`
    width: ${(props) => `${props.theme.container.width}px`};
  `}

  a {
    color: ${aunaBlack};
    display: inline-block;
    max-width: 255px;
    text-decoration: none;
  }

  ul {
    li {
      background-color: white;
      border-radius: 1rem;

      ${mediaUp.largeScreen`
        width: 13rem important;
      `}

      ${mediaUp.xLargeScreen`
        width: 16rem !important;
      `}
    }
  }

  .slider.carousel {
    height: 30.625rem !important;
    ${mediaUp.largeScreen`
      height: inherit;
    `}
  }

  .slider-control-centerleft,
  .slider-control-centerright {
    align-items: center;
    bottom: -0.875rem !important;
    display: flex;
    height: 3.125rem;
    right: 29px !important;
    top: auto !important;

    ${mediaUp.largeScreen`
      bottom: inital !important;
      top: -14% !important;
    `};
  }

  .slider-control-centerleft {
    left: 30% !important;
    right: auto !important;
    transform: translate(50%, -50%) !important;

    ${mediaUp.smallScreen`
      left: auto !important;
      right: calc(50% + 3.125rem) !important;

    `}

    ${mediaUp.largeScreen`
      left: auto !important;
      right: 7.625rem !important;
      transform: translateY(-50%) !important;
    `}
  }

  .slider-control-centerright {
    left: auto !important;
    right: calc(50% - 3.125rem) !important;
    transform: translate(50%, -50%) !important;

    ${mediaUp.largeScreen`
      left: auto !important;
      right: 3rem !important;
      transform: translateY(-50%) !important;
    `}
  }
  .home-page__product {
    border-width: 0;
    padding: 2rem;

    .description {
      height: 4rem;
      margin-bottom: 0.5rem;
    }
    &-sticker {
      align-self: flex-start;
      margin-top: 0;
      & > div {
        position: absolute;
      }
    }
    &-image {
      flex-direction: column-reverse;
    }
    &-price {
      display: block;
      span:before {
        content: '';
      }
    }
    &-title {
      text-align: center;
    }
    &-button {
      justify-content: center;
    }
  }

  .search-page__product-price {
    display: none;
  }
`;

export const InnerContainer = styled.div`
  padding: 0 1rem;
  ${mediaUp.smallScreen`
    padding: initial;
  `}
`;

export const CollectionName = styled.h2`
  color: #323e48;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: normal;
  max-width: 63rem;
  padding: 1rem 1rem 1.875rem;
  text-align: center;

  ${mediaUp.largeScreen`
    font-size: 2rem;
    padding: 2rem 1rem;
    text-align: left;
  `}
`;
