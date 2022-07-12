import { Product } from '@/types/product';
import { convertQueryStringToPositiveNumber } from '@/utilities/index';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

interface ProductsResponse {
  data: {
    products: Product[];
    totalCount: number;
  };
}

export const fetchProducts = async (page: number, size: number) => {
  const { data } = await axios.get<ProductsResponse>(`/products?page=${page}&size=${size}`);

  return data.data;
};

export const useProductsQuery = () => {
  const { query } = useRouter();
  const page = convertQueryStringToPositiveNumber(query.page) || 1;
  const size = convertQueryStringToPositiveNumber(query.size) || 10;

  const queryResult = useQuery('products', () => fetchProducts(page, size));

  return queryResult;
};
