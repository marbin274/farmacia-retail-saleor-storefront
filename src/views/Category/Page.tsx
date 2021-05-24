import "./scss/index.scss";
import * as React from "react";
import { IFilterAttributes, IFilters } from "@types";
import {
  Breadcrumbs,
  extractBreadcrumbs,
  EmptyProduct,
} from "../../components";
import { ProductListHeader } from "../../@next/components/molecules";
import { ProductListAUNA } from "../../@next/components/organisms";
import { FilterSidebar } from "../../@next/components/organisms/FilterSidebar";
import { convertToSimpleProduct, maybe } from "@temp/core/utils";
import {
  Category_category,
  Category_paginatedProducts,
} from "./gqlTypes/Category";
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from "@temp/@next/components/molecules/ProductTileAUNA/types";
import { CategoryNavigation } from "@temp/@next/components/organisms/CategoryNavigation/CategoryNavigation";
import { MainMenu_shop } from "@temp/components/MainMenu/gqlTypes/MainMenu";
import { IItems } from "@temp/@sdk/api/Cart/types";
import { Pagination } from "@components/molecules";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps {
  addToCart: IAddToCartCallback;
  removeItemToCart: IRemoveItemToCartCallback;
  subtractItemToCart: ISubtractItemToCartCallback;
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  category: Category_category;
  displayLoader: boolean;
  filters: IFilters;
  isSmallScreen: boolean;
  products: Category_paginatedProducts;
  shop: MainMenu_shop;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
  items: IItems;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  totalProducts: number;
}

const Page: React.FC<PageProps> = ({
  addToCart,
  activeFilters,
  activeSortOption,
  attributes,
  category,
  displayLoader,
  clearFilters,
  isSmallScreen,
  products,
  shop,
  filters,
  onOrder,
  sortOptions,
  onAttributeFiltersChange,
  items,
  onPageChange,
  page,
  pageSize,
  removeItemToCart,
  totalProducts,
  subtractItemToCart,
}) => {
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  const hasProducts = canDisplayProducts && !!products.totalCount;
  const [showFilters, setShowFilters] = React.useState(false);

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

  return (
    <div className="category">
      {isSmallScreen && (
        <ProductListHeader
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
      )}
      <div className="category__container category__body">
        <CategoryNavigation
          category={category}
        />
        <section className="category__products">
          {!isSmallScreen && (
            <ProductListHeader
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
          )}
          <Breadcrumbs
            breadcrumbs={extractBreadcrumbs(category)}
          />
          <FilterSidebar
            show={showFilters}
            hide={() => setShowFilters(false)}
            onAttributeFiltersChange={onAttributeFiltersChange}
            attributes={attributes}
            filters={filters}
          />
          {canDisplayProducts && (
            <>
              <ProductListAUNA
                products={products.edges.map((edge) => convertToSimpleProduct(edge.node))}
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
                className="category__pagination"
              />
            </>
          )}
          {!hasProducts && <EmptyProduct title="No hay productos" />}
        </section>
      </div>
    </div>
  );
};

export default Page;
