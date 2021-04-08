import * as React from "react";
import { RouteComponentProps } from "react-router";

import { IFilters } from "@types";
import { StringParam, useQueryParam } from "use-query-params";
import { NotFound, OfflinePlaceholder } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import {
  convertSortByFromString,
  convertToAttributeScalar,
  getGraphqlIdFromDBId,
  maybe,
} from "../../core/utils";
import Page from "./Page";
import { TypedSearchProductsQuery } from "./queries";
import { useCart } from "@sdk/react";
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubstractItemToCartCallback,
} from "@temp/@next/components/molecules/ProductTileAUNA/types";

type ViewProps = RouteComponentProps<{
  id: string;
}>;

const DEFAULT_SORT = '-stock'

export const FilterQuerySet = {
  encode(valueObj) {
    const str = [];
    Object.keys(valueObj).forEach(value => {
      str.push(value + "_" + valueObj[value].join("_"));
    });
    return str.join(".");
  },

  decode(strValue) {
    const obj = {};
    const propsWithValues = strValue.split(".").filter(n => n);
    propsWithValues.map(value => {
      const propWithValues = value.split("_").filter(n => n);
      obj[propWithValues[0]] = propWithValues.slice(1);
    });
    return obj;
  },
};


export const View: React.FC<ViewProps> = ({ match }) => {
  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [search, setSearch] = useQueryParam("q", StringParam);
  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );

  const clearFilters = () => {
    setAttributeFilters({});
  };

  const onFiltersChange = (name, value) => {
    if (attributeFilters && attributeFilters.hasOwnProperty(name)) {
      if (attributeFilters[name].includes(value)) {
        if (filters.attributes[`${name}`].length === 1) {
          const att = { ...attributeFilters };
          delete att[`${name}`];
          setAttributeFilters({
            ...att,
          });
        } else {
          setAttributeFilters({
            ...attributeFilters,
            [`${name}`]: attributeFilters[`${name}`].filter(
              item => item !== value
            ),
          });
        }
      } else {
        setAttributeFilters({
          ...attributeFilters,
          [`${name}`]: [...attributeFilters[`${name}`], value],
        });
      }
    } else {
      setAttributeFilters({ ...attributeFilters, [`${name}`]: [value] });
    }
  };

  const filters: IFilters = {
    attributes: attributeFilters,
    pageSize: PRODUCTS_PER_PAGE,
    priceGte: null,
    priceLte: null,
    sortBy: sort || DEFAULT_SORT,
  };
  const variables = {
    ...filters,
    attributes: filters.attributes
      ? convertToAttributeScalar(filters.attributes)
      : {},
    id: getGraphqlIdFromDBId(match.params.id, "Category"),
    query: search || null,
    sortBy: convertSortByFromString(filters.sortBy),
  };

  const sortOptions = [
    {
      label: "Limpiar...",
      value: null,
    },
    {
      label: "Precio (↑)",
      value: "price",
    },
    {
      label: "Precio (↓)",
      value: "-price",
    },
    {
      label: "Nombre (A-Z)",
      value: "name",
    },
    {
      label: "Nombre (Z-A)",
      value: "-name",
    },
    // TODO: uncomment as soon as we need to extend the cagetory filters
    // {
    //   label: "Last updated Ascending",
    //   value: "updated_at",
    // },
    // {
    //   label: "Last updated Descending",
    //   value: "-updated_at",
    // },
  ];
  const {
    items: productsOnCart,
    addItem,
    removeItem,
    subtractItem,
  } = useCart();
  const addToCart: IAddToCartCallback = (product, quantity) => {
    addItem(product, quantity);
  };

  const removeItemToCart: IRemoveItemToCartCallback = product => {
    removeItem(product);
  };

  const substractItemToCart: ISubstractItemToCartCallback = product => {
    subtractItem(product);
  };

  return (
    <NetworkStatus>
      {isOnline => (
        <TypedSearchProductsQuery
          variables={variables}
          errorPolicy="all"
          loaderFull
        >
          {({ loading, data, loadMore }) => {
            const canDisplayFilters = maybe(
              () => !!data.attributes.edges && !!data.products.edges,
              false
            );

            if (canDisplayFilters) {
              const handleLoadMore = () =>
                loadMore(
                  (prev, next) => ({
                    ...prev,
                    products: {
                      ...prev.products,
                      edges: [...prev.products.edges, ...next.products.edges],
                      pageInfo: next.products.pageInfo,
                    },
                  }),
                  { after: data.products.pageInfo.endCursor }
                );

              return (
                <Page
                  clearFilters={clearFilters}
                  attributes={data.attributes.edges.map(edge => edge.node)}
                  displayLoader={loading}
                  hasNextPage={maybe(
                    () => data.products.pageInfo.hasNextPage,
                    false
                  )}
                  sortOptions={sortOptions}
                  setSearch={setSearch}
                  search={search}
                  activeSortOption={filters.sortBy}
                  filters={filters}
                  products={data.products}
                  productsOnCart={productsOnCart}
                  onAttributeFiltersChange={onFiltersChange}
                  onLoadMore={handleLoadMore}
                  activeFilters={
                    filters!.attributes
                      ? Object.keys(filters!.attributes).length
                      : 0
                  }
                  onOrder={value => {
                    setSort(value.value);
                  }}
                  addToCart={addToCart}
                  removeItemToCart={removeItemToCart}
                  substractItemToCart={substractItemToCart}
                />
              );
            }

            if (data && data.products === null) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
          }}
        </TypedSearchProductsQuery>
      )}
    </NetworkStatus>
  );
};

export default View;
