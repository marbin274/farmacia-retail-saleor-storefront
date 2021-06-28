import * as React from "react";
import { RouteComponentProps } from "react-router";

import { IFilters } from "@types";
import { NumberParam, StringParam, useQueryParam, useQueryParams } from "use-query-params";
import { MetaWrapper, NotFound, OfflinePlaceholder } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { META_DEFAULTS, PRODUCTS_PER_PAGE } from "../../core/config";
import {
  convertSortByFromString,
  convertToAttributeScalar,
  getGraphqlIdFromDBId,
  maybe,
} from "../../core/utils";
import Page, { SortOptions } from "./Page";
import { TypedSearchProductsQuery } from "./queries";
import { useCart } from "@sdk/react";
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from "@temp/@next/components/molecules/ProductTileAUNA/types";
import { useDistrictSelected } from "@temp/@next/hooks/useDistrictSelected";
import Media from "react-media";
import { smallScreen } from "@temp/@next/globalStyles/constants";
import { convertToFilterSideBar, FilterQuerySet } from "@temp/core/utils/filters";

type ViewProps = RouteComponentProps<{
  id: string;
}>;

const DEFAULT_SORT = '-stock';


export const View: React.FC<ViewProps> = ({ match }) => {
  const [districtSelected] = useDistrictSelected();
  const [search, setSearch] = useQueryParam("q", StringParam);
  const [
    { filters: attributeFilters, page, sortBy: sort },
    setQuery,
  ] = useQueryParams({
    filters: FilterQuerySet,
    page: NumberParam,
    sortBy: StringParam,
  });

  const clearFilters = () => {
    setQuery({ filters: {} });
  };

  const onFiltersChange = (name: string, value: string) => {
    if (attributeFilters && attributeFilters.hasOwnProperty(name)) {
      if (attributeFilters[name].includes(value)) {
        if (filters.attributes[`${name}`].length === 1) {
          const att = { ...attributeFilters };
          delete att[`${name}`];
          setQuery({
            filters: { ...att },
          });
        } else {
          setQuery({
            filters: {
              ...attributeFilters,
              [`${name}`]: attributeFilters[`${name}`].filter(
                (item : {}) => item !== value
              ),
            },
          });
        }
      } else {
        setQuery({
          filters: {
            ...attributeFilters,
            [`${name}`]: [...attributeFilters[`${name}`], value],
          },
        });
      }
    } else {
      setQuery({
        filters: {
          ...attributeFilters,
          [`${name}`]: [value],
        },
      });
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
    query: search || '',
    page: page || 1,
    sortBy: convertSortByFromString(filters.sortBy),
    districtId: districtSelected.id,
  };

  const sortOptions: SortOptions = [
    {
      label: "Limpiar...",
    },
    {
      label: "Precio más alto",
      value: "price",
    },
    {
      label: "Precio más bajo",
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

  const handlePageChange = (page: number) => {
    setQuery({ page });
  };

  const addToCart: IAddToCartCallback = (product, quantity) => {
    addItem(product, quantity);
  };

  const removeItemToCart: IRemoveItemToCartCallback = product => {
    removeItem(product);
  };

  const subtractItemToCart: ISubtractItemToCartCallback = product => {
    subtractItem(product);
  };

  const getPageSize = (isMobile: boolean): number => {
    return isMobile ? 8 : 12;
  };

  return (
    <NetworkStatus>
      {isOnline => (
        <Media query={{ maxWidth: smallScreen }}>
        {(matches : any) => (
        <TypedSearchProductsQuery
          variables={{ ...variables, pageSize: getPageSize(matches) }}
          errorPolicy="all"
          loaderFull
        >
          {({ loading, data }) => {

            if (!!data?.attributes?.edges && !!data?.paginatedProducts?.edges) {
              return (
                <MetaWrapper
                  meta={{
                    description: "Resultados de búsqueda",
                    title: META_DEFAULTS.title,
                    type: "product.search",
                  }}
                >
                  <Page
                    clearFilters={clearFilters}
                    attributes={convertToFilterSideBar(data.attributes)}
                    displayLoader={loading}
                    hasNextPage={maybe<boolean>(
                      () => data.paginatedProducts?.pageInfo.hasNextPage,
                      false
                    )}
                    sortOptions={sortOptions}
                    setSearch={setSearch}
                    search={search}
                    activeSortOption={filters.sortBy}
                    filters={filters}
                    products={data.paginatedProducts}
                    productsOnCart={productsOnCart}
                    onAttributeFiltersChange={onFiltersChange}
                    activeFilters={
                      filters!.attributes
                        ? Object.keys(filters!.attributes).length
                        : 0
                    }
                    onOrder={value => {
                      setQuery({
                        page: 1,
                        sortBy: value.value,
                      });
                    }}
                    addToCart={addToCart}
                    removeItemToCart={removeItemToCart}
                    subtractItemToCart={subtractItemToCart}
                    page={page || 1}
                    pageSize={getPageSize(matches)}
                    onPageChange={handlePageChange}
                    total={data?.paginatedProducts?.totalCount || 0}
                  />
                </MetaWrapper>
              );
            }

            if (data && data?.paginatedProducts === null) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
          }}
        </TypedSearchProductsQuery>
      )}
      </Media>
    )}
  </NetworkStatus>
  );
};

export default View;
