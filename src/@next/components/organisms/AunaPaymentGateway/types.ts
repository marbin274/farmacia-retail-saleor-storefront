import { ICardPaymentInput } from "@temp/core/payments/braintree";
import { IFormError, IPaymentGatewayConfig } from "@types";

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
   * Method called after the form is submitted. Passed token attribute will be used to create payment.
   */
  processPayment: (gateway:string, token: string, cardData?: ICardPaymentInput) => void;
  /**
   * Method called when gateway error occured.
   */
  onError?: (errors: IFormError[]) => void;
}
