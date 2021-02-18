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
import { maybe } from "../../core/utils";
import { Category_category, Category_products } from "./gqlTypes/Category";
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
} from "@temp/@next/components/molecules/ProductTileAUNA/types";
import { CategoryNavigation } from "@temp/@next/components/organisms/CategoryNavigation/CategoryNavigation";
import { MainMenu_shop } from "@temp/components/MainMenu/gqlTypes/MainMenu";
import { IItems } from "@temp/@sdk/api/Cart/types";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps {
  addToCart: IAddToCartCallback;
  removeItemToCart: IRemoveItemToCartCallback;
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  category: Category_category;
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  products: Category_products;
  shop: MainMenu_shop;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onLoadMore: () => void;
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
  hasNextPage,
  clearFilters,
  onLoadMore,
  products,
  shop,
  filters,
  onOrder,
  sortOptions,
  onAttributeFiltersChange,
  items,
  removeItemToCart,
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

  const navigationItems = shop.navigation.main.items.filter(
    item => item.category.id === category.id
  )[0];

  return (
    <div className="category">
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
      <div className="category__container category__body">
        <CategoryNavigation
          subItems={navigationItems ? navigationItems.children : []}
        />
        <section className="category__products">
          <Breadcrumbs breadcrumbs={extractBreadcrumbs(category)} />
          <FilterSidebar
            show={showFilters}
            hide={() => setShowFilters(false)}
            onAttributeFiltersChange={onAttributeFiltersChange}
            attributes={attributes}
            filters={filters}
          />
          {canDisplayProducts && (
            <ProductListAUNA
              products={products.edges.map(edge => edge.node)}
              productsOnCart={items}
              canLoadMore={hasNextPage}
              loading={displayLoader}
              onLoadMore={onLoadMore}
              addToCart={addToCart}
              removeItemToCart={removeItemToCart}
            />
          )}
          {!hasProducts && <EmptyProduct title="No hay productos" />}
        </section>
      </div>
    </div>
  );
};

export default Page;
