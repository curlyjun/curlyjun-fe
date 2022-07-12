import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import * as queryKeys from '@/constants/queryKeys';
import { Product } from '@/types/product';
import { convertQueryStringToPositiveNumber } from '@/utilities';

interface ProductsResponse {
  data: {
    products: Product[];
    totalCount: number;
  };
}

export const fetchProducts = async (page: number, size: number) => {
  const { data } = await axios.get<ProductsResponse>('/products', {
    params: {
      page,
      size,
    },
  });

  return data.data;
};

export const useProductsPaginationQuery = () => {
  const { query } = useRouter();
  const page = convertQueryStringToPositiveNumber(query.page) || 1;
  const size = convertQueryStringToPositiveNumber(query.size) || 10;

  const queryResult = useQuery([queryKeys.PRODUCTS_PAGINATION, size, page], () =>
    fetchProducts(page, size)
  );

  return queryResult;
};
