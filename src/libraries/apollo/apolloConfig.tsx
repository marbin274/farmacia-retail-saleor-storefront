import {
  ApolloProvider,
  defaultDataIdFromObject,
  InMemoryCache,
} from '@apollo/client';
import { createSaleorClient } from '@temp/@sdk';
import {
  authLink,
  fireSignOut,
  invalidTokenLinkWithTokenHandler,
} from '@temp/@sdk/auth';
import { WINDOW_EXISTS } from '@temp/@sdk/consts';
import { SaleorProvider } from '@temp/@sdk/react';
import { apiUrl } from '@temp/core/constants';
import { persistCache } from 'apollo3-cache-persist';
import React from 'react';

export const ApolloAdapter: React.FC = ({ children }) => {
  const cache = new InMemoryCache({
    dataIdFromObject: (apolloCacheObject) => {
      if (apolloCacheObject.__typename === 'Shop') {
        return 'shop';
      }
      return defaultDataIdFromObject(apolloCacheObject);
    },
  });

  const tokenExpirationCallback = () => {
    fireSignOut(apolloClient);
  };

  const { link: invalidTokenLink } = invalidTokenLinkWithTokenHandler(
    tokenExpirationCallback
  );

  const apolloClient = React.useMemo(
    () => createSaleorClient(apiUrl, invalidTokenLink, authLink, cache),
    []
  );

  React.useEffect(() => {
    if (WINDOW_EXISTS) {
      persistCache({
        cache,
        storage: window.localStorage,
      });
    }
  }, []);

  if (!apolloClient) return <></>;

  return (
    <ApolloProvider client={apolloClient}>
      <SaleorProvider client={apolloClient}>{children}</SaleorProvider>
    </ApolloProvider>
  );
};
