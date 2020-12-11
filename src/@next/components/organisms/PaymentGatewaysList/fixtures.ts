import { IPaymentGateway } from "@types";
import { IUserDataForNiubiz } from "../CheckoutPayment/types";

export const paymentGateways: IPaymentGateway[] = [
  {
    config: [
      {
        field: "store_customer_card",
        value: "false",
      },
    ],
    id: "mirumee.payments.dummy",
    name: "AUNA Payment Gateway",
  },
  {
    config: [
      {
        field: "api_key",
        value: "pk_test_6pRNASCoBOKtIshFeQd4XMUh",
      },
      {
        field: "store_customer_card",
        value: "false",
      },
    ],
    id: "mirumee.payments.stripe",
    name: "Stripe",
  },
];

export const userDataFroNiubiz: IUserDataForNiubiz = {
  dataTreatmentPolicy: false,
  documentNumber: "",
  email: "",
  termsAndConditions: false,
};
