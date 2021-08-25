import { Checkout_availableShippingMethods_scheduleDates } from '@temp/@sdk/fragments/gqlTypes/Checkout';
import { IShippingMethodUpdate } from '@temp/@sdk/repository';

export interface IKeyValue {
  id?: string;
  description?: string;
}

interface IBaseProps {
  dateSelected?: Date;
  id: string;
  errors: any;
  isScheduled: boolean | null;
  selected: boolean;
  setFieldValue: (field: string, value: any) => void;
  setShippingMethod: (value: IShippingMethodUpdate) => void;
}

export interface ICheckoutShippingProgrammedProps extends IBaseProps {
  scheduleSelected?: string;
  scheduleDates: Array<Checkout_availableShippingMethods_scheduleDates | null> | null;
}

export interface ICheckoutShippingProgrammedSlotProps extends IBaseProps {
  scheduleDates?: ISlotScheduleDate[];
  scheduleTimeId?: string;
  selectedSlotId?: string;
}

export interface ISlotScheduleTime {
  id: string;
  startTime: any;
  endTime: any;
  scheduleTimeId: string;
  date: string;
}

export interface ISlotScheduleDate {
  scheduleTimes: ISlotScheduleTime[];
}
