import Cookies from 'js-cookie';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';

import { Header } from '@/components/header';
import { LoginForm } from '@/components/loginForm';
import * as cookieName from '@/constants/cookies';
import { useUserQuery } from '@/hooks/queries/useUserQuery';

const LoginPage: NextPage = () => {
  const { data: user, isFetched } = useUserQuery(Cookies.get(cookieName.USER_ID));
  const router = useRouter();

  useEffect(() => {
    if (isFetched && user) {
      router.push('/');
    }
  }, [user, isFetched, router]);

  return (
    <>
      <Header />
      <LoginForm />
    </>
  );
};

export default LoginPage;
