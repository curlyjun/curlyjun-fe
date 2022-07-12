import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { Product } from '@/types/product';

interface ProductResponse {
  data: {
    product: Product;
  };
}

export const fetchProduct = async (id: string) => {
  const { data } = await axios.get<ProductResponse>(`/products/${id}`);

  return data.data.product;
};

export const useProductQuery = () => {
  const { query } = useRouter();

  return useQuery(['product', query.id], () => fetchProduct(query.id as string));
};
