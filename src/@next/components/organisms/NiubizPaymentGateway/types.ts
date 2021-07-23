import { ITotalPrice } from "@temp/@sdk/api/Cart/types";
import { ICardTokenizationResult } from "@temp/core/payments/niubiz";
import { ICardData, IFormError, IPaymentGatewayConfig } from "@types";
import { IUserDataForNiubiz } from "../CheckoutPayment/types";

export interface IProps {
  /**
   * Payment gateway client configuration.
   */
  config: IPaymentGatewayConfig[];
  /**
   * Form reference on which payment might be submitted.
   */
  formRef?: React.RefObject<HTMLFormElement>;
  /**
   * Form id on which payment might be submitted.
   */
  formId?: string;
  /**
   * Errors returned by the payment gateway.
   */
  errors?: IFormError[];
  /**
   * Postal code .
   */
  postalCode?: string;
  /**
   * Method called after the form is submitted. Passed token attribute will be used to create payment.
   */
  processPayment?: (token: string, cardData?: ICardData) => void;
  /**
   * Method called when gateway error occured.
   */
  onError: (errors: IFormError[]) => void;
  totalPrice?: ITotalPrice;
  userDataForNiubiz?: IUserDataForNiubiz;
  generatePurchaseNumber: () => number;
  saveCardSelected?: boolean;
  onClickSaveCard?: (value: boolean) => void;
  showSaveCardCheck?: boolean;
  onCardTokenization?: (data: ICardTokenizationResult) => void;
  onForceReRender?: () => void;
  fullWidthInputs?: boolean;
}

export interface IFormPayment {
  name: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
}

export const initialValuesFormPayment: IFormPayment = {
  name: "",
  lastname: "",
  email: "",
};
