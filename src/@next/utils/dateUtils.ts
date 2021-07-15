import { HOURS_TO_FORMAT_DATE, SHIPPING_DISPLAY_FORMAT_DATE } from '@temp/core/config';
import { format } from 'date-fns';
import { getStringToTime } from "@sdk/utils/dateUtils";


export const format24HourTo12Hour = (time:string):string=>{
    if(!time){ return ''};
    const now = getStringToTime(time);
    return format(now, "hh:mm aaaaa'm'");
}

export const convertShippingMethodDateToDate = (date: any): Date => {
    return new Date(`${date}${HOURS_TO_FORMAT_DATE}`);
}

export const formatShippingMethodDateToString = (date?: Date):string => {
    if(!date){ return '';};
    return format(convertShippingMethodDateToDate(date), SHIPPING_DISPLAY_FORMAT_DATE);
}

export const getScheduleTimesFormat = (startTime: any, endTime: any): string => {

    if(!startTime || !endTime){ return ''};

    const newStartTime = format24HourTo12Hour(startTime);
    const newEndTime = format24HourTo12Hour(endTime);
    return `${newStartTime} a ${newEndTime}`;
}


