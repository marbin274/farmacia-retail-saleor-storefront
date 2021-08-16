import * as React from "react";
import { NumberParam, StringParam, useQueryParams } from "use-query-params";
import { FilterQuerySet } from "@temp/core/utils/filters";

export const useBrandFilters = () => {
    const [
      { category, filters: attributeFilters, page, sortBy: sort },
      setQuery,
    ] = useQueryParams({
      category: StringParam,
      filters: FilterQuerySet,
      page: NumberParam,
      sortBy: StringParam,
    });
    const [currentFilters, setCurrentFilters] = React.useState({...attributeFilters});
    const [checkedFilters, setCheckedFilters] = React.useState({...attributeFilters});
    const [hasFilterChanged, setHasFilterChanged] = React.useState(false);

    React.useEffect(() => {
        setHasFilterChanged(JSON.stringify(currentFilters) !== JSON.stringify(checkedFilters));
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
                  (item : {}) => item !== value
                ),
              });
            }
          } else {
            updateFunction( {
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
    }
    
    const clearFilters = () => {
      setQuery({ filters: {} });
      setCheckedFilters({});
      setCurrentFilters({});
    };

    const resetFilters = () => {
      setCheckedFilters({...currentFilters});
    }

    const updateRemote = (filters) => {
      setQuery({ filters });
      setCurrentFilters({...filters});
      setCheckedFilters({...filters});
    };

    const updateLocal = (filters) => {
      setCheckedFilters({ ...filters });
    };
    
    const applyFilters = () => {
      updateRemote(checkedFilters);
    }

    const handlePageChange = (page: number) => {
      setQuery({ page });
    };

    const goToFirstPage = (value) => {
      setQuery({
        page: 1,
        sortBy: value.value,
      });
      }

    const goToFirstPageCategory = (value) => {
      setQuery({
        category: value.label,
        page: 1,
      });
    }

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
    }
    
}