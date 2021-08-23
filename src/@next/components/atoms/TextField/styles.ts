import { styled } from '@styles';
import { rose, turquoiseLight, white } from '@styles/constants';
import { css } from 'styled-components';

export const IconLeft = styled.span`
  transform: translateY(105%);
`;
export const IconRight = styled.span`
  transform: translateY(208%);
`;

export const FocusedLabel = css`
  font-size: 0.75rem;
  left: 1rem;
  top: 0;
`;

export const Input = styled.input`
  box-shadow: 0 0 0 0.0625rem ${white};

  &.gray {
    &:focus,
    &:not([value='']) {
      & + .input__label {
        background-color: ${turquoiseLight};
      }
    }
    &:-webkit-autofill {
      & + .input__label {
        background-color: ${turquoiseLight};
      }
    }
  }

  &.error {
    border: 1px solid ${rose};
    & + .input__label {
      color: ${rose};
    }

    &:focus,
    &:not([value='']) {
      border-color: ${rose};

      & + .input__label {
        color: ${rose};
      }
    }

    &:hover {
      border-color: ${rose};

      & + .input__label {
        color: ${rose};
      }
    }
  }
`;
