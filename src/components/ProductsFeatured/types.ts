import { IAddToCartCallback, IRemoveItemToCartCallback, ISubtractItemToCartCallback } from "@temp/@next/components/molecules/ProductTileAUNA/types";
import { IItems } from "@temp/@sdk/api/Cart/types";

export interface IProps {
    productsOnCart: IItems;
    title?: string;
    addToCart: IAddToCartCallback;
    removeItemToCart: IRemoveItemToCartCallback;
    subtractItemToCart: ISubtractItemToCartCallback;
}
