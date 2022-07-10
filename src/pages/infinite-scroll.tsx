import Link from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import { Header } from '@components/header';

const InfiniteScrollPage: NextPage = () => {
  return (
    <>
      <Header />
      <Container>
        <ProductList products={products} />
      </Container>
    </>
  );
};

export default InfiniteScrollPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
