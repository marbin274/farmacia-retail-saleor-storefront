import { IAddress, IFormError } from "@types";
import { CCProviders } from "@components/atoms";
import { IScheduleDate } from "@temp/@sdk/repository";

export interface IProps {
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
