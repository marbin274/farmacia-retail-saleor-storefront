import { CategoryProducts_paginatedProducts_edges_node } from '@sdk/queries/gqlTypes/CategoryProducts';
import { SearchProducts_paginatedProducts_edges_node } from '@sdk/queries/gqlTypes/SearchProducts';
import { ISimpleProduct } from '@sdk/types/IProduct';
import { IProductVariant } from '@temp/@next/types';
import { FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node } from '@sdk/queries/gqlTypes/FeaturedProducts';
import { ProductDetails_product } from '@sdk/queries/gqlTypes/ProductDetails';
import { SelledProducts_reportProductSales_edges_node_product } from '@sdk/queries/gqlTypes/SelledProducts';
import { SearchResults_products_edges_node } from '@temp/@sdk/queries/gqlTypes/SearchResults';

type IProductQuery =
  | CategoryProducts_paginatedProducts_edges_node
  | FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node
  | ProductDetails_product
  | SearchResults_products_edges_node
  | SelledProducts_reportProductSales_edges_node_product
  | SearchProducts_paginatedProducts_edges_node;

export const convertToSimpleProduct = (
  product: IProductQuery
): ISimpleProduct => {
  const variant: IProductVariant = product?.variants?.[0]
    ? { ...product.variants[0] }
    : { id: '' };
  return { ...product, variant };
};
