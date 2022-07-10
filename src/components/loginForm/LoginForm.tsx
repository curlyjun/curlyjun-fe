import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import * as Styled from './LoginForm.style';
import { useFormInputValue } from './useFormInputValue';
import * as cookieName from '@/constants/cookies';

interface LoginFormProps {}

const LoginForm = ({}: LoginFormProps) => {
  const router = useRouter();
  const id = useFormInputValue({
    pattern: /^[a-zA-Z\d]{5,30}$/,
  });
  const password = useFormInputValue({
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await axios.post('/login', {
      id: id.value,
      password: password.value,
    });

    Cookies.set(cookieName.USER_ID, data.data.user.ID);
    Cookies.set(cookieName.ACCESS_TOKEN, data.data.accessToken);

    router.push('/');
  };

  return (
    <Styled.Form onSubmit={onSubmit}>
      <Styled.Fieldset>
        <Styled.Label htmlFor='id'>아이디</Styled.Label>
        <Styled.TextInput
          id='id'
          type='text'
          value={id.value}
          isInvalid={id.showErrorMessage}
          onChange={id.onChange}
          onBlur={id.onBlur}
        />
        {id.showErrorMessage && (
          <Styled.InvalidText>올바른 아이디 형식으로 입력해주세요.</Styled.InvalidText>
        )}
      </Styled.Fieldset>

      <Styled.Fieldset>
        <Styled.Label htmlFor='password'>비밀번호</Styled.Label>
        <Styled.TextInput
          id='password'
          type='password'
          value={password.value}
          isInvalid={password.showErrorMessage}
          onChange={password.onChange}
          onBlur={password.onBlur}
        />
        {password.showErrorMessage && (
          <Styled.InvalidText>올바른 비밀번호 형식으로 입력해주세요.</Styled.InvalidText>
        )}
      </Styled.Fieldset>

      <Styled.LoginButton type='submit' disabled={!id.isValid || !password.isValid}>
        로그인
      </Styled.LoginButton>
    </Styled.Form>
  );
};

export default LoginForm;
