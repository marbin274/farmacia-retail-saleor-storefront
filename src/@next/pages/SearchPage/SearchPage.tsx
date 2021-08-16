import { SORT_OPTIONS } from '@app/utils/sorts';
import { Loader } from '@components/atoms';
import { useCart, useSearchProducts } from '@sdk/react';
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from '@temp/@next/components/molecules/ProductTileAUNA/types';
import { useMediaScreen } from '@temp/@next/globalStyles';
import { useDistrictSelected } from '@temp/@next/hooks/useDistrictSelected';
import {
  getFiltersInitial,
  onAttributeFiltersChange,
} from '@temp/@next/utils/filter';
import { MetaWrapper, NotFound } from '@temp/components';
import { META_DEFAULTS } from '@temp/core/config';
import {
  convertSortByFromString,
  convertToAttributeScalar,
  getGraphqlIdFromDBId,
  maybe,
} from '@temp/core/utils';
import {
  convertToFilterSideBar,
  FilterQuerySet,
} from '@temp/core/utils/filters';
import { IFilters } from '@types';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  NumberParam,
  StringParam,
  useQueryParam,
  useQueryParams,
} from 'use-query-params';
import Page from './Page';

type ViewProps = RouteComponentProps<{
  id: string;
}>;

const getPageSize = (isMobile: boolean): number => {
  return isMobile ? 8 : 12;
};

export const SearchPage: React.FC<ViewProps> = ({ match }) => {
  const [districtSelected] = useDistrictSelected();
  const [search, setSearch] = useQueryParam('q', StringParam);
  const [{ filters: attributeFilters, page, sortBy: sort }, setQuery] =
    useQueryParams({
      filters: FilterQuerySet,
      page: NumberParam,
      sortBy: StringParam,
    });

  const filters: IFilters = React.useMemo(
    () => getFiltersInitial(attributeFilters, sort),
    [attributeFilters, sort]
  );

  const variables = {
    ...filters,
    attributes: filters.attributes
      ? convertToAttributeScalar(filters.attributes)
      : {},
    id: getGraphqlIdFromDBId(match.params.id, 'Category'),
    query: search || '',
    page: page || 1,
    sortBy: convertSortByFromString(filters.sortBy),
    districtId: districtSelected.id,
  };

  const {
    items: productsOnCart,
    addItem,
    removeItem,
    subtractItem,
  } = useCart();

  const { isMobileScreen } = useMediaScreen();
  const { data, loading } = useSearchProducts({
    ...variables,
    pageSize: getPageSize(isMobileScreen),
  });

  const clearFilters = () => {
    setQuery({ filters: {} });
  };

  const onFiltersChange = (name: string, value: string) => {
    onAttributeFiltersChange(attributeFilters, filters, name, setQuery, value);
  };

  const handlePageChange = (page: number) => {
    setQuery({ page });
  };

  const addToCart: IAddToCartCallback = (product, quantity) => {
    addItem(product, quantity);
  };

  const removeItemToCart: IRemoveItemToCartCallback = (product) => {
    removeItem(product);
  };

  const subtractItemToCart: ISubtractItemToCartCallback = (product) => {
    subtractItem(product);
  };

  if (loading) {
    return <Loader />;
  }

  if (!!data?.attributes?.edges && !!data?.paginatedProducts?.edges) {
    return (
      <MetaWrapper
        meta={{
          description: 'Resultados de búsqueda',
          title: META_DEFAULTS.title,
          type: 'product.search',
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
          sortOptions={SORT_OPTIONS}
          setSearch={setSearch}
          search={search}
          activeSortOption={filters.sortBy}
          filters={filters}
          products={data.paginatedProducts}
          items={productsOnCart}
          onAttributeFiltersChange={onFiltersChange}
          activeFilters={
            filters!.attributes ? Object.keys(filters!.attributes).length : 0
          }
          onOrder={(value) => {
            setQuery({
              page: 1,
              sortBy: value.value,
            });
          }}
          addToCart={addToCart}
          removeItemToCart={removeItemToCart}
          subtractItemToCart={subtractItemToCart}
          page={page || 1}
          pageSize={getPageSize(isMobileScreen)}
          onPageChange={handlePageChange}
          total={data?.paginatedProducts?.totalCount || 0}
        />
      </MetaWrapper>
    );
  }

  if (data && data?.paginatedProducts === null) {
    return <NotFound />;
  }
};

export default SearchPage;
