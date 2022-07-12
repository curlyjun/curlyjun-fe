import type { GetStaticProps, NextPage } from 'next';
import React, { useRef } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import styled from 'styled-components';

import { Header } from '@/components/header';
import { ProductList } from '@/components/productList';
import * as queryKeys from '@/constants/queryKeys';
import {
  useProductsInfiniteQuery,
  fetchProductsForInfinite,
} from '@/hooks/queries/useProductsInfiniteQuery';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const InfiniteScrollPage: NextPage = () => {
  const ref = useRef(null);
  const { data, fetchNextPage } = useProductsInfiniteQuery();
  useIntersectionObserver({
    targetRef: ref,
    onIntersect: fetchNextPage,
  });

  return (
    <>
      <Header />
      <Container>
        {data?.pages.map((page, idx) => (
          <ProductList key={`infinite-${idx}`} products={page?.products} />
        ))}
        <div ref={ref} />
      </Container>
    </>
  );
};

export default InfiniteScrollPage;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(queryKeys.PRODUCTS_INFINITE, () =>
    fetchProductsForInfinite(1)
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
