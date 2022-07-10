import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { Header } from '@components/header';
import { fetchProducts, useProductsQuery } from '@hooks/useProductsQuery';
import { dehydrate, QueryClient } from 'react-query';
import { convertQueryStringToPositiveNumber } from '@utilities/index';

const PaginationPage: NextPage = () => {
  const { data } = useProductsQuery();

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

  await queryClient.prefetchQuery('products', () => fetchProducts(page, size));

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
