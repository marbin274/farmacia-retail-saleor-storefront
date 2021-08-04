import { styled, mediaUp } from "@styles";
import { css } from "styled-components";
import farmatheme from "@farmatheme";

const cardInput = css`
  > div {
    height: 3rem;
    iframe {
      padding: 0.75rem 0.75rem 0.75rem 1rem;
      border: 0.0625rem solid ${farmatheme.theme.colors.neutral.medium};
      border-radius: 0.5rem;
      height: 3rem;
      display: flex;
      width: 100%;
      background-color: white;
    }
    input {
      background-color: white;
    }
  }

  #txtNumeroTarjeta {
    iframe {
      border-color: ${(props: any) =>
        props.formErrors.some((x: any) => x.code === props.invalidNumberCode)
          ? farmatheme.theme.colors.error.medium
          : farmatheme.theme.colors.neutral.medium};

      &:focus {
        border-color: ${farmatheme.theme.colors.neutral.darkest};
      }
    }
  }
  #txtFechaVencimiento {
    iframe {
      border-color: ${(props: any) =>
        props.formErrors.some((x: any) => x.code === props.invalidExpiryCode)
          ? farmatheme.theme.colors.error.medium
          : farmatheme.theme.colors.neutral.medium};

      &:focus {
        border-color: ${farmatheme.theme.colors.neutral.darkest};
      }
    }
  }
  #txtCvv {
    iframe {
      border-color: ${(props: any) =>
        props.formErrors.some((x: any) => x.code === props.invalidCvc)
          ? farmatheme.theme.colors.error.medium
          : farmatheme.theme.colors.neutral.medium};

      &:focus {
        border-color: ${farmatheme.theme.colors.neutral.darkest};
      }
    }
  }

  .error {
    height: auto;
    color: ${farmatheme.theme.colors.error.medium};
    margin-top: 0.5rem;
    line-height: 0.75rem;
    font-size: 0.75rem;
  }
`;

export const Payment = styled.div<{
  formErrors: any;
  invalidNumberCode: string;
  invalidExpiryCode: string;
  invalidCvc: string;
}>`
  .row {
    max-width: 40.25rem;
  }

  .row-w-full {
    max-width: 100%;
  }

  .row-input {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-bottom: 1rem;

    ${mediaUp.mediumScreen`
      margin-bottom: 1.5rem;      
      flex-direction: row;
    `}

    > div {
      max-width: 100%;

      ${mediaUp.mediumScreen`
        max-width: 19.375rem;
      `}

      &:nth-child(1) {
        width: 100%;
        margin-bottom: 1rem;

        ${mediaUp.mediumScreen`
          width: calc(100% - 0.75rem);
        `}
      }

      &:nth-child(2) {
        width: 100%;

        ${mediaUp.mediumScreen`
          width: calc(100% - 0.75rem);
        `}
      }

      > label {
        font-size: 0.875rem;
        color: ${farmatheme.theme.colors.neutral.darkest};
        font-weight: 500;
      }
    }

    .card-input {
      ${cardInput}
    }
  }

  .row-input-w-full {
    display: flex;
    justify-content: space-between;
    display: flex;
    margin-bottom: 1rem;

    flex-direction: column;

    > div {
      &:nth-child(1) {
        width: 100%;
        margin-bottom: 1rem;
      }

      &:nth-child(2) {
        width: 100%;
      }

      > label {
        font-size: 0.875rem;
        color: #23212b;
        font-weight: 600;
      }
    }

    .card-input {
      ${cardInput}
    }
  }

  .niubiz-logo-container {
    margin-top: 0.3125rem;
  }
`;

export const PaymentIcon = styled.div`
  margin-left: 0.3125rem;
`;
