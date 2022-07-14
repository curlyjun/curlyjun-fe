import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import * as queryKeys from '@/constants/queryKeys';
import { Product } from '@/types/product';
import { isAxiosNotFoundedError } from '@/utilities';

interface ProductResponse {
  data: {
    product: Product;
  };
}

export const fetchProduct = async (id: string) => {
  try {
    const { data } = await axios.get<ProductResponse>(`/products/${id}`);
    return data.data.product;
  } catch (error) {
    if (isAxiosNotFoundedError(error)) return null;
    throw error;
  }
};

export const useProductQuery = () => {
  const { query } = useRouter();

  return useQuery([queryKeys.PRODUCT, query.id], () => fetchProduct(query.id as string));
};
