import { ProductListHeader } from '@app/components/molecules';
import { ProductListAUNA } from '@app/components/organisms';
import { FilterSidebar } from '@app/components/organisms/FilterSidebar';
import { Breadcrumbs } from '@farmacia-retail/farmauna-components';
import { CategoryDetails_category } from '@sdk/queries/gqlTypes/CategoryDetails';
import { CategoryProductsVariables } from '@sdk/queries/gqlTypes/CategoryProducts';
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from '@temp/@next/components/molecules/ProductTileAUNA/types';
import { CategoryNavigation } from '@temp/@next/components/organisms/CategoryNavigation/CategoryNavigation';
import { useMediaScreen } from '@temp/@next/globalStyles';
import { largeScreen } from '@temp/@next/globalStyles/constants';
import { useDistrictSelected, useScrollTo } from '@temp/@next/hooks';
import {
  getFiltersInitial,
  onAttributeFiltersChange,
} from '@temp/@next/utils/filter';
import { IItems } from '@temp/@sdk/api/Cart/types';
import { useCategoryProducts } from '@temp/@sdk/react';
import { baseUrl } from '@temp/app/routes';
import { EmptyProduct, extractBreadcrumbs } from '@temp/components';
import { structuredData } from '@temp/core/SEO/Category/structuredData';
import {
  convertSortByFromString,
  convertToAttributeScalar,
  convertToSimpleProduct,
  maybe,
} from '@temp/core/utils';
import { FilterQuerySet } from '@temp/core/utils/filters';
import { IFilterAttributes, IFilters } from '@types';
import * as React from 'react';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';
import { CategoryProductListHeader, CategoryWrapper } from './styles';

interface SortItem {
  label: string;
  value?: string;
}

type SortOptions = Array<SortItem>;

interface PageProps {
  attributes: IFilterAttributes[];
  category: CategoryDetails_category;
  items: IItems;
  sortOptions: SortOptions;
  addToCart: IAddToCartCallback;
  removeItemToCart: IRemoveItemToCartCallback;
  subtractItemToCart: ISubtractItemToCartCallback;
}

const getPageSize = (isMobile: boolean): number => {
  return isMobile ? 8 : 12;
};

const Page: React.FC<PageProps> = ({
  addToCart,
  attributes,
  category,
  items,
  removeItemToCart,
  sortOptions,
  subtractItemToCart,
}) => {
  const { isMobileScreen } = useMediaScreen();
  const [districtSelected] = useDistrictSelected();
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

  const variables: CategoryProductsVariables = {
    ...filters,
    attributes: filters.attributes
      ? convertToAttributeScalar(filters.attributes)
      : {},
    id: category.id,
    page: page || 1,
    pageSize: getPageSize(isMobileScreen),
    sortBy: convertSortByFromString(filters.sortBy),
    districtId: districtSelected.id,
  };

  const { data: products, loading: categoryProductsLoading } =
    useCategoryProducts(variables);

  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  const hasProducts = canDisplayProducts && !!products.totalCount;
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
    filters &&
    filters.attributes &&
    Object.keys(filters.attributes).reduce(
      (acc, key) =>
        acc.concat(
          filters.attributes[key].map((valueSlug) =>
            getAttribute(key, valueSlug)
          )
        ),
      []
    );

  const clearFilters = () => {
    setQuery({ filters: {} });
  };

  const handlePageChange = (page: number) => {
    setQuery({ page });
  };

  const onFiltersChange = (name: string, value: string) => {
    onAttributeFiltersChange(attributeFilters, filters, name, setQuery, value);
  };

  React.useEffect(() => goTop(), [products]);

  return (
    <CategoryWrapper>
      <div className="collection-container-breadcrumbs">
        <Breadcrumbs
          breadcrumbs={extractBreadcrumbs(category)}
          minDesktopBreakpoint={largeScreen}
          baseUrl={baseUrl}
        />
      </div>
      <div className="collection-container collection-body">
        <script className="structured-data-list" type="application/ld+json">
          {structuredData(category)}
        </script>
        <CategoryNavigation category={category} />
        <section className="collection-products">
          <CategoryProductListHeader>
            <ProductListHeader
              activeSortOption={filters.sortBy}
              openFiltersMenu={() => setShowFilters(true)}
              numberOfProducts={products ? products.totalCount : 0}
              activeFilters={
                filters!.attributes
                  ? Object.keys(filters!.attributes!.brand).length
                  : 0
              }
              activeFiltersAttributes={activeFiltersAttributes}
              clearFilters={clearFilters}
              sortOptions={sortOptions}
              onChangeSortOption={(value) => {
                setQuery({
                  page: 1,
                  sortBy: value.value,
                });
              }}
              onCloseFilterAttribute={onFiltersChange}
            />
          </CategoryProductListHeader>
          <FilterSidebar
            show={showFilters}
            hide={() => setShowFilters(false)}
            onAttributeFiltersChange={onFiltersChange}
            attributes={attributes}
            filters={filters}
          />
          <ProductListAUNA
            addToCart={addToCart}
            columns={3}
            loading={categoryProductsLoading}
            page={variables.page}
            pageSize={variables.pageSize}
            products={products?.edges.map((edge) =>
              convertToSimpleProduct(edge.node)
            )}
            productsOnCart={items}
            onPageChange={handlePageChange}
            removeItemToCart={removeItemToCart}
            subtractItemToCart={subtractItemToCart}
            total={products?.totalCount}
          />
          {!hasProducts && <EmptyProduct title="No hay productos" />}
        </section>
      </div>
    </CategoryWrapper>
  );
};

export default Page;
