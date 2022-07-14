import { useInfiniteQuery } from 'react-query';

import * as queryKeys from '@/constants/queryKeys';

import { fetchProducts } from './useProductsPaginationQuery';

export const fetchProductsForInfinite = async (size: number) => {
  const result = await fetchProducts(size, 16);

  if (!result) return null;

  const isLast = size * 16 >= result.totalCount;
  return {
    isLast,
    products: result.products,
    nextPage: size + 1,
  };
};

export const useProductsInfiniteQuery = () => {
  return useInfiniteQuery(
    queryKeys.PRODUCTS_INFINITE,
    ({ pageParam = 1 }) => fetchProductsForInfinite(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage || lastPage.isLast) return;

        return lastPage.nextPage;
      },
    }
  );
};
