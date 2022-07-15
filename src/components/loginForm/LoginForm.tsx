import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';

import * as cookieName from '@/constants/cookies';
import * as testLabels from '@/constants/testLabels';
import { useValidInputValue } from '@/hooks/useValidInputValue';

import * as Styled from './LoginForm.style';

interface LoginFormProps {}

const LoginForm = ({}: LoginFormProps) => {
  const router = useRouter();
  const id = useValidInputValue({
    pattern: /^[a-zA-Z\d]{5,30}$/,
  });
  const password = useValidInputValue({
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/,
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
          aria-label={testLabels.ID_INPUT}
          value={id.value}
          isInvalid={id.showErrorMessage}
          onChange={id.onChange}
          onBlur={id.onBlur}
        />
        {id.showErrorMessage && (
          <Styled.InvalidText aria-label={testLabels.ID_ERROR_P}>
            올바른 아이디 형식으로 입력해주세요.
          </Styled.InvalidText>
        )}
      </Styled.Fieldset>

      <Styled.Fieldset>
        <Styled.Label htmlFor='password'>비밀번호</Styled.Label>
        <Styled.TextInput
          id='password'
          type='password'
          aria-label={testLabels.PASSWORD_INPUT}
          value={password.value}
          isInvalid={password.showErrorMessage}
          onChange={password.onChange}
          onBlur={password.onBlur}
        />
        {password.showErrorMessage && (
          <Styled.InvalidText aria-label={testLabels.PASSWORD_ERROR_P}>
            올바른 비밀번호 형식으로 입력해주세요.
          </Styled.InvalidText>
        )}
      </Styled.Fieldset>

      <Styled.LoginButton
        type='submit'
        aria-label={testLabels.LOGIN_BUTTON}
        disabled={!id.isValid || !password.isValid}
      >
        로그인
      </Styled.LoginButton>
    </Styled.Form>
  );
};

export default LoginForm;
