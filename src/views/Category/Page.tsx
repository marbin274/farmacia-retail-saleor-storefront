import { Breadcrumbs, Pagination } from "@farmacia-retail/farmauna-components";
import { IPaginationProps } from "@temp/@next/components/molecules/Pagination/types";
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from "@temp/@next/components/molecules/ProductTileAUNA/types";
import { CategoryNavigation } from "@temp/@next/components/organisms/CategoryNavigation/CategoryNavigation";
import { largeScreen } from "@temp/@next/globalStyles/constants";
import { useScrollTo } from "@temp/@next/hooks";
import { IItems } from "@temp/@sdk/api/Cart/types";
import { useUserDetails } from "@temp/@sdk/react";
import { baseUrl } from "@temp/app/routes";
import { structuredData } from "@temp/core/SEO/Category/structuredData";
import { convertToSimpleProduct, maybe } from "@temp/core/utils";
import { IFilterAttributes, IFilters } from "@types";
import * as React from "react";
import { ProductListHeader } from "../../@next/components/molecules";
import { ProductListCategoryAuna } from "../../@next/components/organisms";
import { FilterSidebar } from "../../@next/components/organisms/FilterSidebar";
import { EmptyProduct, extractBreadcrumbs } from "../../components";
import {
  Category_category,
  Category_paginatedProducts,
} from "./gqlTypes/Category";
import { CategoryProductListHeader, CategoryWrapper } from "./styles";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps extends IPaginationProps {
  addToCart: IAddToCartCallback;
  removeItemToCart: IRemoveItemToCartCallback;
  subtractItemToCart: ISubtractItemToCartCallback;
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  category: Category_category;
  displayLoader: boolean;
  filters: IFilters;
  isLargeScreen: boolean;
  products: Category_paginatedProducts;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
  items: IItems;
}

const Page: React.FC<PageProps> = ({
  addToCart,
  activeFilters,
  activeSortOption,
  attributes,
  category,
  displayLoader,
  clearFilters,
  isLargeScreen,
  products,
  filters,
  onOrder,
  sortOptions,
  onAttributeFiltersChange,
  items,
  onPageChange,
  page,
  pageSize,
  removeItemToCart,
  total: totalProducts,
  subtractItemToCart,
}) => {
  const { data: user } = useUserDetails();
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  const hasProducts = canDisplayProducts && !!products.totalCount;
  const [showFilters, setShowFilters] = React.useState(false);
  const { goTop } = useScrollTo();

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

  React.useEffect(() => goTop(),
    [products]
  );

  return (
    <CategoryWrapper>
      <div className="collection-container-breadcrumbs">
        <Breadcrumbs
          breadcrumbs={extractBreadcrumbs(category)}
          minDesktopBreakpoint={largeScreen}
          baseUrl={baseUrl}
        />
      </div>
      <div className="collection-container collection-body">
        <script className="structured-data-list" type="application/ld+json">
          {structuredData(category)}
        </script>
        <CategoryNavigation category={category} />
        <section className="collection-products">
          <CategoryProductListHeader>
            <ProductListHeader
              activeSortOption={activeSortOption}
              openFiltersMenu={() => setShowFilters(true)}
              numberOfProducts={products ? products.totalCount : 0}
              activeFilters={activeFilters}
              activeFiltersAttributes={activeFiltersAttributes}
              clearFilters={clearFilters}
              sortOptions={sortOptions}
              onChangeSortOption={onOrder}
              onCloseFilterAttribute={onAttributeFiltersChange}
            />
          </CategoryProductListHeader>
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
                user={user}
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
    </CategoryWrapper>
  );
};

export default Page;
