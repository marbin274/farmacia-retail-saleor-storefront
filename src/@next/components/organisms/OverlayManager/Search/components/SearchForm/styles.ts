import { mediaUp, styled } from '@styles';
import { white } from '@temp/@next/globalStyles/constants';
import { customBreakpoint, size } from '../../styles';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaUp.mediumScreen`
    align-items: center;
    flex-direction: row;
    justify-content: center;
  `}

  ${mediaUp.largeScreen`
    justify-content: center;
  `}

  input {
    width: 100%;
  }
  .input {
    ${mediaUp.largeScreen`
      width: 26.25rem;
    `}
    input {
      color: #2f2c3a;
    }

    input::placeholder {
      font-size: 0.875rem;
      line-height: 100%;
      color: #908ba7;
    }

    &__content {
      ${size}
      background-color: #ffffff;
      align-items: center;
      border: 0.0625rem solid #00bf8e;
      border-radius: 2.5rem;
      box-shadow: none;
      display: flex;
      justify-content: center;
      padding-right: 0.5rem;
    }

    &__inner-icon {
      background-color: #00bf8e;
      border-radius: 50%;
      display: flex;
      width: 2rem;
      height: 2rem;

      svg {
        margin: auto;
        fill: ${white};
      }
    }

    &__field {
      background-color: transparent;
      border: none;
      box-shadow: none;
      flex: 1;
      padding: 0.75rem 1rem;
      margin: 0;
      border-radius: 0.5rem;

      @media (max-width: ${customBreakpoint}) {
        font-size: 0.875rem;
      }

      &:focus {
        box-shadow: none;
      }
    }
  }
`;
