// import {ICardPaymentInput} from "@temp/core/payments/braintree";
import { ITotalPrice } from "@temp/@sdk/api/Cart/types";
import { IAddress, ICardData, IFormError, IPaymentGateway } from "@types";
import { IUserDataForNiubiz } from "../CheckoutPayment/types";

export interface IProps {
  /**
   * Available payment gateways.
   */
  paymentGateways: IPaymentGateway[];
  /**
   * Selected payment gateway.
   */
  selectedPaymentGateway?: string;
  /**
   * Selected payment gateway token.
   */
  selectedPaymentGatewayToken?: string;
  /**
   * Called when selected payment gateway is changed.
   */
  selectPaymentGateway: (paymentGateway: string) => void;
  /**
   * Form reference on which payment might be submitted.
   */
  formRef?: React.RefObject<HTMLFormElement>;
  /**
   * Form id on which payment might be submitted.
   */
  formId?: string;
  /**
   * Payment gateway errors.
   */
  errors?: IFormError[];
  /**
   * Method called after the form is submitted. Passed gateway id and token attribute will be used to create payment.
   */
  processPayment: (
    gateway: string,
    token: string,
    cardData?: ICardData,
    requestPayload?: string
  ) => void;
  /**
   * Method called when gateway error occured.
   */
  onError: (errors: IFormError[]) => void;

  checkoutBillingAddress?: IAddress | null | undefined;
  changeRequestPayload: (requestPayload: any) => void;
  requestPayload?: string | undefined | null;
  totalPrice?: ITotalPrice;
  userDataForNiubiz?: IUserDataForNiubiz;
  voucherCode: string | null | undefined;
  reRender: boolean;
  selectedDistrict: string;
}
