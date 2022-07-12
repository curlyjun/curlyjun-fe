import type { AppProps } from 'next/app';
import { useState } from 'react';
import styled from 'styled-components';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';
import axios from 'axios';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';

axios.defaults.baseURL = 'https://api.sixshop.dev';

setupMSW();

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  useScrollRestoration({ targetPathname: '/infinite-scroll', fromPathname: '/products/[id]' });

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalStyle />
        <Background />
        <Content>
          <Component {...pageProps} />
        </Content>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
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
