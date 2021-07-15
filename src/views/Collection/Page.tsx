import { Breadcrumbs } from "@farmacia-retail/farmauna-components";
import { IPaginationProps } from "@temp/@next/components/molecules/Pagination/types";
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from "@temp/@next/components/molecules/ProductTileAUNA/types";
import { largeScreen } from "@temp/@next/globalStyles/constants";
import { IItems } from "@temp/@sdk/api/Cart/types";
import { baseUrl } from "@temp/app/routes";
import { COLLECTION_CATEGORY_FILTER_LABEL } from "@temp/core/config";
import { structuredData } from "@temp/core/SEO/Collection/structuredData";
import { IFilterAttributes, IFilters } from "@types";
import * as React from "react";
import { ProductListHeader } from "../../@next/components/molecules";
import { ProductListAUNA } from "../../@next/components/organisms";
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
import { CollectionWrapper, HeaderProducts } from "./styles";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {};
interface CategoryOptions extends Array<SortItem> {};

interface PageProps extends IPaginationProps {
  activeFilters: number;
  activeCategoryOptions?: string[];
  activeSortOption: string;
  attributes: IFilterAttributes[];
  categoryOptions: CategoryOptions;
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
  onChangeCategoryOption?: (category: { value?: string; label: string }) => void;
  onChangeSortOption: (order: { value?: string; label: string }) => void;
  removeItemToCart: IRemoveItemToCartCallback;
  subtractItemToCart: ISubtractItemToCartCallback;
}

const Page: React.FC<PageProps> = ({
  addToCart,
  attributes,
  activeFilters,
  activeCategoryOptions,
  activeSortOption,
  categoryOptions,
  clearFilters,
  collection,
  displayLoader,
  filters,
  items,
  onAttributeFiltersChange,
  onPageChange,
  onChangeCategoryOption,
  onChangeSortOption,
  page,
  pageSize,
  products,
  removeItemToCart,
  sortOptions,
  subtractItemToCart,
  total: totalProducts,
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
      activeSecondaryOptions={activeCategoryOptions}
      activeFilters={activeFilters}
      activeFiltersAttributes={activeFiltersAttributes}
      activeSortOption={activeSortOption}
      clearFilters={clearFilters}
      numberOfProducts={products ? products.totalCount : 0}
      onChangeSecondaryOption={onChangeCategoryOption}
      onChangeSortOption={onChangeSortOption}
      onCloseFilterAttribute={onAttributeFiltersChange}
      openFiltersMenu={() => setShowFilters(true)}
      secondaryLabel="Categorias"
      secondaryClearLabel={COLLECTION_CATEGORY_FILTER_LABEL}
      secondaryOptions={categoryOptions}
      showSecondarySelect
      sortOptions={sortOptions}
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
      <HeaderProducts className="collection-container">
        {getProductListHeader()}
      </HeaderProducts>
      <div className="collection-container collection-body">
        <script className="structured-data-list" type="application/ld+json">
          {structuredData(collection)}
        </script>
        <div className="collection-products">
          <FilterSidebar
            show={showFilters}
            hide={() => setShowFilters(false)}
            onAttributeFiltersChange={onAttributeFiltersChange}
            attributes={attributes}
            filters={filters}
          />
          {canDisplayProducts && (
            <ProductListAUNA
              addToCart={addToCart}
              loading={displayLoader}
              page={page}
              pageSize={pageSize}
              products={products.edges.map(edge =>
                convertToSimpleProduct(edge.node)
              )}
              productsOnCart={items}
              onPageChange={onPageChange}
              removeItemToCart={removeItemToCart}
              subtractItemToCart={subtractItemToCart}
              total={totalProducts}
            />
          )}
          {!hasProducts && <EmptyProduct title="No hay productos" />}
        </div>
      </div>
    </CollectionWrapper>
  );
};

export default Page;
