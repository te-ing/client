import { useRef } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/globalStyle';
import { theme } from '../styles/theme';
import { QueryClient, QueryClientProvider, Hydrate, Query } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from 'components/Layout';
import { RecoilRoot } from 'recoil';

const MyApp = ({ Component, pageProps }: AppProps) => {
  // const [queryClient] = useState(() => new QueryClient());
  const queryClient = useRef(new QueryClient());

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>DreamIn</title>
      </Head>
      <GlobalStyle />
      <RecoilRoot>
        <QueryClientProvider client={queryClient.current}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider theme={theme}>
              {/* <GlobalStyle /> */}
              <Component {...pageProps} />
            </ThemeProvider>
          </Hydrate>
          {process.env.NEXT_PUBLIC_REACT_QUERY_DEV === 'dev' && (
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          )}
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
};

export default MyApp;
