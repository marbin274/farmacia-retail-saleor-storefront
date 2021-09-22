import { IFilterAttributes } from '@temp/@next/types';
import { SearchProducts_attributes } from '@sdk/queries/gqlTypes/SearchProducts';
import { QueryParamConfig } from 'use-query-params';

type IFilters = SearchProducts_attributes;

interface IObject {
  [paramName: string]: Array<string>;
}

export const convertToFilterSideBar = (
  filters: IFilters
): IFilterAttributes[] => {
  return filters?.edges?.map(
    (edge): IFilterAttributes => ({
      filterableInStorefront: edge.node.filterableInStorefront,
      id: edge.node.id || '',
      name: edge.node.name || '',
      slug: edge.node.slug,
      values: edge.node.values,
    })
  );
};

export const FilterQuerySet: QueryParamConfig<IObject> = {
  encode(valueObj: IObject): string {
    const str: string[] = [];
    Object.keys(valueObj).forEach((value) => {
      str.push(value + '_' + valueObj[value].join('_'));
    });
    return str.join('.');
  },

  decode(strValue: string | string[]): IObject {
    const obj: IObject = {};
    if (typeof strValue === 'string') {
      const propsWithValues = strValue.split('.').filter((n) => n);
      propsWithValues.forEach((value) => {
        const propWithValues = value.split('_').filter((n) => n);
        obj[propWithValues[0]] = propWithValues.slice(1);
      });
    }
    return obj;
  },
};

export const removeUndefined = (
  o: { [s: string]: unknown } | ArrayLike<unknown>
) =>
  Object.entries(o)
    .filter(([, val]) => val !== undefined)
    .reduce((result, [key, val]) => {
      result[key] = val;
      return result;
    }, {});
