import { ICheckout } from "@temp/@sdk/api/Checkout/types";

export interface Iprops {
  checkout: ICheckout | undefined;
}
export interface LineDeliveryData {
  label?: string | null;
  text: string | null | undefined;
}
export interface TitleDelivery{
  children: React.ReactNode;
}


