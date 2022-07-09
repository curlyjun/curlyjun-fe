import axios from 'axios';
import { FormEvent } from 'react';
import * as Styled from './LoginForm.style';
import { useFormInputValue } from './useFormInputValue';

interface LoginFormProps {}

const LoginForm = ({}: LoginFormProps) => {
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

    // localStorage.setItem('ss_token', data.data.accessToken);
    console.log(data);
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
