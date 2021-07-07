import { Breadcrumbs, Pagination } from "@farmacia-retail/farmauna-components";
import { IPaginationProps } from "@temp/@next/components/molecules/Pagination/types";
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from "@temp/@next/components/molecules/ProductTileAUNA/types";
import { largeScreen } from "@temp/@next/globalStyles/constants";
import { IItems } from "@temp/@sdk/api/Cart/types";
import { baseUrl } from "@temp/app/routes";
import { structuredData } from "@temp/core/SEO/Collection/structuredData";
import { IFilterAttributes, IFilters } from "@types";
import * as React from "react";
import { ProductListHeader } from "../../@next/components/molecules";
import { ProductListCategoryAuna } from "../../@next/components/organisms";
import { FilterSidebar } from "../../@next/components/organisms/FilterSidebar";
import { EmptyProduct } from "../../components";
import {
  convertToSimpleProduct,
  getDBIdFromGraphqlId,
  maybe,
} from "../../core/utils";
import {
  Collection_collection,
  Collection_paginatedProducts,
} from "./gqlTypes/Collection";
import { CollectionWrapper } from "./styles";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps extends IPaginationProps {
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  collection: Collection_collection;
  displayLoader: boolean;
  filters: IFilters;
  isSmallScreen: boolean;
  items: IItems;
  products: Collection_paginatedProducts;
  sortOptions: SortOptions;
  addToCart: IAddToCartCallback;
  clearFilters: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
  removeItemToCart: IRemoveItemToCartCallback;
  subtractItemToCart: ISubtractItemToCartCallback;
}

const Page: React.FC<PageProps> = ({
  activeFilters,
  activeSortOption,
  attributes,
  collection,
  displayLoader,
  filters,
  items,
  isSmallScreen,
  page,
  pageSize,
  products,
  sortOptions,
  total: totalProducts,
  addToCart,
  clearFilters,
  onAttributeFiltersChange,
  onPageChange,
  onOrder,
  removeItemToCart,
  subtractItemToCart,
}) => {
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  const hasProducts = canDisplayProducts && !!products.totalCount;
  const [showFilters, setShowFilters] = React.useState(false);

  const breadcrumbs = [
    {
      link: [
        `/collection`,
        `/${collection.slug}`,
        `/${getDBIdFromGraphqlId(collection.id, "Collection")}/`,
      ].join(""),
      label: collection.name,
    },
  ];

  const getAttribute = (attributeSlug: string, valueSlug: string) => {
    return {
      attributeSlug,
      valueName: attributes
        .find(({ slug }) => attributeSlug === slug)
        .values.find(({ slug }) => valueSlug === slug).name,
      valueSlug,
    };
  };

  const activeFiltersAttributes =
    filters &&
    filters.attributes &&
    Object.keys(filters.attributes).reduce(
      (acc, key) =>
        acc.concat(
          filters.attributes[key].map(valueSlug => getAttribute(key, valueSlug))
        ),
      []
    );
  
  const getProductListHeader = () => {

    return <ProductListHeader
      activeSortOption={activeSortOption}
      openFiltersMenu={() => setShowFilters(true)}
      numberOfProducts={products ? products.totalCount : 0}
      activeFilters={activeFilters}
      activeFiltersAttributes={activeFiltersAttributes}
      clearFilters={clearFilters}
      sortOptions={sortOptions}
      onChange={onOrder}
      onCloseFilterAttribute={onAttributeFiltersChange}
    />
  }

  return (
    <CollectionWrapper>
      <div className="collection-container-breadcrumbs">
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          minDesktopBreakpoint={largeScreen}
          baseUrl={baseUrl}
        />
      </div>
      <div className="collection-container">
        {isSmallScreen && getProductListHeader()}
      </div>
      <div className="collection-container collection-body">
        <script className="structured-data-list" type="application/ld+json">
          {structuredData(collection)}
        </script>
        <section className="collection-products">
          {!isSmallScreen && getProductListHeader()}
          <FilterSidebar
            show={showFilters}
            hide={() => setShowFilters(false)}
            onAttributeFiltersChange={onAttributeFiltersChange}
            attributes={attributes}
            filters={filters}
          />
          {canDisplayProducts && (
            <>
              <ProductListCategoryAuna
                products={products.edges.map(edge =>
                  convertToSimpleProduct(edge.node)
                )}
                productsOnCart={items}
                loading={displayLoader}
                addToCart={addToCart}
                removeItemToCart={removeItemToCart}
                subtractItemToCart={subtractItemToCart}
              />
              <Pagination
                page={page}
                pageSize={pageSize}
                total={totalProducts}
                onPageChange={onPageChange}
              />
            </>
          )}
          {!hasProducts && <EmptyProduct title="No hay productos" />}
        </section>
      </div>
    </CollectionWrapper>
  );
};

export default Page;
