import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import * as cookieName from '@/constants/cookies';
import { Header } from '@/components/header';
import { LoginForm } from '@/components/loginForm';
import { fetchUser } from '@/hooks/useUserQuery';

const LoginPage: NextPage = () => {
  return (
    <>
      <Header />
      <LoginForm />
    </>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const userId = req.cookies[cookieName.USER_ID];

  if (userId) {
    try {
      /** 유저 검증 후 유저 있으면 redirect */
      const user = await fetchUser(userId);
      if (user?.NAME) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    } catch (error) {
      return {
        props: {},
      };
    }
  }

  return {
    props: {},
  };
};
