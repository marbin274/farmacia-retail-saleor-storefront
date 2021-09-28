import { AlertNotification, NotificationTemplate } from '@components/atoms';
import { OptimizelyProvider } from '@optimizely/react-sdk';
import { OverlayProvider } from '@temp/@next/components/organisms/OverlayComponent';
import ShopProvider from '@temp/@next/components/organisms/ShopProvider';
import { FeaturedPluginsProvider } from '@temp/@next/contexts';
import { defaultTheme, GlobalStyle } from '@temp/@next/globalStyles';
import { App } from '@temp/app';
import { ApolloAdapter } from '@temp/libraries/apollo';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import {
  getOptimizelyUserId,
  optimizelyClient,
} from '@temp/libraries/optimizely/optimizelyConfig';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { positions, Provider as AlertProvider } from 'react-alert';
import { ThemeProvider } from 'styled-components';
import '../index.css';
import { GTMPageView } from '@temp/libraries/gtm/gtmUtils';

export default function _App(props: AppProps) {
  const notificationOptions = {
    position: positions.BOTTOM_RIGHT,
    timeout: 2500,
  };

  const router = useRouter();

  // Initiate GTM
  useEffect(() => {
    const handleRouteChange = (url: string) => GTMPageView(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then(function (registrations) {
          for (const registration of registrations) {
            registration.unregister();
          }
        })
        .catch((err) => {
          /* eslint no-console: ["error", { allow: ["warn"] }] */
          console.warn('Service Worker registration failed: ', err);
        });
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
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
            <GlobalStyle />
            <ApolloAdapter>
              <ShopProvider>
                <OverlayProvider>
                  <FeaturedPluginsProvider>
                    <App {...props} />
                  </FeaturedPluginsProvider>
                  <AlertNotification />
                </OverlayProvider>
              </ShopProvider>
            </ApolloAdapter>
          </AlertProvider>
        </ThemeProvider>
      </OptimizelyProvider>
    </>
  );
}
