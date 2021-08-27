import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from '@temp/@next/components/molecules/ProductTileAUNA/types';
import { IItems } from '@temp/@sdk/api/Cart/types';
import {
  FeaturedProducts_personalized,
  FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node,
} from '@temp/@sdk/queries/gqlTypes/FeaturedProducts';

export interface IProps {
  productsOnCart: IItems;
  title?: string;
  addToCart: IAddToCartCallback;
  removeItemToCart: IRemoveItemToCartCallback;
  subtractItemToCart: ISubtractItemToCartCallback;
}

export interface IHomePageCollecction {
  id: string;
  name: string;
  fromHome?: boolean;
  products?:
    | FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node[]
    | FeaturedProducts_personalized[];
}
