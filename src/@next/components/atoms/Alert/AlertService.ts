import { Subject } from "rxjs";

const subject = new Subject();

export const alertService = {
  clearAlert: () => subject.next(),
  onAlert: () => subject.asObservable(),
  sendAlert: (
    buttonText: string,
    icon: any,
    message: string,
    title: string,
    redirectionLink?: string
  ) => subject.next({ message, title, icon, buttonText, redirectionLink }),
};
