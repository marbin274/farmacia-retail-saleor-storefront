import { IProductVariant } from "@temp/@next/types";
import { ISimpleProduct } from "@temp/@next/types/IProduct";
import { ProductDetails_product } from "@temp/@sdk/queries/gqlTypes/ProductDetails";
import { SearchResults_products_edges_node } from "@temp/components/OverlayManager/Search/gqlTypes/SearchResults"
import { FeaturedProducts_shop_homepageCollections_products_edges_node } from "@temp/components/ProductsFeatured/gqlTypes/FeaturedProducts";
import { SelledProducts_reportProductSales_edges_node_product } from "@temp/components/productsSelled/gqlTypes/SelledProducts";
import { Category_paginatedProducts_edges_node } from "@temp/views/Category/gqlTypes/Category";
import { SearchProducts_paginatedProducts_edges_node } from "@temp/views/Search/gqlTypes/SearchProducts";

type IProductQuery =
    Category_paginatedProducts_edges_node
    | FeaturedProducts_shop_homepageCollections_products_edges_node
    | ProductDetails_product
    | SearchResults_products_edges_node
    | SelledProducts_reportProductSales_edges_node_product
    | SearchProducts_paginatedProducts_edges_node
    ;

export const convertToSimpleProduct = (product: IProductQuery): ISimpleProduct => {
    const variant: IProductVariant = product?.variants?.[0] ? { ...product.variants[0] } : { id: '' };
    return { ...product, variant };
}
