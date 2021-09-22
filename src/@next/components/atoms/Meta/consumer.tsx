import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import * as React from 'react';
import Head from 'next/head';
import { Consumer as MetaConsumer } from './context';
import { WINDOW_EXISTS } from '@temp/@sdk/consts';

const Consumer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  return (
    <MetaConsumer>
      {({ title, description, image, type, url, custom }) => {
        const pathname: string = router.pathname?.includes('search')
          ? '/'
          : router.pathname;

        const hostUrl = WINDOW_EXISTS
          ? `${window.location.protocol}//${window.location.hostname}`
          : '';
        let canonicalURL = `${hostUrl}${pathname}`;

        const homeCanonicalURL: string = canonicalURL.lastIndexOf('/')
          ? canonicalURL.slice(0, -1)
          : canonicalURL;

        if (hostUrl === homeCanonicalURL) {
          canonicalURL = homeCanonicalURL;
        }

        function getParameterByName(name: string) {
          const match = RegExp('[?&]' + name + '=([^&]*)').exec(
            String(router.query)
          );
          return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        }
        return (
          <>
            <NextSeo
              title={title}
              description={description}
              openGraph={{
                type,
                description,
                url,
                title,
                images: [{ url: image }],
              }}
              canonical={canonicalURL}
            />
            <Head>
              {!!getParameterByName('filters') && (
                <meta name="robots" content="nofollow" />
              )}
              {!!custom && (
                <>
                  {custom.map((item, index) => (
                    <meta key={index} {...item} />
                  ))}
                </>
              )}
            </Head>
            {children}
          </>
        );
      }}
    </MetaConsumer>
  );
};

export default Consumer;
