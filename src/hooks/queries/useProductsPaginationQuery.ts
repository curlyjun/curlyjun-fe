import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import * as queryKeys from '@/constants/queryKeys';
import { Product } from '@/types/product';
import { convertQueryStringToPositiveNumber, isAxiosNotFoundedError } from '@/utilities';

interface ProductsResponse {
  data: {
    products: Product[];
    totalCount: number;
  };
}

export const fetchProducts = async (page: number, size: number) => {
  try {
    const { data } = await axios.get<ProductsResponse>('/products', {
      params: {
        page,
        size,
      },
    });

    return data.data;
  } catch (error) {
    if (isAxiosNotFoundedError(error)) return null;
    throw error;
  }
};

export const useProductsPaginationQuery = () => {
  const { query, isReady } = useRouter();

  const page = convertQueryStringToPositiveNumber(query.page) || 1;
  const size = convertQueryStringToPositiveNumber(query.size) || 10;

  const queryResult = useQuery(
    [queryKeys.PRODUCTS_PAGINATION, size, page],
    () => fetchProducts(page, size),
    { enabled: isReady }
  );

  return queryResult;
};
