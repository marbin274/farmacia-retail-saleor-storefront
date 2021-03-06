import { GetShop_shop_countries } from "@sdk/queries/gqlTypes/GetShop";
import { ITotalPrice } from "@temp/@sdk/api/Cart/types";
import {
  IAddress,
  IAddressWithAddressType,
  IFormError,
  IPaymentGateway,
} from "@types";
import { IProcesPaymentArgs } from "../PaymentGatewaysList/types";

export interface IPromoCodeDiscount {
  voucherCode?: string | null;
  voucherType?: string | null;
  voucherDiscountType?: string | null;
  voucherDiscountValue: number | undefined;
}

export interface IUserDataForNiubiz {
  documentNumber?: string | null;
  email?: string;
  dataTreatmentPolicy?: boolean;
  termsAndConditions?: boolean;
  // TODO: add registerDate, clientType and frecuentClient
}

export interface IProps {
  billingErrors?: IFormError[];
  gatewayErrors?: IFormError[];
  promoCodeErrors?: IFormError[];
  userAddresses?: IAddressWithAddressType[] | null;
  selectedUserAddressId?: string;
  billingAsShippingAddress?: boolean;
  checkoutBillingAddress?: IAddress | null | undefined;
  countries: Array<GetShop_shop_countries | null>;
  billingFormRef?: React.RefObject<HTMLFormElement>;
  billingFormId?: string;
  paymentGateways: IPaymentGateway[];
  setBillingAddress: (address?: IAddress, email?: string, id?: string) => void;
  billingAsShippingPossible: boolean;
  setBillingAsShippingAddress: (billingAsShippingAddress: boolean) => void;
  promoCodeDiscount?: IPromoCodeDiscount;
  promoCodeDiscountFormRef?: React.RefObject<HTMLFormElement>;
  promoCodeDiscountFormId?: string;
  addPromoCode: (promoCode: string) => void;
  removeVoucherCode: (voucherCode: string) => void;
  submitUnchangedDiscount: () => void;
  clearPromoCodeErrors: () => void;
  cartLinesUpdated?: boolean;
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
   * Gateway form reference on which payment might be submitted.
   */
  gatewayFormRef?: React.RefObject<HTMLFormElement>;
  gatewayFormId?: string;
  newAddressFormId?: string;
  userId?: string;
  /**
   * Method called after the form is submitted. Passed gateway id and token attribute will be used to create payment.
   */
  processPayment: (data: IProcesPaymentArgs) => void;
  /**
   * Method called when gateway error occured.
   */
  onGatewayError: (errors: IFormError[]) => void;
  changeRequestPayload: (requestPayload: any) => void;
  requestPayload?: string | undefined | null;
  totalPrice?: ITotalPrice;
  userDataForNiubiz?: IUserDataForNiubiz;
  selectedDistrict: string;
  gatewayListError?: string;
  setGatewayListError?: React.Dispatch<React.SetStateAction<string>>;
}
