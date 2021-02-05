import { IAddress, IFormError } from "@types";
import { CCProviders } from "@components/atoms";

export interface IProps {
  isShippingAvailable?: boolean | null;
  shippingAddress?: IAddress | null;
  billingAddress?: IAddress | null;
  shippingMethodName?: string;
  paymentMethodName?: string;
  email?: string;
  errors?: IFormError[];
  creditCardProvider: CCProviders;
}
