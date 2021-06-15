import { IItems } from "@temp/@sdk/api/Cart/types";
import { IAvailableShippingMethods } from "@temp/@sdk/api/Checkout/types";
import {
  IShippingMethodUpdate,
  IScheduleDate,
  ISlots,
} from "@temp/@sdk/repository";
import { IFormError } from "@types";
import { FormikErrors, FormikTouched } from "formik";
import { ChangeEvent } from "react";
import { ISlotScheduleDate } from "../../molecules/ShippingMethodItem/types";

export interface IProps {
  shippingMethods: IAvailableShippingMethods | undefined;
  selectedShippingMethodId?: string;
  scheduleDate?: IScheduleDate | null;
  selectShippingMethod?: (
    shippingMethodUpdate: IShippingMethodUpdate,
    clicked: boolean
  ) => void;
  errors?: IFormError[];
  formId?: string;
  formRef?: React.RefObject<HTMLFormElement>;
  items?: IItems;
  selectedSlotId?: string;
  slots?: ISlots;
}

export interface ICheckoutShipping {
  shippingMethod?: string;
  isScheduled: boolean | null;
  dateSelected?: Date;
  selectedSlotId?: string;
  selectedScheduleTimeId?: string;
}

export type ISlotShippingMethodItem = {
  slots?: ISlots;
  shippingMethods: IAvailableShippingMethods | undefined;
  values: ICheckoutShipping;
  formikErrors: FormikErrors<ICheckoutShipping>;
  setErrors: (errors: FormikErrors<ICheckoutShipping>) => void;
  touched: FormikTouched<ICheckoutShipping>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<ICheckoutShipping>>;
  setShippingMethod: (value: IShippingMethodUpdate) => void;
  onClick: (
    id: string,
    isScheduled: boolean,
    scheduleDates: ISlotScheduleDate[] | null,
    selected: boolean,
    slotId?: string
  ) => void;
  handleChange: (e: ChangeEvent<any>) => void;
};
