import { ISimpleProduct } from "@app/types/IProduct";
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubstractItemToCartCallback,
} from "@components/molecules/ProductTileAUNA/types";
import { IItems } from "@temp/@sdk/api/Cart/types";

export interface IProps {
  addToCart?: IAddToCartCallback;
  removeItemToCart?: IRemoveItemToCartCallback;
  substractItemToCart?: ISubstractItemToCartCallback;
  products: ISimpleProduct[];
  canLoadMore?: boolean;
  loading?: boolean;
  onLoadMore?: () => void;
  productsOnCart?: IItems;
}
