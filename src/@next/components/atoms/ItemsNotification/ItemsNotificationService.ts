import { ISimpleProduct } from "@temp/@next/types/IProduct";
import { Subject } from "rxjs";
import { IItemsNotificationServiceProps } from "./types";

const subject = new Subject<IItemsNotificationServiceProps>();
export const itemNotificationsService = {
  clearNotifications: () => subject.next(),
  onNotifications: () => subject.asObservable(),
  sendNotifications: (product: ISimpleProduct, quantity: number) => {
    subject.next({ product, quantity });
  },
};
