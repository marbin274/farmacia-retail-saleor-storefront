import { IAddressForm } from '@temp/@next/types/IAddressForm';
import {
  GetPotentialShippingMethods_potentialShippingMethods_scheduleDates,
  GetPotentialShippingMethods_potentialShippingMethods_scheduleDates_scheduleTimes,
} from '@temp/@sdk/queries/gqlTypes/GetPotentialShippingMethods';
import { FormikErrors, FormikTouched } from 'formik';

export interface ISchedulesTimes
  extends GetPotentialShippingMethods_potentialShippingMethods_scheduleDates_scheduleTimes {
  slotId?: string;
  scheduleTimeId?: string;
}
export interface IScheduleDates
  extends Omit<
    GetPotentialShippingMethods_potentialShippingMethods_scheduleDates,
    'scheduleTimes'
  > {
  scheduleTimes: ISchedulesTimes[];
}

interface IBaseProps {
  deliveryDate?: Date;
  shippingMethodId: string;
  errors: FormikErrors<IAddressForm>;
  isScheduled: boolean | null;
  selected: boolean;
  setFieldValue: (field: string, value: any) => void;
}

export interface ICheckoutShippingProgrammedProps
  extends Omit<IBaseProps, 'shippingMethodId'> {
  scheduleSelected?: string;
  scheduleDates: Array<IScheduleDates | null> | null;
  setScheduleTime(scheduleTimeId: string, slotId: string): void;
  touched: FormikTouched<IAddressForm>;
}

export interface ICheckoutShippingProgrammedSlotProps extends IBaseProps {
  scheduleDates?: ISlotScheduleDate[];
  scheduleTimeId?: string;
  selectedSlotId?: string;
  touched: FormikTouched<IAddressForm>;
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
