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

import { App } from "./app";
import { apiUrl, serviceWorkerTimeout } from "./constants";
import { history } from "./history";

import { OverlayProvider } from "./components";

import ShopProvider from "./components/ShopProvider";

import { createSaleorClient } from "./@sdk";
import {
  authLink,
  fireSignOut,
  invalidTokenLinkWithTokenHandler,
} from "./@sdk/auth";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { alertService } from "./@next/components/atoms/Alert";

interface GtmEnvVars {
  auth: string | null;
  id: string | null;
  preview: string | null;
}

const cache = new InMemoryCache({
  dataIdFromObject: apolloCacheObject => {
    if (apolloCacheObject.__typename === "Shop") {
      return "shop";
    }
    const tagManagerEnvVars: GtmEnvVars = {
      auth: apolloCacheObject?.tagManagerAuth,
      id: apolloCacheObject?.tagManagerId,
      preview: apolloCacheObject?.tagManagerEnvironmentId,
    };
    if (!!tagManagerEnvVars.id) {
      if (!!tagManagerEnvVars.preview) {
        const tagManagerArgs = {
          auth: tagManagerEnvVars.auth,
          gtmId: tagManagerEnvVars.id,
          preview: tagManagerEnvVars.preview,
        };
        TagManager.initialize(tagManagerArgs);
      } else {
        TagManager.initialize({ gtmId: tagManagerEnvVars.id });
      }
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
        // TODO: Esta logica se va a utilizar luego de varios sprints pero con el componente Alert.
        // if (updateAvailable) {
        //   alert.show(
        //     {
        //       actionText: "Refresh",
        //       content:
        //         "To update the application to the latest version, please refresh the page!",
        //       title: "New version is available!",
        //     },
        //     {
        //       onClose: () => {
        //         location.reload();
        //       },
        //       timeout: 0,
        //       type: "success",
        //     }
        //   );
        // }
        if (updateAvailable) {
          localStorage.setItem("new_version", "OK");
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

  Sentry.init({
    // dsn: process.env.sentry_dsn,
    dsn:
      "https://55c70f5ed8c54af4824d4b61b33fd7e8@o504659.ingest.sentry.io/5623468",
    environment: process.env.environment_name,
    integrations: [new Integrations.BrowserTracing()],
    release: "farmauna-storefront@" + process.env.npm_package_version,
    tracesSampleRate: 1.0,
  });

  render(
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
    </ThemeProvider>,
    document.getElementById("root")
  );

  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept();
  }
};

startApp();
