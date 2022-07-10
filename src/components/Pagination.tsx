import React from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { usePagenation } from '@hooks/usePagination';
import { useProductsQuery } from '@hooks/useProductsQuery';
import Link from 'next/link';

const Pagination = () => {
  const { data } = useProductsQuery();
  const { currentPage, pages, disabledNext, disabledPrev, onClickNext, onClickPrev } =
    usePagenation(data?.totalCount);
  return (
    <Container>
      <Button disabled={disabledPrev} onClick={onClickPrev}>
        <VscChevronLeft />
      </Button>

      <PageWrapper>
        {pages.map((page) => (
          <Link
            key={page}
            href={{
              pathname: '/pagination',
              query: {
                page,
              },
            }}
          >
            <Page selected={page === currentPage} disabled={page === currentPage}>
              {page}
            </Page>
          </Link>
        ))}
      </PageWrapper>

      <Button disabled={disabledNext} onClick={onClickNext}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
