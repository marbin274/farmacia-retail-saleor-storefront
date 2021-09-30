import { GA_TRACKING_ID } from '@temp/libraries/gtm/gtag';
import { dynatraceUrl } from '@temp/core/constants';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* connect to domain of font files */}
          <link rel="preconnect" href="https://fonts.googleapis.com/" />
          {/* optionally increase loading priority */}
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          />
          {/* async CSS  */}
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
          <script async type="text/javascript" src="/libraries/gtm.js" />
          <script
            dangerouslySetInnerHTML={{
              __html: `            
            if (window.Cypress) {
              window.__REACT_DEVTOOLS_GLOBAL_HOOK__ =
                window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__;
            }
            `,
            }}
          />
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GA_TRACKING_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
          {/* End Google Tag Manager (noscript) */}
          <Main />
          <NextScript />
          <div id="modal-root"></div>
          <script
            async
            type="text/javascript"
            src={dynatraceUrl}
            crossOrigin="anonymous"
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              var s = document.createElement('script'); 
              s.src = 'https://api.wcx.cloud/widget/?id=8740a605987b4e95bc8ee993959444ba';
              document.head.appendChild(s);
          `,
            }}
          ></script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GA_TRACKING_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </body>
      </Html>
    );
  }
}
