import React, { FC } from "react";
import { RouteComponentProps } from "react-router";
import { IFilters } from "@types";
import { StringParam, useQueryParams, NumberParam } from "use-query-params";
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
import { TypedCategoryProductsQuery } from "./queries";
import { useCart } from "@sdk/react";
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from "@temp/@next/components/molecules/ProductTileAUNA/types";
import { CategoryVariables } from "./gqlTypes/Category";
import Media from "react-media";
import { smallScreen } from "@temp/@next/globalStyles/constants";
import { useDistrictSelected } from "@temp/@next/hooks/useDistrictSelected";

type ViewProps = RouteComponentProps<{
  id: string;
  slug: string;
}>;

const DEFAULT_SORT = "-stock";

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

export const View: FC<ViewProps> = ({ match }) => {
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

  const variables: CategoryVariables = {
    ...filters,
    attributes: filters.attributes
      ? convertToAttributeScalar(filters.attributes)
      : {},
    id: getGraphqlIdFromDBId(match.params.id, "Category"),
    page: page || 1,
    sortBy: convertSortByFromString(filters.sortBy),
    districtId: districtSelected.id,
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
            <TypedCategoryProductsQuery
              variables={{ ...variables, pageSize: getPageSize(matches) }}
              errorPolicy="all"
              loaderFull
            >
              {({ loading, data }) => {
                const canDisplayFilters = maybe(
                  () => !!data.attributes.edges && !!data.category.name,
                  false
                );

                if (canDisplayFilters) {
                  return (
                    <MetaWrapper
                      meta={{
                        description: data.category.seoDescription,
                        title: data.category.seoTitle,
                        type: "product.category",
                      }}
                    >
                      <Page
                        clearFilters={clearFilters}
                        attributes={data.attributes.edges.map(
                          edge => edge.node
                        )}
                        category={data.category}
                        displayLoader={loading}
                        sortOptions={sortOptions}
                        activeSortOption={filters.sortBy}
                        filters={filters}
                        products={data.paginatedProducts}
                        shop={data.shop}
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
                        items={items}
                        removeItemToCart={removeItemToCart}
                        subtractItemToCart={subtractItemToCart}
                        page={page || 1}
                        pageSize={getPageSize(matches)}
                        onPageChange={handlePageChange}
                        total={data.paginatedProducts.totalCount}
                        isSmallScreen={matches}
                      />
                    </MetaWrapper>
                  );
                }

                if (data && data.category === null) {
                  return <NotFound />;
                }

                if (!isOnline) {
                  return <OfflinePlaceholder />;
                }
              }}
            </TypedCategoryProductsQuery>
          )}
        </Media>
      )}
    </NetworkStatus>
  );
};

export default View;
