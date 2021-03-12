import { ISimpleProduct } from "@app/types/IProduct";
import { IItems } from "@temp/@sdk/api/Cart/types";

export type IAddToCartCallback = (productId: string, quantity: number) => void;
export type IRemoveItemToCartCallback = (productId: string) => void;
export type ISubstractItemToCartCallback = (productId: string) => void;

export interface IProps {
  addToCart?: IAddToCartCallback;
  removeItemToCart?: IRemoveItemToCartCallback;
  substractItemToCart?: ISubstractItemToCartCallback;
  productUrl: string;
  product: ISimpleProduct;
  productsOnCart: IItems;
}
