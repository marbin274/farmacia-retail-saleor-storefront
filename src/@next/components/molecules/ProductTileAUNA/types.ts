import { ISimpleProduct } from "@app/types/IProduct";
import { IItems } from "@temp/@sdk/api/Cart/types";
import { ICheckoutModelLineVariantLocalStorage } from '@sdk/repository';

export type IAddToCartCallback = (productId: ICheckoutModelLineVariantLocalStorage, quantity: number) => void;
export type IRemoveItemToCartCallback = (productId: string) => void;
export type ISubtractItemToCartCallback = (productId: string) => void;

export interface IProps {
  addToCart?: IAddToCartCallback;
  removeItemToCart?: IRemoveItemToCartCallback;
  subtractItemToCart?: ISubtractItemToCartCallback;
  isPersonalized?: boolean;
  productUrl: string;
  product: ISimpleProduct;
  productsOnCart: IItems;
}
