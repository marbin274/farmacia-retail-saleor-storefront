import { IUserDataForNiubiz } from "@temp/@next/components/organisms/CheckoutPayment/types";
import { ICardTokenizationResult } from "@temp/core/payments/niubiz";

export type INiubizFormProps = {
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
