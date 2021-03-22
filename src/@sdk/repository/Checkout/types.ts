import { LocalRepository } from "../LocalRepository";
import { ICheckoutModel, ICheckoutModelLineVariantLocalStorage } from "../types";

export interface ICheckoutRepositoryManager {
  getRepository: () => LocalRepository;
  addItemToCart: (variant: ICheckoutModelLineVariantLocalStorage, quantity: number) => ICheckoutModel | null;
  removeItemFromCart: (variantId: string) => ICheckoutModel | null;
  subtractItemFromCart: (variantId: string) => ICheckoutModel | null;
  updateItemInCart: (
    variantId: string,
    quantity: number
  ) => ICheckoutModel | null;
}
