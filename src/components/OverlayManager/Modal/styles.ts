import { mediaUp, styled } from '@styles';
import {
  aunaBlack,
  aunaGrey60,
  grayLight,
  white,
} from '@temp/@next/globalStyles/constants';
import { Overlay } from '@temp/components';

export const OverlayWrapper = styled(Overlay)`
  .overlay--modal {
    display: flex;
    overflow-y: auto;

    ${mediaUp.smallScreen`
      align-items: center;
    `}

    .overlay__modal {
      background-color: ${white};
      display: flex;
      flex-direction: column;
      height: inherit;
      width: 100%;

      ${mediaUp.smallScreen`
        height: auto;
        margin: 0 auto;
        min-height: 28.4375rem;
        width: 34.6875rem;
      `}

      .modal {
        display: flex;
        flex-direction: column;
        height: inherit;
        min-height: inherit;

        a,
        &__action {
          color: #21125e;
          font-weight: bold;
          text-decoration: underline;
        }

        &__title,
        &__body,
        &__footer {
          padding: 1rem;
        }

        &__title {
          align-items: center;
          border-bottom: 0.0625rem ${grayLight} solid;
          color: ${aunaBlack};
          display: flex;
          font-weight: bold;
          text-transform: uppercase;

          p {
            margin-right: auto;
          }
        }

        &__body {
          border-bottom: 1px ${aunaGrey60} solid;
          flex: 1;

          &__lead {
            color: rgba(${aunaBlack}, 0.6);
            font-size: 1.5rem;
            font-weight: 900;
            padding: $spacer 0;
            text-transform: uppercase;
          }
        }

        &__footer {
          text-align: right;

          a {
            padding: 1rem;
          }
        }

        &__button {
          box-shadow: none;
          margin: 0 1rem;
          padding: 0.1rem 2.7rem;
          width: auto;

          span {
            font-size: 1rem;
          }
        }

        &__action {
          display: inline-block;
          font-size: 1rem;
          padding: 0 1rem;
        }

        &__close {
          div,
          svg {
            height: 1.1875rem;
            width: 1.1875rem;
          }
        }

        &__close,
        &__action {
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
`;
