import { AlertNotification, NotificationTemplate } from '@components/atoms';
import { OptimizelyProvider } from '@optimizely/react-sdk';
import { OverlayProvider } from '@temp/@next/components/organisms/OverlayComponent';
import ShopProvider from '@temp/@next/components/organisms/ShopProvider';
import { FeaturedPluginsProvider } from '@temp/@next/contexts';
import { defaultTheme, GlobalStyle } from '@temp/@next/globalStyles';
import { App } from '@temp/app';
import { ApolloAdapter } from '@temp/libraries/apollo';
import Script from 'next/script'
import React from 'react'

import {
  getOptimizelyUserId,
  optimizelyClient,
} from '@temp/libraries/optimizely/optimizelyConfig';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { positions, Provider as AlertProvider } from 'react-alert';
import { ThemeProvider } from 'styled-components';
import '../index.css';
import { GA_TRACKING_ID } from '@temp/libraries/gtm/gtag';

export default function _App(props: AppProps) {
  const notificationOptions = {
    position: positions.BOTTOM_RIGHT,
    timeout: 2500,
  };

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
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GA_TRACKING_ID}');
          `,
        }}
      />
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
