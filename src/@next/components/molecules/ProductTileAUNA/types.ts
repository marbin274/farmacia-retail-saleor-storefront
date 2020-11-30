import { ISimpleProduct } from "@app/types/IProduct";
import { IItems } from "@temp/@sdk/api/Cart/types";

export type IAddToCartCallback = (productId: string, quantity: number) => void;

export interface IProps {
  product: ISimpleProduct;
  addToCart?: IAddToCartCallback;
  linkProduct: string;
  items: IItems;
}
