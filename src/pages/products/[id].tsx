import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { dehydrate, QueryClient } from 'react-query';
import styled from 'styled-components';

import * as queryKeys from '@/constants/queryKeys';
import { fetchProduct } from '@/hooks/queries/useProductQuery';
import { useProductQueryWithRouter } from '@/hooks/useProductQueryWithRouter';

const ProductDetailPage: NextPage = () => {
  const { data } = useProductQueryWithRouter();

  if (!data) {
    return <NotFoundProduct>존재하지 않는 상품입니다.</NotFoundProduct>;
  }

  return (
    <>
      <Thumbnail
        alt='product-thumbnail-image'
        src={data.thumbnail ? data.thumbnail : '/defaultThumbnail.jpg'}
      />
      <ProductInfoWrapper>
        <Name>{data.name}</Name>
        <Price>{data.price.toLocaleString('ko-KR')}원</Price>
      </ProductInfoWrapper>
    </>
  );
};

export default ProductDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const productId = query.id as string;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([queryKeys.PRODUCT, productId], () => fetchProduct(productId));

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
