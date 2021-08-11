import { ProductListHeader } from '@app/components/molecules';
import { ProductListAUNA } from '@app/components/organisms';
import { FilterSidebar } from '@app/components/organisms/FilterSidebar';
import { Breadcrumbs } from '@farmacia-retail/farmauna-components';
import { CollectionCategories_collection } from '@sdk/queries/gqlTypes/CollectionCategories';
import { CollectionProductsVariables } from '@sdk/queries/gqlTypes/CollectionProducts';
import { IPaginationProps } from '@temp/@next/components/molecules/Pagination/types';
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from '@temp/@next/components/molecules/ProductTileAUNA/types';
import { useMediaScreen } from '@temp/@next/globalStyles';
import { largeScreen } from '@temp/@next/globalStyles/constants';
import { useDistrictSelected, useScrollTo } from '@temp/@next/hooks';
import { IItems } from '@temp/@sdk/api/Cart/types';
import { useCollectionProducts } from '@temp/@sdk/react';
import { baseUrl } from '@temp/app/routes';
import { EmptyProduct } from '@temp/components';
import {
  COLLECTION_CATEGORY_FILTER_LABEL,
  PRODUCTS_PER_PAGE,
} from '@temp/core/config';
import { structuredData } from '@temp/core/SEO/Collection/structuredData';
import {
  convertSortByFromString,
  convertToAttributeScalar,
  convertToSimpleProduct,
  getDBIdFromGraphqlId,
  maybe,
} from '@temp/core/utils';
import { FilterQuerySet } from '@temp/core/utils/filters';
import { IFilterAttributes, IFilters } from '@types';
import * as React from 'react';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';
import { CollectionWrapper, HeaderProducts } from './styles';

interface SortItem {
  label: string;
  value?: string;
}

type SortOptions = Array<SortItem>;
type CategoryOptions = Array<SortItem>;

interface PageProps
  extends Omit<IPaginationProps, 'total' | 'pageSize' | 'page'> {
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

const DEFAULT_SORT = '-stock';

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
  const [
    { category, filters: attributeFilters, page, sortBy: sort },
    setQuery,
  ] = useQueryParams({
    category: StringParam,
    filters: FilterQuerySet,
    page: NumberParam,
    sortBy: StringParam,
  });

  const filters: IFilters = {
    attributes: attributeFilters,
    pageSize: PRODUCTS_PER_PAGE,
    priceGte: null,
    priceLte: null,
    sortBy: sort || DEFAULT_SORT,
  };

  const variables: CollectionProductsVariables = {
    ...filters,
    attributes: filters.attributes
      ? convertToAttributeScalar(filters.attributes)
      : {},
    districtId: districtSelected.id,
    id: collection.id,
    page: page || 1,
    sortBy: convertSortByFromString(filters.sortBy),
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

  const onAttributeFiltersChange = (name, value) => {
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
                (item) => item !== value
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

  const getProductListHeader = () => {
    return (
      <ProductListHeader
        activeSecondaryOptions={variablesWithCategories.categories}
        activeFilters={
          filters!.attributes
            ? Object.keys(filters!.attributes!.brand).length
            : 0
        }
        activeFiltersAttributes={activeFiltersAttributes}
        activeSortOption={filters.sortBy}
        clearFilters={clearFilters}
        numberOfProducts={products ? products.totalCount : 0}
        onChangeSecondaryOption={(value) => {
          setQuery({
            category: value.label,
            page: 1,
          });
        }}
        onChangeSortOption={(value) => {
          setQuery({
            page: 1,
            sortBy: value.value,
          });
        }}
        onCloseFilterAttribute={onAttributeFiltersChange}
        openFiltersMenu={() => setShowFilters(true)}
        secondaryLabel="Categorías"
        secondaryClearLabel={COLLECTION_CATEGORY_FILTER_LABEL}
        secondaryOptions={categoryOptions}
        showSecondarySelect
        sortOptions={sortOptions}
      />
    );
  };

  React.useEffect(() => goTop(), [products]);

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
        {getProductListHeader()}
      </HeaderProducts>
      <div className="collection-container collection-body">
        <script className="structured-data-list" type="application/ld+json">
          {structuredData(collection)}
        </script>
        <section className="collection-products">
          <FilterSidebar
            show={showFilters}
            hide={() => setShowFilters(false)}
            onAttributeFiltersChange={onAttributeFiltersChange}
            attributes={attributes}
            filters={filters}
          />
          <ProductListAUNA
            addToCart={addToCart}
            loading={collectionListLoading}
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
          {!hasProducts && <EmptyProduct title="No hay productos" />}
        </section>
      </div>
    </CollectionWrapper>
  );
};

export default Page;
