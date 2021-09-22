import { ProductListHeader } from '@app/components/molecules';
import { ProductListAUNA } from '@app/components/organisms';
import { FilterSidebar } from '@app/components/organisms/FilterSidebar';
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
import { useBrandFilters } from '@temp/@next/hooks/useBrandFilters';
import { getFiltersInitial } from '@temp/@next/utils/filter';
import { IItems } from '@temp/@sdk/api/Cart/types';
import { useCategoryProducts } from '@temp/@sdk/react';
import { baseUrl } from '@temp/app/routes';
import { EmptyProduct } from '@components/molecules';

import { extractBreadcrumbs } from '@temp/@next/components/organisms/BreadcrumbsLegacy';

import { structuredData } from '@temp/core/SEO/Category/structuredData';
import {
  convertSortByFromString,
  convertToAttributeScalar,
  convertToSimpleProduct,
  maybe,
} from '@temp/core/utils';
import { IFilterAttributes, IFilters } from '@types';
import * as React from 'react';
import { CategoryProductListHeader, CategoryWrapper } from './styles';
import Breadcrumbs from '@temp/@next/components/organisms/Breadcrumbs/Breadcrumbs';
import { getLocationForCategories } from '@temp/@sdk/gaConfig';

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

  const currentFiltersPaged: IFilters = React.useMemo(
    () => getFiltersInitial(currentFilters, sort),
    [currentFilters, sort]
  );

  const checkedFiltersPaged: IFilters = React.useMemo(
    () => getFiltersInitial(checkedFilters, sort),
    [checkedFilters, sort]
  );

  const variables: CategoryProductsVariables = {
    ...currentFiltersPaged,
    attributes: currentFiltersPaged.attributes
      ? convertToAttributeScalar(currentFiltersPaged.attributes)
      : {},
    id: category.id,
    page: page || 1,
    pageSize: getPageSize(isMobileScreen),
    sortBy: convertSortByFromString(currentFiltersPaged.sortBy),
    districtId: districtSelected.id,
  };

  const { data: products, loading: categoryProductsLoading } =
    useCategoryProducts(variables);

  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  const hasProducts = canDisplayProducts && !!products.totalCount;
  const [showFilters, setShowFilters] = React.useState(false);
  const [categoriesGaEventSended, setCategoriesGaEventSended] =
    React.useState<boolean>(false);
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
    currentFiltersPaged &&
    currentFiltersPaged.attributes &&
    Object.keys(currentFiltersPaged.attributes).reduce(
      (acc, key) =>
        acc.concat(
          currentFiltersPaged.attributes[key].map((valueSlug) =>
            getAttribute(key, valueSlug)
          )
        ),
      []
    );

  React.useEffect(() => goTop(), [products]);

  const applyFilterChanges = () => {
    setShowFilters(false);
    applyFilters();
  };

  const hideFilters = () => {
    setShowFilters(false);
    resetFilters();
  };

  React.useEffect(() => {
    if (!categoriesGaEventSended) {
      setCategoriesGaEventSended(true);
      getLocationForCategories(window?.location?.href || '');
    }
  }, []);

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
              activeSortOption={currentFiltersPaged.sortBy}
              openFiltersMenu={() => setShowFilters(true)}
              numberOfProducts={products ? products.totalCount : 0}
              activeFilters={
                currentFiltersPaged?.attributes?.brand
                  ? Object.keys(currentFiltersPaged?.attributes?.brand).length
                  : 0
              }
              activeFiltersAttributes={activeFiltersAttributes}
              clearFilters={clearFilters}
              sortOptions={sortOptions}
              onChangeSortOption={goToFirstPage}
              onCloseFilterAttribute={onFiltersChangeRemote}
            />
          </CategoryProductListHeader>
          <FilterSidebar
            applyFilters={applyFilterChanges}
            attributes={attributes}
            filters={checkedFiltersPaged}
            hasFilterChanged={hasFilterChanged}
            hide={hideFilters}
            onAttributeFiltersChange={onFiltersChangeLocal}
            show={showFilters}
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
          {!hasProducts && !categoryProductsLoading && (
            <EmptyProduct title="No hay productos" />
          )}
        </section>
      </div>
    </CategoryWrapper>
  );
};

export default Page;
