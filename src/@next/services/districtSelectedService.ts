
import { ISelecValue } from "@temp/@sdk/repository";
import { Subject } from "rxjs";

const subject = new Subject<ISelecValue>();
export const districtSelectedService = {
    clear: () => subject.next(),
    on: () => subject.asObservable(),
    setDistrict: (payload: ISelecValue) => subject.next(payload),
};
