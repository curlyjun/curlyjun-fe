import Link from 'next/link';
import React from 'react';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import styled, { css } from 'styled-components';

import { useProductsQuery } from '@/hooks/queries/useProductsQuery';
import { usePagenation } from '@/hooks/usePagination';

const Pagination = () => {
  const { data } = useProductsQuery();
  const { currentPage, currentSize, pages, disabledNext, disabledPrev, onClickNext, onClickPrev } =
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
                size: currentSize,
              },
            }}
          >
            <Page selected={page === currentPage}>{page}</Page>
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
  cursor: pointer;
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

const Page = styled.a<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;

  ${({ selected }) =>
    selected &&
    css`
      pointer-events: none;
    `}

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
