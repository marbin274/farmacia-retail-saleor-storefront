import {
  ICheckoutModel,
  ICheckoutModelLine,
  ICheckoutModelLineVariantLocalStorage,
  ICheckoutModelPrice,
  ICheckoutModelPriceValue,
} from "@sdk/repository";

import { GetCartLinesResult, PromiseQueuedResponse } from "../types";

export type IItems = ICheckoutModelLine[] | null | undefined;
export type ITotalPrice = ICheckoutModelPrice | null | undefined;
export type ISubtotalPrice = ICheckoutModelPrice | null | undefined;
export type IShippingPrice = ICheckoutModelPriceValue | null | undefined;
export type IDiscount = ICheckoutModelPriceValue | null | undefined;

export interface ISaleorCartAPI {
  loaded: boolean;
  items?: IItems;
  totalPrice?: ITotalPrice;
  subtotalPrice?: ISubtotalPrice;
  shippingPrice?: IShippingPrice;
  discount?: IDiscount;
  addItem: (variant:ICheckoutModelLineVariantLocalStorage, quantity: number) => PromiseQueuedResponse;
  getCartLines: () => Promise<GetCartLinesResult>;
  refreshCheckout: (checkout: ICheckoutModel | undefined)  => void; 
  load: () => PromiseQueuedResponse;
  removeItem: (variantId: string) => PromiseQueuedResponse;
  subtractItem: (variantId: string) => PromiseQueuedResponse;
  updateItem: (variantId: string, quantity: number) => PromiseQueuedResponse;
  updateCartLines: (lines: ICheckoutModelLine[]) => void;
}
