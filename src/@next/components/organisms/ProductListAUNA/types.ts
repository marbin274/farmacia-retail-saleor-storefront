import { ISimpleProduct } from "@sdk/types/IProduct";
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from "@components/molecules/ProductTileAUNA/types";
import { IItems } from "@temp/@sdk/api/Cart/types";

export interface IProps {
  addToCart?: IAddToCartCallback;
  canLoadMore?: boolean;
  columns?: number;
  loading?: boolean;
  onLoadMore?: () => void;
  onPageChange?: (page: number) => void;
  page: number;
  pageSize: number;
  products: ISimpleProduct[];
  productsOnCart?: IItems;
  removeItemToCart?: IRemoveItemToCartCallback;
  subtractItemToCart?: ISubtractItemToCartCallback;
  total: number;
}
