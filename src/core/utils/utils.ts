import { IFilterAttributes } from '@app/types';
import { Breadcrumb } from '@temp/@next/components/organisms/BreadcrumbsLegacy';
import { MainMenuSubItem } from '@sdk/queries/gqlTypes/MainMenuSubItem';
import { ISimpleProduct } from '@sdk/types/IProduct';
import { History, LocationState } from 'history';
import { Base64 } from 'js-base64';
import { each } from 'lodash';
import { parse as parseQs, stringify as stringifyQs } from 'query-string';
import { FetchResult } from '@apollo/client';
import { OrderDirection, ProductOrderField } from '@sdk/gqlTypes/globalTypes';
import { FormError } from '../types';
import { IGeoJson } from '../types/address';

export const slugify = (text: string | number): string =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -

export const getDBIdFromGraphqlId = (
  graphqlId: string,
  schema?: string
): number => {
  // This is temporary solution, we will use slugs in the future
  const rawId = Base64.decode(graphqlId);
  const regexp = /(\w+):(\d+)/;
  const arr = regexp.exec(rawId);
  if (schema && schema !== arr![1]) {
    throw new Error('Schema is not correct');
  }
  return parseInt(arr![2], 10);
};

export const getGraphqlIdFromDBId = (id: string, schema: string): string =>
  // This is temporary solution, we will use slugs in the future
  Base64.encode(`${schema}:${id}`);

export const priceToString = (
  price: { amount: number; currency: string },
  locale?: string
): string => {
  const { amount } = price;
  return locale
    ? amount.toLocaleString(locale, {
        currency: price.currency,
        style: 'currency',
      })
    : `${price.currency} ${amount.toFixed(2)}`;
};

export const generateProductUrl = (id: string, name: string) =>
  `/product/${slugify(name)}/${getDBIdFromGraphqlId(id, 'Product')}/`;

export const generateCategoryUrl = (id: string, name: string) =>
  `/category/${slugify(name)}/${getDBIdFromGraphqlId(id, 'Category')}/`;

export const generateCollectionUrl = (id: string, name: string) =>
  `/collection/${slugify(name)}/${getDBIdFromGraphqlId(id, 'Collection')}/`;

export const generatePageUrl = (slug: string) => `/page/${slug}/`;

export const convertCategoryToMenuItem = (
  id: string,
  name: string
): MainMenuSubItem => {
  return {
    category: {
      id,
      name,
    },
    id,
    name,
  } as any;
};

interface AttributeDict {
  [attributeSlug: string]: string[];
}
export const convertToAttributeScalar = (
  attributes: AttributeDict | IFilterAttributes
) =>
  Object.entries(attributes)
    .map(([key, value]) =>
      value.map((attribute: any) => ({ slug: key, value: attribute }))
    )
    .reduce((prev, curr) => [...prev, ...curr], []);

interface QueryString {
  [key: string]: string[] | string | null | undefined;
}
export const getAttributesFromQs = (qs: QueryString) =>
  Object.keys(qs)
    .filter(
      (key) =>
        !['pageSize', 'priceGte', 'priceLte', 'sortBy', 'q'].includes(key)
    )
    .reduce((prev: any, curr: any) => {
      prev[curr] = typeof qs[curr] === 'string' ? [qs[curr]] : qs[curr];
      return prev;
    }, {});

export const getValueOrEmpty = <T>(value: T): T | string =>
  value === undefined || value === null ? '' : value;

export const convertSortByFromString = (sortBy: string) => {
  if (!sortBy) {
    return null;
  }
  const direction = sortBy.startsWith('-')
    ? OrderDirection.DESC
    : OrderDirection.ASC;

  let field;
  switch (sortBy.replace(/^-/, '')) {
    case 'name':
      field = ProductOrderField.NAME;
      break;

    case 'price':
      field = ProductOrderField.MINIMAL_PRICE;
      break;

    case 'updated_at':
      field = ProductOrderField.DATE;
      break;

    case 'stock':
      field = ProductOrderField.STOCK_AVAILABLE;
      break;

    default:
      return null;
  }
  return { field, direction };
};

export const maybe = <T>(exp: () => any, d?: T) => {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
};

export const parseQueryString = (
  location: LocationState
): { [key: string]: string } => {
  const query = {
    ...parseQs((location as any).search.substr(1)),
  };
  each(query, (value, key) => {
    if (Array.isArray(value)) {
      query[key] = value[0];
    }
  });
  return query as { [key: string]: string };
};

export const updateQueryString = (
  location: LocationState,
  history: History
) => {
  const querystring = parseQueryString(location);

  return (key: string, value?: any) => {
    if (value === '') {
      delete querystring[key];
    } else {
      querystring[key] = value || key;
    }
    history.replace('?' + stringifyQs(querystring));
  };
};

export const findFormErrors = (result: void | FetchResult): FormError[] => {
  if (result) {
    const data = Object.values(maybe(() => result.data) as object);

    return data.reduce((prevVal: any, currVal: any) => {
      const errors = currVal.errors || [];

      return [...prevVal, ...errors];
    }, []);
  }
  return [];
};

export const removeEmptySpaces = (text: string) => text.replace(/\s+/g, '');

export const getBreadcrumbsFromProduct = (product: ISimpleProduct) => {
  const breadcrumbs: Breadcrumb[] = [];

  if (!!product.category) {
    breadcrumbs.push({
      link: generateCategoryUrl(product.category.id, product.category.name),
      label: product.category.name,
    });
  }

  breadcrumbs.push({
    link: generateProductUrl(product.id, product.name),
    label: product.name,
  });

  return breadcrumbs;
};

export const isCoordinatesInsideBouds = (
  latitude: number,
  longitude: number,
  geoJson: IGeoJson
) => {
  if (!latitude || !longitude || !geoJson?.features) {
    return false;
  }

  const x = latitude;
  const y = longitude;
  let inside = false;

  for (const feature of geoJson.features) {
    for (const vs of feature.geometry.coordinates) {
      for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        const xi = vs[i][1];
        const yi = vs[i][0];
        const xj = vs[j][1];
        const yj = vs[j][0];

        const intersect =
          yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }
    }

    if (inside) {
      break;
    }
  }

  return inside;
};
