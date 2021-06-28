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
    scheduleDates?: ISlotScheduleDate[];
    setFieldValue: (field: string, value: any) => void;
    setShippingMethod: (value: IShippingMethodUpdate) => void
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
