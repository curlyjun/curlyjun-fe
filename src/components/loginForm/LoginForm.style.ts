import styled, { css } from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

export const Fieldset = styled.fieldset`
  :first-child {
    margin-bottom: 16px;
  }
`;

export const Label = styled.label`
  display: block;
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;
`;

export const TextInput = styled.input<{ isInvalid: boolean }>`
  width: 100%;
  margin-top: 8px;
  padding: 16px;
  background-color: #f7f7fa;
  border-radius: 12px;
  border: 1px solid #f7f7fa;
  transition: 0.2s;
  ${(p) =>
    p.isInvalid &&
    css`
      background-color: #fdedee;
    `}

  :focus {
    border: 1px solid #6d6bd1;
  }
`;

export const InvalidText = styled.p`
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
`;

export const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #6d6bd1;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;

  :hover {
    background-color: #5553c4;
  }

  &:disabled {
    background-color: #e2e2ea;
  }
`;
