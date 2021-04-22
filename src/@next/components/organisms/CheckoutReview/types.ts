import { IAddress, IFormError } from "@types";
import { CCProviders } from "@components/atoms";
import { IScheduleDate } from "@temp/@sdk/repository";
import { ICheckout } from '@sdk/api/Checkout/types';

export interface IProps {
  checkout?: ICheckout | undefined | null;
  isShippingAvailable?: boolean | null;
  shippingAddress?: IAddress | null;
  billingAddress?: IAddress | null;
  scheduleDate?: IScheduleDate | null;
  shippingMethodName?: string;
  paymentMethodName?: string;
  email?: string;
  errors?: IFormError[];
  creditCardProvider: CCProviders;
}
