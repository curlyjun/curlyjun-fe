import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { dehydrate, QueryClient } from 'react-query';
import styled from 'styled-components';

import { Header } from '@/components/header';
import { fetchProduct, useProductQuery } from '@/hooks/queries/useProductQuery';

const ProductDetailPage: NextPage = () => {
  const { data } = useProductQuery();

  return (
    <>
      <Header />
      {data ? (
        <>
          <Thumbnail src={data.thumbnail ? data.thumbnail : '/defaultThumbnail.jpg'} />
          <ProductInfoWrapper>
            <Name>{data.name}</Name>
            <Price>{data.price.toLocaleString('ko-KR')}원</Price>
          </ProductInfoWrapper>
        </>
      ) : (
        <NotFoundProduct>존재하지 않는 상품입니다.</NotFoundProduct>
      )}
    </>
  );
};

export default ProductDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const productId = query.id as string;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['product', productId], () => fetchProduct(productId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;

const NotFoundProduct = styled.div`
  text-align: center;
  padding-top: 200px;
`;
