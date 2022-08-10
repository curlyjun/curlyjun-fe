import { useRouter } from 'next/router';

import { convertQueryStringToPositiveNumber } from '@/utilities';

import { useProductsQuery } from './queries/useProductsQuery';

export const useProductsQueryWithRouter = () => {
  const { query, isReady } = useRouter();

  const page = convertQueryStringToPositiveNumber(query.page) || 1;
  const size = convertQueryStringToPositiveNumber(query.size) || 10;

  return useProductsQuery({
    size,
    page,
    options: {
      enabled: isReady,
    },
  });
};
