import { IUserDataForNiubiz } from "@temp/@next/components/organisms/CheckoutPayment/types";
import { IPaymentGatewayConfig } from "@temp/@next/types";
import { ICardTokenizationResult } from "@temp/core/payments/niubiz";

export type INiubizFormProps = {
  config: IPaymentGatewayConfig[];
  userDataForNiubiz: IUserDataForNiubiz;
  generatePurchaseNumber: () => number;
  formRef?: React.RefObject<HTMLFormElement>;
  formId?: string;
  onError?: () => void;
  onCardTokenization?: (data: ICardTokenizationResult) => void;
};

export interface IFormPayment {
  name?: string;
  lastname?: string;
  email?: string;
}
