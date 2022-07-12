import axios from 'axios';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import styled from 'styled-components';

import { useScrollRestoration } from '@/hooks/useScrollRestoration';

import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';

axios.defaults.baseURL = 'https://api.sixshop.dev';

setupMSW();

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  useScrollRestoration({ targetPathname: '/infinite-scroll', fromPathname: '/products/[id]' });

  return (
    <>
      <Head>
        <title>식스샵 과제 - 박성준</title>
        <meta name='description' content='박성준의 식스샵 프론트엔드 개발자 채용 과제입니다.' />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <GlobalStyle />
          <Background />
          <Content>
            <Component {...pageProps} />
          </Content>
          <ReactQueryDevtools position='top-right' />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
