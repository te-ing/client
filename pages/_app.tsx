import { useRef } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/globalStyle';
import { theme } from '../styles/theme';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider, Hydrate, Query } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import useModal from 'hooks/useModal';
import Modal from 'components/common/Modal';
import ModalTemplate from 'components/common/Modal/ModalTemplate';
import SetUserProfile from 'components/initialRegister/SetUserProfile';
import Layout from 'components/Layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
  // const [queryClient] = useState(() => new QueryClient());
  const queryClient = useRef(new QueryClient());
  const { isShowing, setModalVisible } = useModal();

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
              <Layout setModalVisible={setModalVisible}>
                <Component {...pageProps} />
              </Layout>
              <Modal isShowing={isShowing} hide={setModalVisible}>
                <ModalTemplate hide={setModalVisible}>
                  <SetUserProfile />
                </ModalTemplate>
              </Modal>
            </ThemeProvider>
          </RecoilRoot>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
