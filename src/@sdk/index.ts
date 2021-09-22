import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { RetryLink } from '@apollo/client/link/retry';

import { SaleorAPI } from './api';
import { APIProxy } from './api/APIProxy';
import { WINDOW_EXISTS } from './consts';
import { Config } from './types';

const getLink = (
  apiUrl: string,
  invalidTokenLink: ApolloLink,
  authLink: ApolloLink
) =>
  ApolloLink.from([
    invalidTokenLink,
    authLink,
    new RetryLink(),
    new BatchHttpLink({ uri: apiUrl }),
  ]);

export const createSaleorClient = (
  apiUrl: string,
  invalidTokenLink: ApolloLink,
  authLink: ApolloLink,
  cache: InMemoryCache
) =>
  new ApolloClient({
    ssrMode: !WINDOW_EXISTS,
    cache,
    link: getLink(apiUrl, invalidTokenLink, authLink),
  });

export class SaleorManager {
  private apiProxy: APIProxy;
  private api: SaleorAPI;
  private apiChangeListener: ((api: SaleorAPI) => any) | undefined;

  constructor(client: ApolloClient<any>, config?: Config) {
    this.apiProxy = new APIProxy(client);
    this.api = new SaleorAPI(
      client,
      this.apiProxy,
      config,
      this.onSaleorAPIChange
    );
  }

  /**
   * Use this method to obtain current API and listen to its update on occured changes within it.
   *
   * @param apiChangeListener Function called to get an API and called on every API update.
   */
  connect(apiChangeListener: (api: SaleorAPI) => any) {
    this.apiChangeListener = apiChangeListener;
    this.apiChangeListener(this.api);
  }

  private onSaleorAPIChange = () => {
    if (this.apiChangeListener) {
      this.apiChangeListener(this.api);
    }
  };
}
