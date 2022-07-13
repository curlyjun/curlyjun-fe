import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import { IntersectionChecker } from '@/components/intersectionChecker';
import { ProductList } from '@/components/productList';
import { SkeletonProductList } from '@/components/skeletonProductList';
import { useProductsInfiniteQuery } from '@/hooks/queries/useProductsInfiniteQuery';

const InfiniteScrollPage: NextPage = () => {
  const { data, isFetched, fetchNextPage } = useProductsInfiniteQuery();

  if (!isFetched || !data) {
    return (
      <Container>
        <SkeletonProductList />
      </Container>
    );
  }

  return (
    <Container>
      {data?.pages.map((page, idx) => (
        <ProductList key={`infinite-${idx}`} products={page?.products} />
      ))}
      <IntersectionChecker onIntersect={fetchNextPage} />
    </Container>
  );
};

export default InfiniteScrollPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
