import { useInfiniteQuery } from 'react-query';

import { fetchProducts } from './useProductsQuery';

export const fetchProductsForInfinite = async (size: number) => {
  if (!size) size = 1;
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
    'infinite-products',
    ({ pageParam }) => fetchProductsForInfinite(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.isLast) return;

        return lastPage.nextPage;
      },
    }
  );
};
