import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from '@temp/@next/components/molecules/ProductTileAUNA/types';
import { ISimpleProduct } from '@sdk/types/IProduct';
import { IItems } from '@temp/@sdk/api/Cart/types';
// import { ProductDetails_product } from "@temp/views/Product/gqlTypes/ProductDetails";

export interface IProps {
  productsOnCart: IItems;
  productDetail?: ISimpleProduct;
  title?: string;
  addToCart: IAddToCartCallback;
  removeItemToCart: IRemoveItemToCartCallback;
  subtractItemToCart: ISubtractItemToCartCallback;
}
