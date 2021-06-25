import { Checkout_availableShippingMethods_scheduleDates } from "@temp/@sdk/fragments/gqlTypes/Checkout";
import { IShippingMethodUpdate } from "@temp/@sdk/repository";

export interface IKeyValue{
    id?:string;
    description?:string;
}

export interface IProps {
    dateSelected?: Date;
    errors: any;
    id: string;
    isScheduled: boolean | null;
    selected: boolean;
    scheduleSelected?: string;
    scheduleDates: Array<Checkout_availableShippingMethods_scheduleDates | null> | null;
    setFieldValue: (field: string, value: any) => void;
    setShippingMethod: (value: IShippingMethodUpdate) => void
}
