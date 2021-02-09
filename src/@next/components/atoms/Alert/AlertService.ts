import { Subject } from "rxjs";

const subject = new Subject();
// TODO: sendAlert pasar un objeto y no como parámetros
export const alertService = {
  clearAlert: () => subject.next(),
  onAlert: () => subject.asObservable(),
  sendAlert: (
    buttonText: string,
    message: string,
    title: string,
    icon?: any,
    redirectionLink?: string
  ) => subject.next({ message, title, icon, buttonText, redirectionLink }),
};
