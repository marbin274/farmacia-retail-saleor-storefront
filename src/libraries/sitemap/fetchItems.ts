import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import fetch from 'isomorphic-fetch';

import {
  generateCategoryUrl,
  generateCollectionUrl,
  generateProductUrl,
} from '../../core/utils';
import {
  getCategoriesQuery,
  getCollectionsQuery,
  getProductsQuery,
} from './queries';

const API_URL = process.env.API_URI || '/graphql/';

const fetchItems = async ({ query, perPage = 100 }, callback: any) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({ uri: API_URL, fetch }),
  });
  const next = async (cursor = null) => {
    const response = await client.query({
      query,
      variables: { perPage, cursor },
    });
    const data =
      response.data[query.definitions[0].selectionSet.selections[0].name.value];
    data.edges.map(({ node }) => callback(node));
    if (data.pageInfo.hasNextPage) {
      await next(data.pageInfo.endCursor);
    }
  };
  await next();
};

export const getCategories = async (callback) => {
  await fetchItems({ query: getCategoriesQuery }, ({ id, name }) => {
    callback({ url: generateCategoryUrl(id, name) });
  });
};

export const getCollections = async (callback) => {
  await fetchItems({ query: getCollectionsQuery }, ({ id, name }) => {
    callback({ url: generateCollectionUrl(id, name) });
  });
};

export const getProducts = async (callback) => {
  await fetchItems({ query: getProductsQuery }, ({ id, name }) => {
    callback({ url: generateProductUrl(id, name) });
  });
};
