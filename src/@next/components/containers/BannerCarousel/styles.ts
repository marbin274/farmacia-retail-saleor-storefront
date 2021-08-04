import { styled } from "@temp/@next/globalStyles";
import { containerWidth } from "@temp/@next/globalStyles/constants";
import farmatheme from "@farmatheme";
export const BannerCarouselWrapper = styled.div`
  .carousel {
    &__control {
      background-color: ${farmatheme.theme.colors.neutral.lightest};
      padding: 0.2rem 0.5rem;

      &:hover {
        cursor: pointer;
      }

      &--right {
        margin-right: 0;

        @media (min-width: ${containerWidth}) {
          margin-right: -1.3rem;
        }

        svg {
          margin-top: 0.5rem;
          transform: rotate(0deg) !important;
        }
      }

      &--left {
        margin-left: 0;

        @media (min-width: ${containerWidth}) {
          margin-left: -1.3rem;
        }

        svg {
          margin-top: 0.4rem;
          transform: rotate(180deg) !important;
        }
      }
    }
    .slider-slide {
      border: 0.0625rem solid #d7d4eb;
      border-radius: 1rem;
      text-align: center;
    }
  }
`;
