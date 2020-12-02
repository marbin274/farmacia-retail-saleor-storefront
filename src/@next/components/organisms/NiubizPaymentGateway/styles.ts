import { styled } from "@styles";

export const Wrapper = styled.div`
  margin-top: 20px;
`;

export const Payment = styled.div`
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
    display: flex;
    margin-bottom: 1rem;
    div:nth-child(1) {
      width: 45%;
    }

    div:nth-child(2) {
      width: 50%;
      margin-left: 5%;
    }
  }

  .email {
  }

  .creditcard {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    #txtNumeroTarjeta {
      iframe {
        padding: 0.8rem 0.8rem 1rem 0.8rem;
        border: 1px solid #e4e5ed;
        height: 3rem;
        display: flex;
        width: 100%;
        border-radius: 4px;
      }
    }
  }

  .expirydate_and_cvv {
    display: flex;

    .expirydate {
      width: 45%;

      .errorCvv {
        margin-top: 1.8rem;
        margin-left: 1rem;
        font-size: 12px;
        color: #e84545;
      }
    }

    .cvv {
      width: 50%;
      margin-left: 5%;
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
      }
    }
  }

  input {
    padding: 0.75rem 1rem;
    margin: 0;
    border: none;
    color: #131336;
    width: 100%;
    font-size: 0.9rem;
    outline: none;
    background-color: transparent;
    border-radius: 4px;
    border: 1px solid #e4e5ed;

    ::placeholder {
      color: #9194a7;
    }
  }
`;
