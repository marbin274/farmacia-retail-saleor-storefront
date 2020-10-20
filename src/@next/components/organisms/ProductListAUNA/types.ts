import { ISimpleProduct } from "@app/types/IProduct";
import { IAddToCartCallback } from "@components/molecules/ProductTileAUNA/types";

export interface IProps {
  addToCart?: IAddToCartCallback,
  products: ISimpleProduct[];
  canLoadMore?: boolean;
  loading?: boolean;
  onLoadMore?: () => void;
}
