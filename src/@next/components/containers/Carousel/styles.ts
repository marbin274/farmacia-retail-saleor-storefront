import { styled } from "@temp/@next/globalStyles";
import { containerWidth } from "@temp/@next/globalStyles/constants";
import NukaCarousel from "nuka-carousel";

export const NukaCarouselStyled = styled(NukaCarousel)`
  &.carousel {
    &__button {
      width: 3.125rem;
      height: 3.125rem;
    }
    &__control {
      padding: 0.2rem 0.5rem;
      background-color: $white;

      &:hover {
        cursor: pointer;
      }

      &--right {
        margin-right: -1.3rem;

        @media (max-width: ${containerWidth}) {
          margin-right: 0;
        }

        svg {
          transform: rotate(0deg) !important;
          margin-top: 0.5rem;
        }
      }

      &--left {
        margin-left: -1.3rem;

        @media (max-width: ${containerWidth}) {
          margin-left: 0;
        }

        svg {
          margin-top: 0.4rem;
          transform: rotate(180deg) !important;
        }
      }
    }

    .slider-slide {
      text-align: center;
    }
  }
`;
