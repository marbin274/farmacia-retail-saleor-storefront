import { DEFAULT_SORT, PRODUCTS_PER_PAGE } from '@temp/core/config';
import { IFilters } from '../types';

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
