import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/globalStyle';
import { theme } from '../styles/theme';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider, Hydrate, Query } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const MyApp = ({ Component, pageProps }: AppProps) => {
  // const [queryClient] = useState(() => new QueryClient());
  const queryClient = React.useRef(new QueryClient());
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>dreamIn</title>
      </Head>
      <GlobalStyle />
      <QueryClientProvider client={queryClient.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </RecoilRoot>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
