import Link from 'next/link';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

import { useProductsPaginationQuery } from '@/hooks/queries/useProductsPaginationQuery';
import { usePagenation } from '@/hooks/usePagination';

import * as Styled from './Pagination.style';

interface PaginationProps {}

const Pagination = ({}: PaginationProps) => {
  const { data } = useProductsPaginationQuery();
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
