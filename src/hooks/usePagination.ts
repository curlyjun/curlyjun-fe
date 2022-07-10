import { convertQueryStringToPositiveNumber } from '@utilities/index';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const PAGE_COUNT_SIZE = 5;

export const usePagenation = (totalCount: number = 1) => {
  const router = useRouter();

  return useMemo(() => {
    const page = convertQueryStringToPositiveNumber(router.query.page) || 1;
    const size = convertQueryStringToPositiveNumber(router.query.size) || 10;

    const lastPage = Math.ceil(totalCount / Number(size));

    let endPage =
      page % PAGE_COUNT_SIZE ? page + (PAGE_COUNT_SIZE - (page % PAGE_COUNT_SIZE)) : page;
    let startPage = endPage - (PAGE_COUNT_SIZE - 1);

    if (endPage > lastPage) {
      endPage = lastPage;
    }

    return {
      currentPage: page,
      pages: Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i),
      disabledPrev: startPage === 1,
      disabledNext: endPage === lastPage,
      onClickPrev: () => {
        router.push({
          pathname: '/pagination',
          query: {
            page: endPage - PAGE_COUNT_SIZE,
          },
        });
      },
      onClickNext: () => {
        router.push({
          pathname: '/pagination',
          query: {
            page: startPage + PAGE_COUNT_SIZE,
          },
        });
      },
    };
  }, [router, totalCount]);
};
