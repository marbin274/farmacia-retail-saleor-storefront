import { IAddressForm } from '@temp/@next/types/IAddressForm';
import { GetPotentialShippingMethods_potentialShippingMethods } from '@temp/@sdk/queries/gqlTypes/GetPotentialShippingMethods';
import { FormikErrors, FormikTouched } from 'formik';
import { IScheduleDates } from '../CheckoutShippingProgrammed/types';

export interface IPotentialShippingMethod
  extends GetPotentialShippingMethods_potentialShippingMethods {
  slotId?: string;
  scheduleDates: IScheduleDates[];
}
export interface IProps {
  fieldErrors: FormikErrors<IAddressForm>;
  shippingMethods: IPotentialShippingMethod[];
  scheduleSelected: string;
  values: IAddressForm;
  registerEvent(): void;
  setFieldValue(field: string, value: any): void;
  setScheduleTime(scheduleTimeId: string, slotId: string): void;
  setValues(values: IAddressForm): void;
  touched: FormikTouched<IAddressForm>;
}
