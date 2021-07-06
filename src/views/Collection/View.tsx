import * as React from "react";
import { RouteComponentProps } from "react-router";

import { IFilters } from "@types";
import { NumberParam, StringParam, useQueryParams } from "use-query-params";
import { MetaWrapper, NotFound, OfflinePlaceholder } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import {
  convertSortByFromString,
  convertToAttributeScalar,
  getGraphqlIdFromDBId,
  maybe,
} from "../../core/utils";
import Page from "./Page";
import { TypedCollectionProductsQuery } from "./queries";
import { convertToFilterSideBar, FilterQuerySet } from "@temp/core/utils/filters";
import { IAddToCartCallback, IRemoveItemToCartCallback, ISubtractItemToCartCallback } from "@temp/@next/components/molecules/ProductTileAUNA/types";
import { useCart } from "@temp/@sdk/react";
import { useDistrictSelected } from "@temp/@next/hooks";
import Media from "react-media";
import { smallScreen } from "@temp/@next/globalStyles/constants";
import { CollectionVariables } from "./gqlTypes/Collection";
import { SORT_OPTIONS } from "@temp/core/utils/sorts";

type ViewProps = RouteComponentProps<{
  id: string;
}>;

const DEFAULT_SORT = "-stock";

export const View: React.FC<ViewProps> = ({ match }) => {
  const [districtSelected] = useDistrictSelected();
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

  const handlePageChange = (page: number) => {
    setQuery({ page });
  };

  const onFiltersChange = (name, value) => {
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
                item => item !== value
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
  const variables: CollectionVariables = {
    ...filters,
    attributes: filters.attributes
      ? convertToAttributeScalar(filters.attributes)
      : {},
    id: getGraphqlIdFromDBId(match.params.id, "Collection"),
    page: page || 1,
    sortBy: convertSortByFromString(filters.sortBy),
    districtId: districtSelected.id,
  };

  const { addItem, items, subtractItem } = useCart();
  const addToCart: IAddToCartCallback = (product, quantity) => {
    addItem(product, quantity);
  };

  const removeItemToCart: IRemoveItemToCartCallback = product => {
    subtractItem(product);
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
          {matches => (
            <TypedCollectionProductsQuery
              variables={{ ...variables, pageSize: getPageSize(matches) }}
              errorPolicy="all"
              loaderFull
            >
              {({ loading, data }) => {
                const canDisplayFilters = maybe(
                  () => !!data.attributes.edges && !!data.collection.name,
                  false
                );

                if (canDisplayFilters) {

                  return (
                    <MetaWrapper
                      meta={{
                        description: data.collection.seoDescription,
                        title: data.collection.seoTitle,
                        type: "product.collection",
                      }}
                    >
                      <Page
                        activeFilters={
                          filters!.attributes
                            ? Object.keys(filters!.attributes!.brand).length
                            : 0
                        }
                        activeSortOption={filters.sortBy}
                        attributes={convertToFilterSideBar(data.attributes)}
                        clearFilters={clearFilters}
                        collection={data.collection}
                        displayLoader={loading}
                        filters={filters}
                        isSmallScreen={matches}
                        items={items}
                        page={page || 1}
                        pageSize={getPageSize(matches)}
                        products={data.paginatedProducts}
                        sortOptions={SORT_OPTIONS}
                        total={data.paginatedProducts.totalCount}
                        addToCart={addToCart}
                        removeItemToCart={removeItemToCart}
                        subtractItemToCart={subtractItemToCart}
                        onAttributeFiltersChange={onFiltersChange}
                        onOrder={value => {
                          setQuery({
                            page: 1,
                            sortBy: value.value,
                          });
                        }}
                        onPageChange={handlePageChange}
                      />
                    </MetaWrapper>
                  );
                }

                if (data && data.collection === null) {
                  return <NotFound />;
                }

                if (!isOnline) {
                  return <OfflinePlaceholder />;
                }
              }}
            </TypedCollectionProductsQuery>
          )}
        </Media>
      )}
    </NetworkStatus>
  );
};

export default View;
