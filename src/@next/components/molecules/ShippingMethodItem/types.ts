import { Checkout_availableShippingMethods_price, Checkout_availableShippingMethods_scheduleDates } from "@temp/@sdk/fragments/gqlTypes/Checkout";
import { FormikTouched } from "formik";
import { ICheckoutShipping } from "@components/organisms/CheckoutShipping/types";

export interface IProps {
    dateSelected?: Date;
    errors: any;
    id: string;
    index: number;
    isScheduled: boolean | null;
    name: string;
    price: Checkout_availableShippingMethods_price | null;
    selected: boolean;
    scheduleSelected?: string;
    subtitle?: string | null;
    scheduleDates: Array<Checkout_availableShippingMethods_scheduleDates | null> | null;
    touched: FormikTouched<ICheckoutShipping>
    handleChange: any;
    setErrors:(errors?:any)=>void;
    setFieldValue: (field: string, value: any) => void;
}

export interface IKeyValue{
    id?:string;
    description?:string;
}
