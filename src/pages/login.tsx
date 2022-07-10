import type { NextPage } from 'next';
import React from 'react';
import { LoginForm } from '@components/loginForm';
import { useUser } from '@hooks/useUser';
import { Header } from '@components/header';

const LoginPage: NextPage = () => {
  useUser('/');

  return (
    <>
      <Header />
      <LoginForm />
    </>
  );
};

export default LoginPage;
