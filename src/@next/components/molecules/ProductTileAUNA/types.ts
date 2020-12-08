import { ISimpleProduct } from "@app/types/IProduct";

export type IAddToCartCallback = (productId: string, quantity: number) => void;

export interface IProps {
  addToCart?: IAddToCartCallback;
  linkProduct: string;
  product: ISimpleProduct;
}
