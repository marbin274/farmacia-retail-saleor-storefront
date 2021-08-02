// @ts-nocheck
import { hot } from "react-hot-loader";
import { ThemeProvider } from "styled-components";

import { NotificationTemplate } from "@components/atoms";
import {
  ServiceWorkerContext,
  ServiceWorkerProvider,
} from "@components/containers";
import { SaleorProvider, useAuth } from "@sdk/react";
import { defaultTheme, GlobalStyle } from "@styles";
import TagManager from "react-gtm-module";
import {
  defaultDataIdFromObject,
  InMemoryCache,
  NormalizedCacheObject,
} from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ApolloClient } from "apollo-client";
import * as React from "react";
import { positions, Provider as AlertProvider, useAlert } from "react-alert";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import { Route, Router } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import "./globalStyles/index.css";

import { OptimizelyProvider } from "@optimizely/react-sdk";
import { App } from "./app";
import {
  apiUrl,
  environmentName,
  serviceWorkerTimeout,
  gtmId,
  gtmAuth,
  gtmPreview,
} from "./core/constants";
import { history } from "./libraries/history";

import { OverlayProvider } from "./components";

import ShopProvider from "./components/ShopProvider";

import { createSaleorClient } from "./@sdk";
import {
  authLink,
  fireSignOut,
  invalidTokenLinkWithTokenHandler,
} from "./@sdk/auth";
import { alertService } from "./@next/components/atoms/Alert";
import { launchSetLocation, getGaUserId } from "./@sdk/gaConfig";
import { getOptimizelyUserId, optimizelyClient } from "./optimizelyConfig";

const cache = new InMemoryCache({
  dataIdFromObject: apolloCacheObject => {
    if (apolloCacheObject.__typename === "Shop") {
      return "shop";
    }
    return defaultDataIdFromObject(apolloCacheObject);
  },
});

const startApp = async () => {
  await persistCache({
    cache,
    storage: window.localStorage,
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

  const Root = hot(module)(() => {
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
              title: "¡Hola de nuevo!",
            },
            { type: "success" }
          );
        } else {
          alert.show(
            {
              title: "Cerraste sesión",
            },
            { type: "success" }
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
                        <App />
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
  });

  switch (environmentName) {
    case "qa":
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
    case "prod":
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
    document.getElementById("root")
  );

  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept();
  }
};

startApp();
