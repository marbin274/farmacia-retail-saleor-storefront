export const diffHours = (dt2: Date, dt1: Date) => {

    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return diff;

}

export const getStringToTime = (time:string):Date=>{
    const hour = time.substr(0, 2);
    const minute = time.substr(3, 2);
    const now = new Date();
    now.setHours(parseInt(hour, 10));
    now.setMinutes(parseInt(minute, 10));
    return now;
}