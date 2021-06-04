import { IItems } from "@temp/@sdk/api/Cart/types";
import { IAvailableShippingMethods } from "@temp/@sdk/api/Checkout/types";
import { IShippingMethodUpdate, IScheduleDate, ISlots } from "@temp/@sdk/repository";
import { IFormError } from "@types";


export interface IProps {
  shippingMethods: IAvailableShippingMethods | undefined;
  selectedShippingMethodId?: string;
  scheduleDate?: IScheduleDate | null;
  selectShippingMethod?: (shippingMethodUpdate: IShippingMethodUpdate, clicked: boolean) => void;
  errors?: IFormError[];
  formId?: string;
  formRef?: React.RefObject<HTMLFormElement>;
  items?:IItems;
  selectedSlotId?: string;
  slots?: ISlots;
}

export interface ICheckoutShipping{
  shippingMethod?: string;
  isScheduled: boolean | null;
  dateSelected?: Date;
  selectedSlotId?: string;
  selectedScheduleTimeId?: string;
}
