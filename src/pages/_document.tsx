import { GA_TRACKING_ID } from '@temp/libraries/gtm/gtag';
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
          <link rel="preconnect" href="https://js-cdn.dynatrace.com" />
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

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />

        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-root"></div>
          <script
            async
            type="text/javascript"
            src="https://js-cdn.dynatrace.com/jstag/157944990f8/bf68041miu/775b3282e266cbc1_complete.js"
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
        </body>
      </Html>
    );
  }
}
