import { useInfiniteQuery } from 'react-query';

import * as queryKeys from '@/constants/queryKeys';

import { fetchProducts } from './useProductsPaginationQuery';

export const fetchProductsForInfinite = async (size: number) => {
  const { products, totalCount } = await fetchProducts(size, 16);
  const isLast = size * 16 >= totalCount;
  return {
    isLast,
    products,
    nextPage: size + 1,
  };
};

export const useProductsInfiniteQuery = () => {
  return useInfiniteQuery(
    queryKeys.PRODUCTS_INFINITE,
    ({ pageParam = 1 }) => fetchProductsForInfinite(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.isLast) return;

        return lastPage.nextPage;
      },
    }
  );
};
