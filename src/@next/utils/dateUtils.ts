import { format } from 'date-fns';

export const getStringToTime = (time:string):Date=>{
    const hour = time.substr(0, 2);
    const minute = time.substr(3, 2);
    const now = new Date();
    now.setHours(parseInt(hour, 10));
    now.setMinutes(parseInt(minute, 10));
    return now;
}

export const format24HourTo12Hour = (time:string):string=>{
    if(!time){ return ''};
    const now = getStringToTime(time);
    return format(now, "hh:mm aaaaa'm'");
}

export const getScheduleTimesFormat = (startTime: any, endTime: any): string => {

    if(!startTime || !endTime){ return ''};

    const newStartTime = format24HourTo12Hour(startTime);
    const newEndTime = format24HourTo12Hour(endTime);
    return `${newStartTime} a ${newEndTime}`;
}

export const diffHours = (dt2: Date, dt1: Date) => {

    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return diff;

}
