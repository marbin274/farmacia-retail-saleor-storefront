import { styled } from '@styles';
import { aunaGrey60, white } from '@temp/@next/globalStyles/constants';
import { keyframes } from 'styled-components';

const sidenavLeftOpen = keyframes`
  from {
    left: -100rem;
  }
  to {
    left: 0;
    }
`;

const sidenavRightOpen = keyframes`
  from {
    right: -100rem;
  }
  to {
    right: 0;
  }
`;

export const OverlayWrapper = styled.div`
  &.overlay {
    background-color: rgba(35, 33, 43, 0.8);
    height: 100%;
    min-height: 100vh;
    position: fixed;
    top: 0;
    transition: 300ms;
    width: 100%;
    z-index: 5;

    &--main-menu-nav {
      top: 3.55rem;
    }

    &--search {
      z-index: 4;
      top: 0;

      .overlay__right {
        height: 100vh;
        position: relative !important;
        border-radius: 0;
        .search-container {
          > div {
            > div {
              > button {
                svg {
                  transform: translate(0.1875rem, 0.1875rem);
                }
              }
            }
          }

          .search__input {
            .input {
              width: 100%;
              &__content {
                border: none;
                max-width: 100% !important;
                background-color: rgba(247, 246, 248, 0.15);

                input {
                  color: #c8c5d3;
                }
              }
            }
          }
        }
      }

      .overlay__center {
        background-color: transparent;
        height: 0;
      }
    }

    &--no-background {
      background-color: transparent;
    }
  }
  .overlay {
    &__left {
      position: fixed;
      min-height: 100%;
      height: 100%;
      background-color: #ffffff;
      animation: ${sidenavLeftOpen} 0.3s;
      overflow-y: auto;
    }

    &__right {
      position: fixed;
      background-color: ${white};
      right: 0;
      top: 0;
      height: 100%;
      animation: ${sidenavRightOpen} 0.3s;
      overflow-y: auto;
    }

    &__center {
      position: fixed;
      background-color: ${white};
      right: 0;
      top: 0;
      height: 0;
      animation: ${sidenavRightOpen} 0.3s;
    }

    &__header {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 400;
      color: #c2df0a;
      border: 0.0625rem solid ${aunaGrey60};
      padding: 1rem 1.25rem;

      &-text {
        display: flex;
        flex-direction: column;
        text-align: center;
        font-weight: 400;
        font-size: 1.25rem;

        &-items {
          font-weight: 400;
          color: ${aunaGrey60};
          margin-left: 0.75rem;
          font-size: 0.875rem;
        }
      }

      &__close-icon {
        cursor: pointer;
      }
    }
  }
`;
