import axios from 'axios';
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

export const useProductQuery = (productId: string) => {
  return useQuery([queryKeys.PRODUCT, productId], () => fetchProduct(productId));
};
