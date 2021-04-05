import { styled, media } from "@styles";

export const Wrapper = styled.div`
  margin-top: 20px;
  ${media.smallScreen`
   background-color: #F6F8FA;
   border-radius: 1rem;
   padding: 0.9375rem;
  `}
`;

export const Payment = styled.div<{
  formErrors: any;
  invalidNumberCode: string;
  invalidExpiryCode: string;
  invalidCvc: string;
}>`
  h4 {
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 1rem;
  }

  h5:nth-child(2) {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 1.5rem;
  }

  h5:nth-child(3) {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 1rem;
  }

  label {
    color: #9194a7;
    font-size: 14px;
  }

  .identity {
    div:nth-child(1) {
      width: 45%;
    }

    div:nth-child(2) {
      width: 50%;
      margin-left: 5%;
    }
    ${media.smallScreen`
        display: block;
        div:nth-child(1) {
          width: auto;
        }
    
        div:nth-child(2) {
          width: auto;
          margin-left:0;
        }
    `}
    display: flex;
    margin-bottom: 1rem;
  }

  .email {
  }

  .error {
    margin-top: 1.8rem;
    margin-left: 1rem;
    font-size: 12px;
    color: #e84545;
    margin-bottom: -2rem;
  }
  .number-creditcard-error{
    margin-top:0;
  }

  .creditcard {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    #txtNumeroTarjeta {
      background-color: #fff;
      height: 3rem;
      iframe {
        padding: 0.8rem 0.8rem 1rem 0.8rem;
        border: 1px solid #e4e5ed;
        height: 3rem;
        display: flex;
        width: 100%;
        border-radius: 4px;
        border-color: ${(props: any) => props.formErrors.some((x: any) => x.code === props.invalidNumberCode) ? "#e84545" : "#e4e5ed"};
      }
      input {
        background-color: #fff;
      }
    }
  }

  .expirydate_and_cvv {
    display: flex;
    ${media.smallScreen`
      display: block;
    `}
    margin-bottom: 2.7em;
    .expirydate {
      width: 45%;
      ${media.smallScreen`
        width: auto;
      `}
    }

    .cvv {
      width: 50%;
      margin-left: 5%;
      ${media.smallScreen`
        width: auto;
        margin-left: 0;
        margin-top: 2.5rem;
      `}
    }

    #txtFechaVencimiento {
      width: 100%;
      iframe {
        padding: 0.8rem 0.8rem 1rem 0.8rem;
        border: 1px solid #e4e5ed;
        height: 3rem;
        display: flex;
        width: 100%;
        border-radius: 4px;
        background-color: #fff;
        border-color: ${(props: any) => props.formErrors.some((x: any) => x.code === props.invalidExpiryCode) ? "#e84545" : "#e4e5ed"};

      }
    }

    #txtCvv {
      iframe {
        padding: 0.8rem 0.8rem 1rem 0.6rem;
        border: 1px solid #e4e5ed;
        height: 3rem;
        display: flex;
        width: 100%;
        border-radius: 4px;
        background-color: #fff;
        border-color: ${(props: any) => props.formErrors.some((x: any) => x.code === props.invalidCvc) ? "#e84545" : "#e4e5ed"};
      }
      margin-bottom: 20px;
    }
  }

  .card-title {
    fontsize: 26px;
    line-height: 2.1875rem;
  }

  input {
    padding: 0.75rem 1rem;
    margin: 0;
    border: none;
    color: #131336;
    width: 100%;
    height: 3rem;
    font-size: 0.9rem;
    outline: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #e4e5ed;

    ::placeholder {
      color: #9194a7;
    }
  }
  .niubiz-logo-container {
    margin-top: 5px;
  }
`;
