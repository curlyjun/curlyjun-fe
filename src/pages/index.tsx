import type { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const HomePage: NextPage = () => {
  return (
    <Container>
      <Link href='/pagination?page=1' passHref>
        <StyledLink>pagination</StyledLink>
      </Link>
      <Link href='/infinite-scroll' passHref>
        <StyledLink>infinite scroll</StyledLink>
      </Link>
    </Container>
  );
};

export default HomePage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 40px;
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  width: 240px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  font-size: 24px;

  & + & {
    margin-top: 40px;
  }
`;
