import { Subject } from "rxjs";
import { IAlertServiceProps } from "./types";

const subject = new Subject<IAlertServiceProps>();
export const alertService= {
  clearAlert: () => subject.next(),
  onAlert: () => subject.asObservable(),
  sendAlert: (payload: IAlertServiceProps) => subject.next(payload),
};
