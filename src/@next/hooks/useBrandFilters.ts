import { FilterQuerySet, removeUndefined } from '@temp/core/utils/filters';
import router, { useRouter } from 'next/router';
import * as React from 'react';

const FIRST_PAGE = 1;

export const useBrandFilters = () => {
  const { query } = useRouter();

  const { category, attributeFilters, page, sort } = React.useMemo(
    () => ({
      category: query.category as string,
      attributeFilters: FilterQuerySet.decode(query.filters),
      page: Number(query.page),
      sort: query.sortBy as string,
    }),
    [query]
  );
  const setQuery = (filters) => {
    router.push(
      {
        pathname: router.asPath.split('?')[0],
        query: removeUndefined({ ...query, ...filters }),
      },
      undefined,
      { shallow: true }
    );
  };

  const [currentFilters, setCurrentFilters] = React.useState({
    ...attributeFilters,
  });
  const [checkedFilters, setCheckedFilters] = React.useState({
    ...attributeFilters,
  });
  const [hasFilterChanged, setHasFilterChanged] = React.useState(false);

  React.useEffect(() => {
    setCurrentFilters({ ...attributeFilters });
    setCheckedFilters({ ...attributeFilters });
  }, [attributeFilters]);

  React.useEffect(() => {
    setHasFilterChanged(
      JSON.stringify(currentFilters) !== JSON.stringify(checkedFilters)
    );
  }, [checkedFilters, currentFilters]);

  const onFiltersChange = (updateFunction: (filters: any) => void) => {
    return (name: string, value: string) => {
      if (checkedFilters && checkedFilters.hasOwnProperty(name)) {
        if (checkedFilters[name].includes(value)) {
          if (checkedFilters[`${name}`].length === 1) {
            const att = { ...checkedFilters };
            delete att[`${name}`];
            updateFunction({ ...att });
          } else {
            updateFunction({
              ...checkedFilters,
              [`${name}`]: checkedFilters[`${name}`].filter(
                (item: {}) => item !== value
              ),
            });
          }
        } else {
          updateFunction({
            ...checkedFilters,
            [`${name}`]: [...checkedFilters[`${name}`], value],
          });
        }
      } else {
        updateFunction({
          ...checkedFilters,
          [`${name}`]: [value],
        });
      }
    };
  };

  const clearFilters = () => {
    setQuery({ filters: FilterQuerySet.encode({}), page: null });
  };

  const resetFilters = () => {
    setCheckedFilters({ ...currentFilters });
  };

  const updateRemote = (filters) => {
    setQuery({ filters: FilterQuerySet.encode(filters), page: FIRST_PAGE });
  };

  const updateLocal = (filters) => {
    setCheckedFilters({ ...filters });
  };

  const applyFilters = () => {
    updateRemote(checkedFilters);
  };

  const handlePageChange = (page: number) => {
    setQuery({ page });
  };

  const goToFirstPage = (value) => {
    setQuery({
      page: FIRST_PAGE,
      sortBy: value.value,
    });
  };

  const goToFirstPageCategory = (value) => {
    setQuery({
      category: value.label,
      page: FIRST_PAGE,
    });
  };

  const onFiltersChangeLocal = onFiltersChange(updateLocal);
  const onFiltersChangeRemote = onFiltersChange(updateRemote);

  return {
    applyFilters,
    category,
    checkedFilters,
    clearFilters,
    currentFilters,
    goToFirstPage,
    goToFirstPageCategory,
    handlePageChange,
    hasFilterChanged,
    onFiltersChangeLocal,
    onFiltersChangeRemote,
    page,
    resetFilters,
    sort,
    setQuery,
  };
};
