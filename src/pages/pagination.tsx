import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { QueryClient, dehydrate } from 'react-query';
import styled from 'styled-components';

import { Header } from '@/components/header';
import { Pagination } from '@/components/pagination';
import { ProductList } from '@/components/productList';
import * as queryKeys from '@/constants/queryKeys';
import {
  fetchProducts,
  useProductsPaginationQuery,
} from '@/hooks/queries/useProductsPaginationQuery';
import { convertQueryStringToPositiveNumber } from '@/utilities';

const PaginationPage: NextPage = () => {
  const { data } = useProductsPaginationQuery();

  return (
    <>
      <Header />
      <Container>
        {data ? (
          <>
            <ProductList products={data?.products} />
            <Pagination />
          </>
        ) : (
          <NotFoundProducts>존재하지 않는 페이지 입니다.</NotFoundProducts>
        )}
      </Container>
    </>
  );
};

export default PaginationPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = convertQueryStringToPositiveNumber(query.page) || 1;
  const size = convertQueryStringToPositiveNumber(query.size) || 10;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([queryKeys.PRODUCTS_PAGINATION, size, page], () =>
    fetchProducts(page, size)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

const NotFoundProducts = styled.div`
  padding-top: 200px;
`;
