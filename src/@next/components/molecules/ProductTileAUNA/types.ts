import { ISimpleProduct } from "@app/types/IProduct";
import { IItems } from "@temp/@sdk/api/Cart/types";

export type IAddToCartCallback = (productId: string, quantity: number) => void;

export interface IProps {
  addToCart?: IAddToCartCallback;
  productUrl: string;
  product: ISimpleProduct;
  productsOnCart: IItems;
}
