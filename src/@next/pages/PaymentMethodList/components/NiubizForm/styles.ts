import { styled, media } from "@styles";

export const Wrapper = styled.div`
  margin-top: 1.25rem;
`;

export const Payment = styled.div<{
  formErrors: any;
  invalidNumberCode: string;
  invalidExpiryCode: string;
  invalidCvc: string;
}>`
  .card-title {
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1.5rem;
    margin-bottom: 0.75rem;
    color: #23212b;

    ${media.smallScreen`
      margin-bottom: 1rem;
      line-height: 1.75rem;
    `}
  }

  .card-subtitle {
    font-size: ${props => props.theme.typography.baseFontSize};
    height: 2rem;
    display: block;
    font-weight: normal;
    margin-bottom: 1.625rem;
    line-height: 1.375rem;
    letter-spacing: 0.015em;
  }

  .row {
    max-width: 40.25rem;
  }

  .row-input {
    display: flex;
    justify-content: space-between;
    display: flex;
    margin-bottom: 1.5rem;

    ${media.smallScreen`
      flex-direction: column;
      margin-bottom: 1rem;
    `}
    > div {
      max-width: 19.375rem;
      &:nth-child(1) {
        width: calc(100% - 0.75rem);

        ${media.smallScreen`
          width: 100%;
          margin-bottom: 1rem;
        `}
      }
      &:nth-child(2) {
        width: calc(100% - 0.75rem);

        ${media.smallScreen`
          width: 100%;
        `}
      }

      ${media.smallScreen`
        max-width: 100%;
      `}

      > label {
        font-size: 0.875rem;
        color: #23212b;
        font-weight: 600;
      }
    }

    .card-input {
      > div {
        background-color: #f7f6f8;

        height: 3rem;
        iframe {
          padding: 0.75rem 0.75rem 0.75rem 1rem;
          border: 0.0625rem solid #aca8bd;
          border-radius: 0.5rem;
          height: 3rem;
          display: flex;
          width: 100%;
          background-color: #fff;
        }
        input {
          background-color: #fff;
        }
      }

      #txtNumeroTarjeta {
        iframe {
          border-color: ${(props: any) =>
            props.formErrors.some(
              (x: any) => x.code === props.invalidNumberCode
            )
              ? "#c82328"
              : "#ACA8BD"};

          &:focus {
            border-color: #2f2c3a;
          }
        }
      }
      #txtFechaVencimiento {
        iframe {
          border-color: ${(props: any) =>
            props.formErrors.some(
              (x: any) => x.code === props.invalidExpiryCode
            )
              ? "#c82328"
              : "#ACA8BD"};

          &:focus {
            border-color: #2f2c3a;
          }
        }
      }
      #txtCvv {
        iframe {
          border-color: ${(props: any) =>
            props.formErrors.some((x: any) => x.code === props.invalidCvc)
              ? "#c82328"
              : "#ACA8BD"};

          &:focus {
            border-color: #2f2c3a;
          }
        }
      }

      .error {
        height: auto;
        color: #c82328;
        margin-top: 0.5rem;
        line-height: 0.75rem;
        font-size: 0.75rem;
      }
    }
  }

  .niubiz-logo-container {
    margin-top: 0.3125rem;
  }
`;

export const RadioContainerPayment = styled.div`
  margin-bottom: 2.75rem;
  > div {
    > div {
      margin-bottom: 0.7em;
    }
  }
`;

export const PaymentLine = styled.span`
  display: inline-flex;
  flex: justify-content;
  position: relative;
  width: calc(100% - 3em);
`;

export const PaymentIconNiubiz = styled.div`
  margin-left: 0.3125rem;
  padding-top: 0.9375rem;
  padding-right: 0.625rem;
`;

export const PaymentIcon = styled.div`
  margin-left: 0.3125rem;
`;
