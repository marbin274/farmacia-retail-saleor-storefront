import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from "@temp/@next/components/molecules/ProductTileAUNA/types";
import { IItems } from "@temp/@sdk/api/Cart/types";
import { IFilterAttributes, IFilters } from "@types";
import * as React from "react";
import ReactSVG from "react-svg";
import { ProductListHeader } from "../../@next/components/molecules";
import { ProductListAUNA } from "../../@next/components/organisms";
import { FilterSidebar } from "../../@next/components/organisms/FilterSidebar";
import { DebounceChange, TextField } from "../../components";
import { maybe } from "../../core/utils";
import { SearchProducts_products } from "./gqlTypes/SearchProducts";
import "./scss/index.scss";
import homeIcon from "images/home.svg";
import rightArrowIcon from "images/right-arrow.svg";
import { Link } from "react-router-dom";
import * as appPaths from "@temp/app/routes";
import { SEARCH_PRODUCTS_QUERY_MIN_LENGTH } from "@temp/core/config";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps {
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
  products: SearchProducts_products;
  productsOnCart: IItems;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onLoadMore: () => void;
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
  onLoadMore,
  products,
  productsOnCart,
  filters,
  onOrder,
  sortOptions,
  onAttributeFiltersChange,
  addToCart,
  removeItemToCart,
  subtractItemToCart,
}) => {
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
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
      <div className="search-page">
        <div className="search-page__header">
          <div className="search-page__header__input container">
            <DebounceChange
              debounce={(evt: React.ChangeEvent<any>) => {
                const query = (evt.target?.value as string);                
                if (!query || query.length < SEARCH_PRODUCTS_QUERY_MIN_LENGTH) {
                  return false;
                }
                setSearch(query.toLowerCase());
              }}
              value={search}
              time={500}
            >
              {({ change, value }) => {
                return (
                  <TextField
                    placeholder="Busca por nombre"
                    autoFocus
                    onChange={change}
                    value={value}
                  />
                );
              }}
            </DebounceChange>
          </div>
        </div>
      </div>
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
            </div>
            <div className="page_breadcrumb">
              <ReactSVG path={homeIcon} />
              <ReactSVG className="arrow_icon" path={rightArrowIcon} />
              <span>Resultado de búsqueda</span>
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
          <ProductListAUNA
            products={products.edges.map(edge => edge.node)}
            productsOnCart={productsOnCart}
            canLoadMore={hasNextPage}
            loading={displayLoader}
            onLoadMore={onLoadMore}
            addToCart={addToCart}
            removeItemToCart={removeItemToCart}
            subtractItemToCart={subtractItemToCart}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
