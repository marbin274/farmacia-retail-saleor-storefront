import { IPaginationProps } from "@temp/@next/components/molecules/Pagination/types";
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from "@temp/@next/components/molecules/ProductTileAUNA/types";
import { IItems } from "@temp/@sdk/api/Cart/types";
import { convertToSimpleProduct, maybe } from "@temp/core/utils";
import { IFilterAttributes, IFilters } from "@types";
import * as React from "react";
import { ProductListHeaderSearch } from "@app/components/molecules";
import { ProductListAUNA } from "@app/components/organisms";
import { FilterSidebar } from "@app/components/organisms/FilterSidebar";
import { SearchProducts_paginatedProducts } from "@sdk/queries/gqlTypes/SearchProducts";

import * as S from "./styles";
import { useScrollTo } from "@temp/@next/hooks";
interface SortItem {
  label: string;
  value?: string;
}

export type SortOptions = Array<SortItem>

interface PageProps extends IPaginationProps {
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  displayLoader: boolean;
  checkedFilters: IFilters;
  currentFilters: IFilters;
  hasNextPage: boolean;
  hasFilterChanged: boolean;
  search?: string;
  setSearch?: (
    newValue: string,
    updateType?: "replace" | "replaceIn" | "push" | "pushIn"
  ) => void;
  products: SearchProducts_paginatedProducts;
  items: IItems;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onAttributeFiltersChangeRemote: (attributeSlug: string, value: string) => void;
  onAttributeFiltersChangeLocal: (attributeSlug: string, value: string) => void;
  resetFilters: () => void;
  applyFilters: () => void;
  onOrder: (order: { value?: string; label: string }) => void;
  addToCart: IAddToCartCallback;
  removeItemToCart: IRemoveItemToCartCallback;
  subtractItemToCart: ISubtractItemToCartCallback;
}

const Page: React.FC<PageProps> = ({
  activeFilters,
  activeSortOption,
  addToCart,
  applyFilters,
  attributes,
  checkedFilters,
  clearFilters,
  currentFilters,
  displayLoader,
  hasFilterChanged,
  items,
  onOrder,
  onAttributeFiltersChangeLocal,
  onAttributeFiltersChangeRemote,
  onPageChange,
  page,
  pageSize,
  products,
  removeItemToCart,
  resetFilters,
  sortOptions,
  subtractItemToCart,
  total: totalProducts,
}) => {
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
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
    currentFilters &&
    currentFilters.attributes &&
    Object.keys(currentFilters.attributes).reduce(
      (acc, key) =>
        acc.concat(
          currentFilters.attributes[key].map(valueSlug => getAttribute(key, valueSlug))
        ),
      []
    );

  React.useEffect(() => goTop(),
    [products]
  );

  const applyFilterChanges = () => {
    setShowFilters(false);
    applyFilters();
  }

  const hideFilters = () => {
    setShowFilters(false);
    resetFilters();
  }

  return (
    <div className="fa-bg-neutral-light fa-z-0">
      <S.SearchPage>
        <FilterSidebar
          show={showFilters}
          hide={hideFilters}
          onAttributeFiltersChange={onAttributeFiltersChangeLocal}
          applyFilters={applyFilterChanges}
          attributes={attributes}
          hasFilterChanged={hasFilterChanged}
          filters={checkedFilters}
        />
        {products.totalCount > 0 ? (
          <S.SearchListHeader>
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
              onCloseFilterAttribute={onAttributeFiltersChangeRemote}
            />
          </S.SearchListHeader>
        ) : (
          <S.SearchNoProducts>
            <span> Productos encontrados</span> <span>"0"</span>
          </S.SearchNoProducts>
        )}
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
      </S.SearchPage>
    </div>
  );
};

export default Page;
