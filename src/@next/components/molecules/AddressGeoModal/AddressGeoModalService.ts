import { Subject } from "rxjs";

const subject = new Subject<boolean>();
export const addressGeoModalService= {
  clear: () => subject.next(),
  on: () => subject.asObservable(),
  show: (payload: boolean) => subject.next(payload),
};
