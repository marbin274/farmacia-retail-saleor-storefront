import { DEFAULT_SORT, PRODUCTS_PER_PAGE } from '@temp/core/config';
import { IFilters } from '../types';

export const onAttributeFiltersChange = (
  attributeFilters,
  filters,
  name,
  setQuery,
  value
) => {
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

export const getFiltersInitial = (
  attributeFilters: any,
  sort: string
): IFilters => ({
  attributes: attributeFilters,
  pageSize: PRODUCTS_PER_PAGE,
  priceGte: null,
  priceLte: null,
  sortBy: sort || DEFAULT_SORT,
});
