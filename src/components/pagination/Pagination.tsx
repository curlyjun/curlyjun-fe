import Link from 'next/link';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

import { usePagenation } from '@/hooks/usePagination';
import { useProductsQueryWithRouter } from '@/hooks/useProductsQueryWithRouter';

import * as Styled from './Pagination.style';

interface PaginationProps {}

const Pagination = ({}: PaginationProps) => {
  const { data } = useProductsQueryWithRouter();
  const { currentPage, currentSize, pages, disabledNext, disabledPrev, onClickNext, onClickPrev } =
    usePagenation(data?.totalCount);
  return (
    <Styled.Container>
      <Styled.Button disabled={disabledPrev} onClick={onClickPrev}>
        <VscChevronLeft />
      </Styled.Button>

      <Styled.PageWrapper>
        {pages.map((page) => (
          <Link
            key={page}
            href={{
              pathname: '/pagination',
              query: {
                page,
                size: currentSize,
              },
            }}
            passHref
          >
            <Styled.Page selected={page === currentPage}>{page}</Styled.Page>
          </Link>
        ))}
      </Styled.PageWrapper>

      <Styled.Button disabled={disabledNext} onClick={onClickNext}>
        <VscChevronRight />
      </Styled.Button>
    </Styled.Container>
  );
};

export default Pagination;
