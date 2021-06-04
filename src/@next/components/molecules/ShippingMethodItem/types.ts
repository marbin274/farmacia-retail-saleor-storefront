import { Checkout_availableShippingMethods_price } from "@temp/@sdk/fragments/gqlTypes/Checkout";
import { FormikTouched } from "formik";
import { ICheckoutShipping } from "@components/organisms/CheckoutShipping/types";
import { IShippingMethodUpdate } from "@temp/@sdk/repository";

export interface IProps {
    dateSelected?: Date;
    errors: any;
    id: string;
    index: number;
    isScheduled: boolean | null;
    name: string;
    price: Checkout_availableShippingMethods_price | null;
    selected: boolean;
    scheduleTimeId?: string;
    selectedSlotId?: string;
    subtitle?: string | null;
    scheduleDates?: ISlotScheduleDate[];
    touched: FormikTouched<ICheckoutShipping>
    handleChange: any;
    setErrors:(errors?:any)=>void;
    setFieldValue: (field: string, value: any) => void;
    setShippingMethod: (value: IShippingMethodUpdate) => void;
}

export interface IKeyValue{
    id?:string;
    description?:string;
}


export interface ISlotScheduleTime {
    id: string;
    startTime: any;
    endTime: any;
    scheduleTimeId: string;
}
export interface ISlotScheduleDate {
    date: any | null;
    scheduleTimes: ISlotScheduleTime[];
}
