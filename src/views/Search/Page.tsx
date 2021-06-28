import { IPaginationProps } from "@temp/@next/components/molecules/Pagination/types";
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback
} from "@temp/@next/components/molecules/ProductTileAUNA/types";
import { IItems } from "@temp/@sdk/api/Cart/types";
import * as appPaths from "@temp/app/routes";
import { convertToSimpleProduct, maybe } from "@temp/core/utils";
import { IFilterAttributes, IFilters } from "@types";
import * as React from "react";
import { Link } from "react-router-dom";
import { Pagination } from "@farmacia-retail/farmauna-components";
import { ProductListHeaderSearch } from "../../@next/components/molecules";
import { ProductListAUNA } from "../../@next/components/organisms";
import { FilterSidebar } from "../../@next/components/organisms/FilterSidebar";
import { SearchProducts_paginatedProducts } from "./gqlTypes/SearchProducts";
import "./scss/index.scss";

interface SortItem {
  label: string;
  value?: string;
}

export interface SortOptions extends Array<SortItem> {}

interface PageProps extends IPaginationProps {
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  search?: string;
  setSearch?: (
    newValue: string,
    updateType?: "replace" | "replaceIn" | "push" | "pushIn"
  ) => void;
  products: SearchProducts_paginatedProducts;
  productsOnCart: IItems;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
  addToCart: IAddToCartCallback;
  removeItemToCart: IRemoveItemToCartCallback;
  subtractItemToCart: ISubtractItemToCartCallback;
}

const Page: React.FC<PageProps> = ({
  activeFilters,
  activeSortOption,
  attributes,
  search,
  setSearch,
  displayLoader,
  hasNextPage,
  clearFilters,
  products,
  productsOnCart,
  filters,
  onOrder,
  sortOptions,
  onAttributeFiltersChange,
  addToCart,
  removeItemToCart,
  subtractItemToCart,
  page,
  total: totalProducts,
  pageSize,
  onPageChange,
}) => {
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  const [showFilters, setShowFilters] = React.useState(false);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

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

    React.useEffect(() =>
      searchContainerRef?.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    , [products]);

  return (
    <div 
      className="category"
      ref={searchContainerRef}
    >
      <div className="search-page container">
        <FilterSidebar
          show={showFilters}
          hide={() => setShowFilters(false)}
          onAttributeFiltersChange={onAttributeFiltersChange}
          attributes={attributes}
          filters={filters}
        />
        {products.totalCount > 0 ? (
          <div>
            <div className="product_list_container">
              <ProductListHeaderSearch
                activeSortOption={activeSortOption}
                activeFilters={activeFilters}
                activeFiltersAttributes={activeFiltersAttributes}
                clearFilters={clearFilters}
                hideFilters
                openFiltersMenu={() => setShowFilters(true)}
                numberOfProducts={products?.totalCount ? products.totalCount : 0}
                sortOptions={sortOptions}
                onChange={onOrder}
                onCloseFilterAttribute={onAttributeFiltersChange}
              />
            </div>
          </div>
        ) : (
          <div className="no_products">
            <span> Productos encontrados</span> <span>"0"</span>
          </div>
        )}

        <div className="go_home_div">
          <Link to={appPaths.baseUrl}>Atrás</Link>
        </div>
        {canDisplayProducts && (
          <>
            <ProductListAUNA
              products={products.edges.map((edge) => convertToSimpleProduct(edge.node))}
              productsOnCart={productsOnCart}
              canLoadMore={hasNextPage}
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
              className="category__pagination"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
