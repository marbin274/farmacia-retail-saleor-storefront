import { SORT_OPTIONS } from '@app/utils/sorts';
import { Loader, MetaWrapper } from '@components/atoms';
import { NotFound } from '@pages';
import { useCart, useSearchProducts } from '@sdk/react';
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from '@temp/@next/components/molecules/ProductTileAUNA/types';
import { useMediaScreen } from '@temp/@next/globalStyles';
import { useBrandFilters } from '@temp/@next/hooks/useBrandFilters';
import { useDistrictSelected } from '@temp/@next/hooks/useDistrictSelected';
import { getFiltersInitial } from '@temp/@next/utils/filter';
import { META_DEFAULTS } from '@temp/core/config';
import {
  convertSortByFromString,
  convertToAttributeScalar,
  maybe,
} from '@temp/core/utils';
import { convertToFilterSideBar } from '@temp/core/utils/filters';
import { IFilters } from '@types';
import { useRouter } from 'next/router';
import * as React from 'react';
import Page from './Page';

const getPageSize = (isMobile: boolean): number => {
  return isMobile ? 8 : 12;
};

export const SearchPage: React.FC = () => {
  const [districtSelected] = useDistrictSelected();
  const { query } = useRouter();
  const [search, setSearch] = React.useState<string>(query.q as string);
  const {
    currentFilters,
    checkedFilters,
    page,
    sort,
    applyFilters,
    clearFilters,
    goToFirstPage,
    hasFilterChanged,
    handlePageChange,
    onFiltersChangeLocal,
    onFiltersChangeRemote,
    resetFilters,
  } = useBrandFilters();

  React.useEffect(() => {
    if (search !== (query.q as string)) {
      setSearch(query.q as string);
    }
  }, [query]);

  const currentFiltersPaged: IFilters = React.useMemo(
    () => getFiltersInitial(currentFilters, sort),
    [currentFilters, sort]
  );

  const checkedFiltersPaged: IFilters = React.useMemo(
    () => getFiltersInitial(checkedFilters, sort),
    [checkedFilters, sort]
  );

  const variables = {
    ...currentFiltersPaged,
    attributes: currentFiltersPaged.attributes
      ? convertToAttributeScalar(currentFiltersPaged.attributes)
      : {},
    id: undefined,
    query: search || '',
    page: page || 1,
    sortBy: convertSortByFromString(currentFiltersPaged.sortBy),
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
          activeSortOption={currentFiltersPaged.sortBy}
          activeFilters={
            currentFiltersPaged!.attributes
              ? Object.keys(currentFiltersPaged!.attributes).length
              : 0
          }
          addToCart={addToCart}
          applyFilters={applyFilters}
          attributes={convertToFilterSideBar(data.attributes)}
          checkedFiltersPaged={checkedFiltersPaged}
          clearFilters={clearFilters}
          currentFiltersPaged={currentFiltersPaged}
          displayLoader={loading}
          hasFilterChanged={hasFilterChanged}
          hasNextPage={maybe<boolean>(
            () => data.paginatedProducts?.pageInfo.hasNextPage,
            false
          )}
          items={productsOnCart}
          onAttributeFiltersChangeLocal={onFiltersChangeLocal}
          onAttributeFiltersChangeRemote={onFiltersChangeRemote}
          onOrder={goToFirstPage}
          onPageChange={handlePageChange}
          products={data.paginatedProducts}
          removeItemToCart={removeItemToCart}
          resetFilters={resetFilters}
          setSearch={setSearch}
          search={query.q as string}
          sortOptions={SORT_OPTIONS}
          subtractItemToCart={subtractItemToCart}
          page={page || 1}
          pageSize={getPageSize(isMobileScreen)}
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
