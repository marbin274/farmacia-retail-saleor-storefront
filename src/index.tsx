import {
  ApolloClient,
  ApolloProvider,
  defaultDataIdFromObject,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { NotificationTemplate } from '@components/atoms';
import {
  ServiceWorkerContext,
  ServiceWorkerProvider,
} from '@components/containers';
import { OverlayProvider } from '@components/organisms/OverlayComponent';
import { FeaturedPluginsProvider } from '@contexts';
import { OptimizelyProvider } from '@optimizely/react-sdk';
import { SaleorProvider, useAuth } from '@sdk/react';
import { defaultTheme, GlobalStyle } from '@styles';
import { persistCache } from 'apollo3-cache-persist';
import * as React from 'react';
import { positions, Provider as AlertProvider, useAlert } from 'react-alert';
import { render } from 'react-dom';
import TagManager from 'react-gtm-module';
import { Route, Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryParamProvider } from 'use-query-params';
import ShopProvider from './@next/components/organisms/ShopProvider';
import { createSaleorClient } from './@sdk';
import {
  authLink,
  fireSignOut,
  invalidTokenLinkWithTokenHandler,
} from './@sdk/auth';
import { launchSetLocation } from './@sdk/gaConfig';
import { App } from './app';
import {
  apiUrl,
  environmentName,
  gtmAuth,
  gtmId,
  gtmPreview,
  serviceWorkerTimeout,
} from './core/constants';
import './index.css';
import { history } from './libraries/history';
import {
  getOptimizelyUserId,
  optimizelyClient,
} from './libraries/optimizely/optimizelyConfig';

const cache = new InMemoryCache({
  dataIdFromObject: (apolloCacheObject) => {
    if (apolloCacheObject.__typename === 'Shop') {
      return 'shop';
    }
    return defaultDataIdFromObject(apolloCacheObject);
  },
});

const startApp = async () => {
  await persistCache({
    cache,
    storage: window?.localStorage,
  });

  const notificationOptions = {
    position: positions.BOTTOM_RIGHT,
    timeout: 2500,
  };

  /**
   * This is temporary adapter for queries and mutations not included in SDK to handle invalid token error for them.
   * Note, that after all GraphQL queries and mutations will be replaced by SDK methods, this adapter is going to be removed.
   */
  const ApolloClentInvalidTokenLinkAdapter = ({ children }) => {
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

    return children(apolloClient);
  };

  const Root = () => {
    const Notifications = () => {
      const alert = useAlert();

      const { updateAvailable } = React.useContext(ServiceWorkerContext);

      React.useEffect(() => {
        if (updateAvailable) {
          location.reload();
        }
      }, [updateAvailable]);

      useAuth((authenticated: boolean) => {
        if (authenticated) {
          alert.show(
            {
              title: '¡Hola de nuevo!',
            },
            { type: 'success' }
          );
        } else {
          alert.show(
            {
              title: 'Cerraste sesión',
            },
            { type: 'success' }
          );
        }
      });
      return null;
    };

    return (
      <Router history={history}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <ApolloClentInvalidTokenLinkAdapter>
            {(apolloClient: ApolloClient<NormalizedCacheObject>) =>
              apolloClient && (
                <ApolloProvider client={apolloClient}>
                  <SaleorProvider client={apolloClient}>
                    <ShopProvider>
                      <OverlayProvider>
                        <FeaturedPluginsProvider>
                          <App />
                        </FeaturedPluginsProvider>
                        <Notifications />
                      </OverlayProvider>
                    </ShopProvider>
                  </SaleorProvider>
                </ApolloProvider>
              )
            }
          </ApolloClentInvalidTokenLinkAdapter>
        </QueryParamProvider>
      </Router>
    );
  };

  switch (environmentName) {
    case 'qa':
      if (gtmId && gtmAuth && gtmPreview) {
        const tagManagerArgs = {
          auth: gtmAuth,
          gtmId,
          preview: gtmPreview,
        };
        launchSetLocation();
        TagManager.initialize(tagManagerArgs);
      }
      break;
    case 'prod':
      if (gtmId) {
        const tagManagerArgs = {
          gtmId,
        };
        launchSetLocation();
        TagManager.initialize(tagManagerArgs);
      }
      break;

    default:
      break;
  }

  render(
    <OptimizelyProvider
      optimizely={optimizelyClient}
      user={{
        id: getOptimizelyUserId(),
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <AlertProvider
          template={NotificationTemplate as any}
          {...notificationOptions}
        >
          <ServiceWorkerProvider timeout={serviceWorkerTimeout}>
            <GlobalStyle />
            <Root />
          </ServiceWorkerProvider>
        </AlertProvider>
      </ThemeProvider>
    </OptimizelyProvider>,
    document.getElementById('root')
  );
};

startApp();
