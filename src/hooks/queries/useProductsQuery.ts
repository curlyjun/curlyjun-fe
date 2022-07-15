import axios from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import * as queryKeys from '@/constants/queryKeys';
import { Product } from '@/types/product';
import { isAxiosNotFoundedError } from '@/utilities';

interface ProductsResponse {
  data: {
    products: Product[];
    totalCount: number;
  };
}

type FetchProductsResult = ProductsResponse['data'] | null;

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

export const useProductsQuery = ({
  size,
  page,
  options,
}: {
  size: number;
  page: number;
  options: UseQueryOptions<FetchProductsResult>;
}) => {
  const queryResult = useQuery<FetchProductsResult>(
    [queryKeys.PRODUCTS_PAGINATION, size, page],
    () => fetchProducts(page, size),
    options
  );

  return queryResult;
};
