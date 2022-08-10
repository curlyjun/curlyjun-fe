import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import { NotFoundContent } from '@/components/notFoundContent';
import { Pagination } from '@/components/pagination';
import { ProductList } from '@/components/productList';
import { SkeletonProductList } from '@/components/skeletonProductList';
import { useProductsQueryWithRouter } from '@/hooks/useProductsQueryWithRouter';

const PaginationPage: NextPage = () => {
  const { data, isFetched, isError } = useProductsQueryWithRouter();

  if (!isFetched) {
    return (
      <Container>
        <SkeletonProductList />
      </Container>
    );
  }

  if (isError || !data) {
    return <NotFoundContent>존재하지 않는 페이지 입니다.</NotFoundContent>;
  }

  return (
    <Container>
      <>
        <ProductList products={data.products} />
        <Pagination />
      </>
    </Container>
  );
};

export default PaginationPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
