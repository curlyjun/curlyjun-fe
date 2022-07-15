import { fireEvent, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import * as testLabels from '@/constants/testLabels';

import LoginForm from './LoginForm';

const queryClient = new QueryClient();

const renderLoginForm = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <LoginForm />
    </QueryClientProvider>
  );

const setUpInput = (labelText: string) => {
  const loginForm = renderLoginForm();
  const input = loginForm.getByLabelText(labelText) as HTMLInputElement;

  return { loginForm, input };
};

describe('로그인 테스트', () => {
  test('유효한 값 입력 전 로그인 버튼 비활성화 상태', () => {
    const loginForm = renderLoginForm();
    const loginBtn = loginForm.getByLabelText(testLabels.LOGIN_BUTTON);
    expect(loginBtn).toBeDisabled();
  });

  test('유효한 값 입력 후 로그인 버튼 활성화 상태', () => {
    const validId = 'sixshop';
    const validPassword = 'Sixshop123';

    const loginForm = renderLoginForm();
    const idInput = loginForm.getByLabelText(testLabels.ID_INPUT);
    const passwordInput = loginForm.getByLabelText(testLabels.PASSWORD_INPUT);
    fireEvent.change(idInput, { target: { value: validId } });
    fireEvent.change(passwordInput, { target: { value: validPassword } });

    const loginBtn = loginForm.getByLabelText(testLabels.LOGIN_BUTTON);

    expect(loginBtn).not.toBeDisabled();
  });

  describe('아이디 에러 테스트', () => {
    test.each([
      { value: 'abcd', name: '5자 미만' },
      { value: 'sixshopsixshopsixshopsixshopsix', name: '30자 초과' },
      { value: 'sixshop_sj', name: '특수문자 포함' },
    ])('$name 에러 발생', ({ value }) => {
      const { loginForm, input } = setUpInput(testLabels.ID_INPUT);
      fireEvent.change(input, { target: { value } });
      fireEvent.blur(input);
      const errorText = loginForm.getByLabelText(testLabels.ID_ERROR_P);
      expect(errorText).toBeInTheDocument();
    });

    test('에러 이후 유효한 값 입력 시 에러 메시지 사라짐', () => {
      const invalidId = 'sixs';
      const validId = 'sixshop';
      const { loginForm, input } = setUpInput(testLabels.ID_INPUT);
      fireEvent.change(input, { target: { value: invalidId } });
      fireEvent.blur(input);

      const errorText = loginForm.getByLabelText(testLabels.ID_ERROR_P);
      expect(errorText).toBeInTheDocument();

      fireEvent.change(input, { target: { value: validId } });
      const afterErrorText = loginForm.queryByLabelText(testLabels.ID_ERROR_P);
      expect(afterErrorText).not.toBeInTheDocument();
    });
  });

  describe('비밀번호 에러 테스트', () => {
    test.each([
      { value: 'Sixsho1', name: '8자 미만' },
      { value: 'Sixshop1Sixshop1Sixshop1Sixshop', name: '30자 초과' },
      { value: 'sixshopsix', name: '소문자' },
      { value: 'SIXSHOPSIX', name: '대문자' },
      { value: '12345678', name: '숫자' },
      { value: 'Sixshopsix', name: '소문자+대문자' },
      { value: 'sixshop123', name: '소문자+숫자' },
      { value: 'SIXSHOP123', name: '대문자+숫자' },
    ])('$name 에러 발생', ({ value }) => {
      const { loginForm, input } = setUpInput(testLabels.PASSWORD_INPUT);
      fireEvent.change(input, { target: { value } });
      fireEvent.blur(input);
      const errorText = loginForm.getByLabelText(testLabels.PASSWORD_ERROR_P);
      expect(errorText).toBeInTheDocument();
    });

    test('에러 이후 유효한 값 입력 시 에러 메시지 사라짐', () => {
      const invalidPassword = 'sixshop';
      const validPassword = 'Sixshop123';
      const { loginForm, input } = setUpInput(testLabels.PASSWORD_INPUT);
      fireEvent.change(input, { target: { value: invalidPassword } });
      fireEvent.blur(input);

      const errorText = loginForm.getByLabelText(testLabels.PASSWORD_ERROR_P);
      expect(errorText).toBeInTheDocument();

      fireEvent.change(input, { target: { value: validPassword } });
      const afterErrorText = loginForm.queryByLabelText(testLabels.PASSWORD_ERROR_P);
      expect(afterErrorText).not.toBeInTheDocument();
    });
  });
});
