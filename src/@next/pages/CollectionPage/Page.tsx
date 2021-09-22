import { ProductListHeader } from '@app/components/molecules';
import { ProductListAUNA } from '@app/components/organisms';
import { FilterSidebar } from '@app/components/organisms/FilterSidebar';
import { Breadcrumbs } from '@farmacia-retail/farmauna-components';
import { CollectionCategories_collection } from '@sdk/queries/gqlTypes/CollectionCategories';
import { CollectionProductsVariables } from '@sdk/queries/gqlTypes/CollectionProducts';
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from '@temp/@next/components/molecules/ProductTileAUNA/types';
import { useMediaScreen } from '@temp/@next/globalStyles';
import { largeScreen } from '@temp/@next/globalStyles/constants';
import { useDistrictSelected, useScrollTo } from '@temp/@next/hooks';
import { useBrandFilters } from '@temp/@next/hooks/useBrandFilters';
import { getFiltersInitial } from '@temp/@next/utils/filter';
import { IItems } from '@temp/@sdk/api/Cart/types';
import { useCollectionProducts } from '@temp/@sdk/react';
import { baseUrl } from '@temp/app/routes';
import { EmptyProduct } from '@components/molecules';
import { COLLECTION_CATEGORY_FILTER_LABEL } from '@temp/core/config';
import { structuredData } from '@temp/core/SEO/Collection/structuredData';
import {
  convertSortByFromString,
  convertToAttributeScalar,
  convertToSimpleProduct,
  getDBIdFromGraphqlId,
  maybe,
} from '@temp/core/utils';
import { IFilterAttributes, IFilters } from '@types';
import * as React from 'react';
import { CollectionWrapper, HeaderProducts } from './styles';
import { getLocationForCollections } from '@temp/@sdk/gaConfig';

interface SortItem {
  label: string;
  value?: string;
}

type SortOptions = Array<SortItem>;
type CategoryOptions = Array<SortItem>;

interface PageProps {
  attributes: IFilterAttributes[];
  categoryOptions: CategoryOptions;
  collection: CollectionCategories_collection;
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
  categoryOptions,
  collection,
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
    setQuery,
    category,
  } = useBrandFilters();

  const currentFiltersPaged: IFilters = React.useMemo(
    () => getFiltersInitial(currentFilters, sort),
    [currentFilters, sort]
  );

  const checkedFiltersPaged: IFilters = React.useMemo(
    () => getFiltersInitial(checkedFilters, sort),
    [checkedFilters, sort]
  );

  const variables: CollectionProductsVariables = {
    ...currentFiltersPaged,
    attributes: currentFiltersPaged.attributes
      ? convertToAttributeScalar(currentFiltersPaged.attributes)
      : {},
    districtId: districtSelected.id,
    id: collection.id,
    page: page || 1,
    sortBy: convertSortByFromString(currentFiltersPaged.sortBy),
  };

  const filterByCategoryId: string | undefined = maybe(
    () =>
      categoryOptions?.find((it) => it.label === decodeURIComponent(category))
        ?.value,
    undefined
  );

  const variablesWithCategories = {
    ...variables,
    categories: filterByCategoryId && [filterByCategoryId],
    pageSize: getPageSize(isMobileScreen),
  };

  const { data: products, loading: collectionListLoading } =
    useCollectionProducts(variablesWithCategories);

  const canDisplayProducts = maybe(
    () => !!products?.edges && products?.totalCount !== undefined
  );
  const hasProducts = canDisplayProducts && !!products?.totalCount;
  const [showFilters, setShowFilters] = React.useState(false);
  const [collectionGaEventSended, setCollectionGaEventSended] =
    React.useState<boolean>(false);

  const { goTop } = useScrollTo();

  const breadcrumbs = [
    {
      link: [
        `/collection`,
        `/${collection.slug}`,
        `/${getDBIdFromGraphqlId(collection.id, 'Collection')}/`,
      ].join(''),
      label: collection.name,
    },
  ];

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

  React.useEffect(() => {
    if (!collectionGaEventSended) {
      getLocationForCollections(window?.location?.href || '');
      setCollectionGaEventSended(true);
    }
  }, []);

  const applyFilterChanges = () => {
    setShowFilters(false);
    applyFilters();
  };

  const hideFilters = () => {
    setShowFilters(false);
    resetFilters();
  };

  return (
    <CollectionWrapper>
      <div className="collection-container-breadcrumbs">
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          minDesktopBreakpoint={largeScreen}
          baseUrl={baseUrl}
        />
      </div>
      <HeaderProducts className="collection-container">
        <ProductListHeader
          activeSecondaryOptions={variablesWithCategories.categories}
          activeFilters={
            currentFiltersPaged?.attributes?.brand
              ? Object.keys(currentFiltersPaged?.attributes?.brand).length
              : 0
          }
          activeFiltersAttributes={activeFiltersAttributes}
          activeSortOption={currentFiltersPaged.sortBy}
          clearFilters={clearFilters}
          numberOfProducts={products ? products.totalCount : 0}
          onChangeSecondaryOption={(value) => {
            setQuery({
              category: value.label,
              page: 1,
            });
          }}
          onChangeSortOption={goToFirstPage}
          onCloseFilterAttribute={onFiltersChangeRemote}
          openFiltersMenu={() => setShowFilters(true)}
          secondaryLabel="Categorías"
          secondaryClearLabel={COLLECTION_CATEGORY_FILTER_LABEL}
          secondaryOptions={categoryOptions}
          showSecondarySelect
          sortOptions={sortOptions}
        />
      </HeaderProducts>
      <div className="collection-container collection-body">
        <script className="structured-data-list" type="application/ld+json">
          {structuredData(collection)}
        </script>
        <section className="collection-products">
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
            loading={collectionListLoading}
            columns={3}
            page={variablesWithCategories.page}
            pageSize={variablesWithCategories.pageSize}
            products={products?.edges.map((edge) =>
              convertToSimpleProduct(edge.node)
            )}
            productsOnCart={items}
            onPageChange={handlePageChange}
            removeItemToCart={removeItemToCart}
            subtractItemToCart={subtractItemToCart}
            total={products?.totalCount}
          />
          {!hasProducts && !collectionListLoading && (
            <EmptyProduct title="No hay productos" />
          )}
        </section>
      </div>
    </CollectionWrapper>
  );
};

export default Page;
