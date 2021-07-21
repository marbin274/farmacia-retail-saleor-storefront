import { IUserDataForNiubiz } from "@temp/@next/components/organisms/CheckoutPayment/types";
import { IPaymentGatewayConfig } from "@temp/@next/types";
import { ICardTokenizationResult } from "@temp/core/payments/niubiz";

export type INiubizFormProps = {
  config: IPaymentGatewayConfig[];
  formId?: string;
  formRef?: React.RefObject<HTMLFormElement>;
  generatePurchaseNumber: () => number;
  onCardTokenization?: (data: ICardTokenizationResult) => void;
  onError?: () => void;
  onForceClose?: () => void;
  userDataForNiubiz: IUserDataForNiubiz;
};

export interface IFormPayment {
  name?: string;
  lastname?: string;
  email?: string;
}
