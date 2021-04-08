import { IAvailableShippingMethods } from "@temp/@sdk/api/Checkout/types";
import { IShippingMethodUpdate, IScheduleDate } from "@temp/@sdk/repository";
import { IFormError } from "@types";


export interface IProps {
  shippingMethods: IAvailableShippingMethods | undefined;
  selectedShippingMethodId?: string;
  scheduleDate?: IScheduleDate | null;
  selectShippingMethod?: (shippingMethodUpdate: IShippingMethodUpdate, clicked: boolean) => void;
  errors?: IFormError[];
  formId?: string;
  formRef?: React.RefObject<HTMLFormElement>;
}

export interface ICheckoutShipping{
  shippingMethod?: string;
  isScheduled: boolean | null;
  dateSelected?: Date;
  scheduleSelected?: string;
}
