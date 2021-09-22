import { AlertNotification, NotificationTemplate } from '@components/atoms';
import { OptimizelyProvider } from '@optimizely/react-sdk';
import { OverlayProvider } from '@temp/@next/components/organisms/OverlayComponent';
import ShopProvider from '@temp/@next/components/organisms/ShopProvider';
import { FeaturedPluginsProvider } from '@temp/@next/contexts';
import { defaultTheme, GlobalStyle } from '@temp/@next/globalStyles';
import { App } from '@temp/app';
import { ApolloAdapter } from '@temp/libraries/apollo';
import { GtmConfig } from '@temp/libraries/gtm';
import {
  getOptimizelyUserId,
  optimizelyClient,
} from '@temp/libraries/optimizely/optimizelyConfig';
import { AppProps } from 'next/app';
import React from 'react';
import { positions, Provider as AlertProvider } from 'react-alert';
import { ThemeProvider } from 'styled-components';
import '../index.css';

export default function _App(props: AppProps) {
  const notificationOptions = {
    position: positions.BOTTOM_RIGHT,
    timeout: 2500,
  };

  GtmConfig.setTagManager();

  return (
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
  );
}