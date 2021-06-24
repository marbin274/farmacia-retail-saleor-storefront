import { ISimpleProduct } from "@app/types/IProduct";
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from "@components/molecules/ProductTileAUNA/types";
import { IItems } from "@temp/@sdk/api/Cart/types";

export interface IProps {
  addToCart?: IAddToCartCallback;
  removeItemToCart?: IRemoveItemToCartCallback;
  subtractItemToCart?: ISubtractItemToCartCallback;
  products: ISimpleProduct[];
  canLoadMore?: boolean;
  loading?: boolean;
  onLoadMore?: () => void;
  productsOnCart?: IItems;
}