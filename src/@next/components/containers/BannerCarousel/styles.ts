import { styled } from '@temp/@next/globalStyles';
import {
  aunaInteractive,
  containerWidth,
} from '@temp/@next/globalStyles/constants';
import farmatheme from '@farmatheme';
import { Button } from '@farmacia-retail/farmauna-components';
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
    .slider-control-bottomcenter {
      bottom: -1.5rem;
    }
  }
`;

export const ControlCenter = styled.div`
  transition: width 0.3s;
  &::before {
    content: '';
  }
`;

export const ControlSide = styled(Button as any)`
  background-color: ${farmatheme.theme.colors.neutral.lightest};
  border-color: ${farmatheme.theme.colors.neutral.medium};
  margin: 0rem 1rem;
  &:hover {
    background-color: ${aunaInteractive};
    svg {
      color: ${farmatheme.theme.colors.neutral.lightest};
    }
  }
`;
