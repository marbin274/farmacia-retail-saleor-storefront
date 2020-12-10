import axios, { AxiosRequestConfig } from "axios";
// import * as braintree from "braintree-web";
export interface PaymentData {
  lastDigits: string;
  ccType: string;
  token: string;
}

export interface ICardInputs {
  ccName?: string;
  ccCsc: string;
  ccExp: string;
  ccNumber: string;
  ccSurname?: string;
}

export type CardError = { field?: string; message: string } | null;

export interface ICardPaymentInput {
  billingAddress: {
    postalCode?: string;
  };
  cvv: string;
  expirationDate: string;
  name?: string;
  number: string;
  surname?: string;
}

export interface ICardErrors {
  cvv: CardError;
  expirationMonth: CardError;
  expirationYear: CardError;
  number: CardError;
}

export interface ErrorData {
  fieldErrors: ICardErrors;
  nonFieldError?: string;
}
export interface IPaymentCardError {
  code: string;
  field: string;
  message: string;
}

export type GatewayOptions = {
  endpoint?: string | undefined;
  user?: string | undefined;
  password?: string | undefined;
  securityToken?: string | undefined;
  amount?: any | undefined;
  channel?: string | undefined;
  clientIp?: string | undefined;
  sessionKey?: string | undefined;
  payform?: any | undefined;
  merchantId?: string | undefined;
};

export const createToken = (requirements: GatewayOptions) => {
  const endpoint: string | undefined = requirements?.endpoint;
  const user: string | undefined = requirements?.user || "";
  const password: string | undefined = requirements?.password || "";

  const seed: string = btoa(`${user}:${password}`);
  const requestOptions: AxiosRequestConfig = {
    headers: {
      Authorization: `Basic ${seed}`,
      "Content-Type": "application/json",
    },
  };

  if (endpoint) {
    return axios.get(endpoint, requestOptions).then((res: any) => res.data);
  }
};

export const createSession = (requirements: GatewayOptions) => {
  const data = {
    amount: requirements.amount,
    antifraud: null,
    channel: requirements.channel,
  };

  const requestOptions: AxiosRequestConfig = {
    headers: {
      Authorization: requirements.securityToken,
      "Content-Type": "application/json",
    },
  };
  if (requirements.endpoint) {
    return axios
      .post(requirements.endpoint, data, requestOptions)
      .then((res: any) => res.data)
      .then((data: any) => data.sessionKey);
  }
};

