import { ISimpleProduct } from "@temp/@next/types/IProduct";
import { Subject } from "rxjs";
import { IItemsNotificationServiceProps } from "./types";

const subject = new Subject<IItemsNotificationServiceProps[]>();
let messages: IItemsNotificationServiceProps[] = [];
export const itemNotificationsService = {
  clearNotifications: () => {
    messages = [];
    subject.next();
  },
  onNotifications: () => subject.asObservable(),
  sendNotifications: (product: ISimpleProduct, quantity: number) => {
    if (messages.filter(x => x.product.id === product.id).length) {
      const index = messages.findIndex(x => x.product.id === product.id);
      messages.splice(index, 1);
    }
    messages.push({ product, quantity });
    subject.next(messages);
  },
};
