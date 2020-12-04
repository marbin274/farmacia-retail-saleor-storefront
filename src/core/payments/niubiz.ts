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

// export const setConfiguration = async (payform: any, sessionKey?: string, merchantId?: string, amount?: any) => {
//   const configuration = {
//     amount,
//     callbackurl: "",
//     channel: "web",
//     font:"https://fonts.googleapis.com/css?family=Montserrat:400&display=swap",
//     language: "es",
//     merchantConfiguration: {
//       tokenizationEnabled: true,
//     },
//     merchantid: merchantId,
//     purchasenumber: "100000000001",
//     recurrentmaxamount: "1000.00",
//     sessionkey: sessionKey,
//   };

//   payform.setConfiguration(configuration);

//   const data= {
//     alias: 'mialias',
//     email: "accept@sastest.com",
//     lastName: "Apellidos",
//     name: "Nombres",
//     userBlockId: 'miUserBlockId',
//   };

//   const cardNumber = "4919148107859067";
//   const cardExpiry = "12/12";
//   const cardCvc = "123";

//   return payform.createToken([cardNumber,cardExpiry, cardCvc], data);
// }

// export const tokenizeCreditCard = async (requirements: GatewayOptions) => {
//   return setConfiguration(requirements.payform, requirements.sessionKey, requirements.merchantId, requirements.amount);
// };

// export const niubizPayment = (paymentClientToken: string, creditCard: any) =>
//   new Promise<PaymentData | ErrorData[]>((resolve, reject) => {
//     braintree.client.create(
//       {
//         authorization: paymentClientToken,
//       },
//       (_err, client) => {
//         client.request(
//           {
//             data: { creditCard },
//             endpoint: "payment_methods/credit_cards",
//             method: "post",
//           },
//           (error: any, response: any) => {
//             if (error) {
//               if (error.details.originalError.fieldErrors.length > 0) {
//                 error.details.originalError.fieldErrors.map((error: any) => {
//                   if (error.field === "creditCard") {
//                     reject(error.fieldErrors);
//                   }
//                 });
//               }
//             } else {
//               const lastDigits = response.creditCards[0].details.lastFour;
//               const ccType = response.creditCards[0].details.cardType;
//               const token = response.creditCards[0].nonce;
//               resolve({ lastDigits, ccType, token });
//             }
//           }
//         );
//       }
//     );
//   });
