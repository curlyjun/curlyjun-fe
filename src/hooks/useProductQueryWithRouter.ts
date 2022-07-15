import { useRouter } from 'next/router';

import { useProductQuery } from './queries/useProductQuery';

export const useProductQueryWithRouter = () => {
  const { query } = useRouter();

  return useProductQuery(query.id as string);
};
